import { Route } from 'react-router-dom'
import { AuthProvider } from './Auth/Auth';
import Restaurants from './Restaurants/Restaurants';
import RestaurantView from './RestaurantView/RestaurantView';
import Dashboard from './Dashboard/Dashboard';
import { Admin } from './Admin/Admin';

export const PrivateRoutes = () => {

  return (
    <AuthProvider>
      <Route exact path="/restaurants" component={Restaurants} />
      <Route exact path="/restaurant/:id" component={RestaurantView} />
      <Route exact path="/dashboard" component={Dashboard} />
      <Route exact path="/admin" component={Admin} />
      <Route exact path="/" component={Restaurants} />
    </AuthProvider>
  )
}

