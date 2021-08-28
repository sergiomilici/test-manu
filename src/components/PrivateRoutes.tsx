import { Route } from 'react-router-dom'
import { AuthProvider } from './Auth/Auth';
import Restaurants from './Restaurants/Restaurants';
import RestaurantView from './RestaurantView/RestaurantView';

export const PrivateRoutes = () => {

  return (
    <AuthProvider>
      <Route exact path="/restaurants" component={Restaurants} />
      <Route exact path="/restaurant/:id" component={RestaurantView} />
      <Route exact path="/" component={Restaurants} />
    </AuthProvider>
  )
}

