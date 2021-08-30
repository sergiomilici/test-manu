import { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { AuthProvider } from './Auth/Auth';
import Restaurants from './Restaurants/Restaurants';
import RestaurantView from './RestaurantView/RestaurantView';
import { Admin } from './Admin/Admin';
import { AuthContext } from "./Auth/Auth";

export const PrivateRoutes = () => {

  const { isUser } = useContext(AuthContext)
  const { isOwner } = useContext(AuthContext)
  const { isAdmin } = useContext(AuthContext)

  return (
    <AuthProvider>
      <Route exact path="/restaurants" component={Restaurants} />
      <Route exact path="/restaurant/:id" component={RestaurantView} />
      {isAdmin && <Route exact path="/admin" component={Admin} />}
      <Route exact path="/" component={Restaurants} />
    </AuthProvider>
  )
}

