import { Redirect, Route, useLocation } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...props }) => {
    const location = useLocation();
    return (
      <Route>
        {() =>
          !props.loggedIn ? <Component {...props}/> : <Redirect to='/signin'/>  
        }
      </Route>
    );
  };
  
  export default ProtectedRoute; 