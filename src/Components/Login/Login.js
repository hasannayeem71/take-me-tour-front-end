import React from "react";
import { useHistory, useLocation } from "react-router";
import useAuth from "../../hooks/useAuth";

const Login = () => {
  const { signInUsingGoogle, setIsLoading } = useAuth();

  const history = useHistory();
  const location = useLocation();
  const redirect_uri = location.state?.from || "/";
  const handleLogin = () => {
    signInUsingGoogle()
      .then((result) => {
        history.push(redirect_uri);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  return (
    <div>
      <button onClick={handleLogin}>Google login</button>
    </div>
  );
};

export default Login;
