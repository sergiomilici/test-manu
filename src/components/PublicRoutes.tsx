import { Redirect, Route } from 'react-router-dom'
import UserAccess from './UserAccess/UserAcces';
import { useContext } from 'react';
import { AuthContext } from './Auth/Auth';

export const PublicRoutes = () => {
  const {currentUser} = useContext(AuthContext)
  return (
    <>
      <Route exact path="/signin" component={UserAccess} />
      <Route exact path="/" render={() => {
        if (currentUser) {
          return <Redirect to="/restaurants" />
        }
        return <Redirect to="/signin" />
      }} />
      <Route path="*" render={() => <Redirect to="/signin" />} />
    </>
  )
}
