import { Route, Redirect } from 'react-router-dom';

const AuthRoute = ({ component: Component, ...props }) => {
  return (
    <Route>
      {() =>
        !props.loggedIn ? <Component {...props} /> : <Redirect to='/movies' />
      }
    </Route>
  );
};

export default AuthRoute;
