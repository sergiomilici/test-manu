import { createContext, useEffect, useState } from 'react'
import fb from '../../firebaseConfig';
import firebase from 'firebase';

(window as any).fb = fb;

type ContextUser = firebase.User | null | undefined;

interface IAuthContext {
  currentUser: ContextUser;
}

const defaultAuthContext = {
  currentUser: null,
} as const;

export const AuthContext = createContext<IAuthContext>(defaultAuthContext);

export const AuthProvider = ({children}) => {
  const [currentAuthContext, setCurrentAuthContext] = useState<IAuthContext>(defaultAuthContext)

  useEffect(() => {
    fb.auth().onAuthStateChanged((user: firebase.User | null) => {
      setCurrentAuthContext({...currentAuthContext, currentUser: user});
    });
  }, [])

  console.log(currentAuthContext.currentUser)
  if (!currentAuthContext.currentUser) {
    return null;
  }

  return (
    <AuthContext.Provider value={currentAuthContext}>
      {children}
    </AuthContext.Provider>
  )
}
