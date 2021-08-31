import { useContext } from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import { AuthProvider } from './Auth/Auth';
import Restaurants from './Restaurants/Restaurants';
import RestaurantView from './RestaurantView/RestaurantView';
import { Admin } from './Admin/Admin';
import { AuthContext } from "./Auth/Auth";

export const PrivateRoutes = () => {

  const { isUser, isOwner, isAdmin } = useContext(AuthContext)

  return (
    <AuthProvider>
      <Switch>
        {(isUser || isOwner || isAdmin) ?
          <>
            <Route exact path="/restaurants" component={Restaurants} />
            <Route exact path="/restaurant/:id" component={RestaurantView} />
          </> : <Redirect to="/signin" />}

        {isAdmin && <Route exact path="/admin" component={Admin} />}

        <Route exact path="/" component={Restaurants} />
      </Switch>
    </AuthProvider>
  )
}

