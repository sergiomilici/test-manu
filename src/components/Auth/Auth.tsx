import { createContext, useEffect, useRef, useState } from 'react'
import fb from '../../firebaseConfig';
import firebase from 'firebase';
import { getUser } from '../../Api';
import { User } from '../Admin/Users/User';
import { getToken } from './Session';

(window as any).fb = fb;

type ContextUser = User | null | undefined;

interface IAuthContext {
  currentUser: ContextUser;
  isAdmin: boolean;
  isOwner: boolean;
  isUser: boolean;
  appInitiated: boolean;
  hasToken: boolean;
}

const defaultAuthContext = {
  currentUser: null,
  isAdmin: false,
  isOwner: false,
  isUser: true,
  appInitiated: false,
  hasToken: false
} as const;

export const AuthContext = createContext<IAuthContext>(defaultAuthContext);

export const AuthProvider = ({children}) => {
  const [currentAuthContext, setCurrentAuthContext] = useState<IAuthContext>(defaultAuthContext)
  const fbStateListener = useRef<firebase.Unsubscribe | null>(null)

  useEffect(() => {
    const sessionToken = getToken()
    if (sessionToken && !currentAuthContext.hasToken) {
      setCurrentAuthContext({...currentAuthContext, hasToken: true});
    }

    if (fbStateListener.current) {
      return
    }

    fbStateListener.current = fb.auth().onAuthStateChanged(async (user: firebase.User | null) => {
      if (user) {
        const response = await getUser(user.uid);
        // @ts-ignore
        const { role } = response.user;
        setCurrentAuthContext({
          ...currentAuthContext,
          currentUser: response.user,
          isAdmin: role === 'admin',
          isOwner: role === 'owner',
          isUser: role === 'user',
          appInitiated: true
        });
      } else {
        setCurrentAuthContext({
          ...currentAuthContext,
          currentUser: null,
          appInitiated: true,
          hasToken: false
        });
      }
    });
  }, [fbStateListener, currentAuthContext])

  return (
    <AuthContext.Provider value={currentAuthContext}>
      {children}
    </AuthContext.Provider>
  )
}
