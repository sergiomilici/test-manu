import { createContext, useEffect, useRef, useState } from 'react'
import fb from '../../firebaseConfig';
import firebase from 'firebase';
import { getToken } from './Session';

(window as any).fb = fb;

type ContextUser = firebase.User | null | undefined;

interface IAuthContext {
  currentUser: ContextUser;
  validSession: boolean,
}

const defaultAuthContext = {
  currentUser: null,
  validSession: !!getToken(),
} as const;

export const AuthContext = createContext<IAuthContext>(defaultAuthContext);

export const AuthProvider = ({children}) => {
  const [currentAuthContext, setCurrentAuthContext] = useState<IAuthContext>(defaultAuthContext)
  const fbStateListener = useRef<firebase.Unsubscribe | null>(null)

  useEffect(() => {
    const sessionToken = getToken()
    if (sessionToken && !currentAuthContext.validSession) {
      setCurrentAuthContext({...currentAuthContext, validSession: true});
    }

    if (fbStateListener.current) {
      return
    }

    fbStateListener.current = fb.auth().onAuthStateChanged((user: firebase.User | null) => {
      if (user) {
        setCurrentAuthContext({
          ...currentAuthContext,
          currentUser: user,
          validSession: true,
        });
      } else {
        setCurrentAuthContext({...currentAuthContext, currentUser: user});
      }
    });
  }, [fbStateListener, currentAuthContext])

  if (!currentAuthContext.validSession) {
    return null;
  }

  return (
    <AuthContext.Provider value={currentAuthContext}>
      {children}
    </AuthContext.Provider>
  )
}
