import { Redirect, Route } from 'react-router-dom'
import UserAccess from './UserAccess/UserAcces';

export const PublicRoutes = () => {

  return (
    <>
      <Route exact path="/signin" component={UserAccess} />
      <Route exact path="/" render={() => <Redirect to="/signin" />} />
    </>
  )
}