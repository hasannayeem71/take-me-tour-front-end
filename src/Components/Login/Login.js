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
    <div>
      <h2>LOGIN</h2>
      <div className="login-page d-flex justify-content-center align-items-center">
        <div className="login-canvas d-flex justify-content-center align-items-center">
          <button onClick={handleLogin}>
            <i className="fab fa-google me-2"></i>Google login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
