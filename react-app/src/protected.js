import React, { useEffect, useState } from 'react';
import { Route, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const Navigate=useNavigate();
  

  useEffect(() => {
    let token = Cookies.get('token');

    if (token) {
      let tokenExpiration = jwtDecode(token).exp;
      let currentTime = Math.floor(Date.now() / 1000);

      if (tokenExpiration < currentTime) {
        // Token is expired; delete the token
        Cookies.remove('token', { path: '/login/customer/email' });
        setIsAuthenticated(false);
      } else {
        setIsAuthenticated(true);
      }
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  if (isAuthenticated === null) {
      return <div>null</div>// You can render a loading component here
  }

  return (
    <Route
      {...rest}
      render={props =>
        !isAuthenticated ? Navigate("/login/customer/email") : <Component {...props} />
      }
    />
  );
};

export default PrivateRoute;