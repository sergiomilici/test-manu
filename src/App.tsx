import { BrowserRouter as Router } from 'react-router-dom'
import './App.css'
import { PublicRoutes } from './components/PublicRoutes';
import { PrivateRoutes } from './components/PrivateRoutes';

function App() {
  return (
    <Router>
      <PrivateRoutes />
      <PublicRoutes />
    </Router>
  );
}

export default App;
