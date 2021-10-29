import React, { useEffect } from "react";
import { useHistory, useLocation } from "react-router";
import useAuth from "../../hooks/useAuth";
import "./Login.css";
const Login = () => {
  useEffect(() => {
    document.title = "Login";
  }, []);
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
    <div className="login-page d-flex justify-content-center align-items-center">
      <div className="login-canvas">
        <button onClick={handleLogin}>Google login</button>
      </div>
    </div>
  );
};

export default Login;
