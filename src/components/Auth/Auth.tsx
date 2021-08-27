import { createContext, useEffect, useState, useRef } from 'react'
import fb from '../../firebaseConfig';
import firebase from 'firebase';

(window as any).fb = fb;

type ContextUser = firebase.User | null | undefined;

interface IAuthContext {
  currentUser: ContextUser;
  validSession: boolean,
}

const defaultAuthContext = {
  currentUser: null,
  validSession: !!localStorage.getItem('sessionToken'),
} as const;

export const AuthContext = createContext<IAuthContext>(defaultAuthContext);

export const AuthProvider = ({ children }) => {
  const [currentAuthContext, setCurrentAuthContext] = useState<IAuthContext>(defaultAuthContext)
  const fbStateListener = useRef<firebase.Unsubscribe | null>(null)

  useEffect(() => {
    const sessionToken = localStorage.getItem('sessionToken')
    console.log("sessiontoken", sessionToken)
    console.log("context", currentAuthContext)
    if (sessionToken && !currentAuthContext.validSession) {
      setCurrentAuthContext({ ...currentAuthContext, validSession: true });
    }

    if (fbStateListener.current) { return }

    fbStateListener.current = fb.auth().onAuthStateChanged((user: firebase.User | null) => {
      if (user) {
        setCurrentAuthContext({ ...currentAuthContext, currentUser: user, validSession: true });
      } else {
        setCurrentAuthContext({ ...currentAuthContext, currentUser: user });
      }
    });
  }, [fbStateListener, currentAuthContext])


  console.log(currentAuthContext.validSession)
  if (!currentAuthContext.validSession) {
    return null;
  }

  return (
    <AuthContext.Provider value={currentAuthContext}>
      {children}
    </AuthContext.Provider>
  )
}
