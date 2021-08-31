import { BrowserRouter as Router, Switch } from 'react-router-dom'
import './App.css'
import { PublicRoutes } from './components/PublicRoutes';
import { ProtectedRoute } from './components/ProtectedRoute';
import Restaurants from './components/Restaurants/Restaurants';
import { useContext } from 'react';
import { AuthContext } from './components/Auth/Auth';
import RestaurantView from './components/RestaurantView/RestaurantView';
import { Admin } from './components/Admin/Admin';
import { Loader } from './components/Loader';

function App() {
  const {currentUser, appInitiated} = useContext(AuthContext)
  const isAuthenticated = !!currentUser;

  if (!appInitiated) {
    return <Loader />
  }

  return (
    <Router>
      <Switch>
        <ProtectedRoute
          component={Restaurants} path='/restaurants'
          isAuthenticated={isAuthenticated}
          roles={['admin', 'owner', 'user']}
          userRole={currentUser?.role}
        />
        <ProtectedRoute
          component={RestaurantView} path='/restaurant/:id'
          isAuthenticated={isAuthenticated}
          roles={['admin', 'owner', 'user']}
          userRole={currentUser?.role}
        />
        <ProtectedRoute
          component={Admin} path='/admin'
          isAuthenticated={isAuthenticated}
          roles={['admin']}
          userRole={currentUser?.role}
        />
        <PublicRoutes />
      </Switch>
    </Router>
  );
}

export default App;
