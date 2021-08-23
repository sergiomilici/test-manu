import { BrowserRouter as Router, Route } from 'react-router-dom'
import Home from './components/Home/Home'
import SignIn from './components/SignIn/SignIn';
import { AuthProvider } from './components/Auth/Auth'
import PrivateRoute from './components/PrivateRoute/PrivateRoute'


//loads App
//if logged in -> redirect to Home with Sign Out button
//else -> redirect to Sign In for login


function App() {
  return (
    <AuthProvider>
      <Router>
        <div>
          <PrivateRoute exact path="/" component={Home} />
          <Route exact path="/signin" component={SignIn} />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
