import { Route } from 'react-router-dom'
import { AuthProvider } from './Auth/Auth';
import HelloWorld from './HelloWorld/HelloWorld';

export const PrivateRoutes = () => {

  return (
    <AuthProvider>
      <Route exact path="/helloworld" component={HelloWorld} />
      <Route exact path="/" component={HelloWorld} />
    </AuthProvider>
  )
}
