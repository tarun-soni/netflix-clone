import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userInfoState } from "../store/login";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const [userInfo] = useRecoilState(userInfoState);
  return (
    <Route
      {...rest}
      render={(props) =>
        userInfo?.isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};

export default PrivateRoute;
