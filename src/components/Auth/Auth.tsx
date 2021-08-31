import { createContext, useEffect, useRef, useState } from 'react'
import fb from '../../firebaseConfig';
import firebase from 'firebase';
import { getToken } from './Session';
import { getUser } from '../../Api';

(window as any).fb = fb;

type ContextUser = firebase.User | null | undefined;

interface IAuthContext {
  currentUser: ContextUser;
  validSession: boolean,
  isAdmin: boolean;
  isOwner: boolean;
  isUser: boolean;
}

const defaultAuthContext = {
  currentUser: null,
  validSession: !!getToken(),
  isAdmin: false,
  isOwner: false,
  isUser: true,
} as const;

export const AuthContext = createContext<IAuthContext>(defaultAuthContext);

export const AuthProvider = ({ children }) => {
  const [currentAuthContext, setCurrentAuthContext] = useState<IAuthContext>(defaultAuthContext)
  const fbStateListener = useRef<firebase.Unsubscribe | null>(null)

  useEffect(() => {
    const sessionToken = getToken()
    if (sessionToken && !currentAuthContext.validSession) {
      setCurrentAuthContext({ ...currentAuthContext, validSession: true });
    }

    if (fbStateListener.current) {
      return
    }

    fbStateListener.current = fb.auth().onAuthStateChanged(async (user: firebase.User | null) => {
      if (user) {
        const response = await getUser(user.uid)
        // @ts-ignore
        const { role } = response.user;
        setCurrentAuthContext({
          ...currentAuthContext,
          currentUser: user,
          validSession: true,
          isAdmin: role === 'admin',
          isOwner: role === 'owner',
          isUser: role === 'user',
        });
      } else {
        setCurrentAuthContext({ ...currentAuthContext, currentUser: user });
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
