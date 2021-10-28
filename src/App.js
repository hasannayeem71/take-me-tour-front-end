import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import CustomLoader from "./Components/CustomLoader/CustomLoader";
import HeaderNav from "./Components/HeaderNav/HeaderNav";
import Home from "./Components/Home/Home";
import Login from "./Components/Login/Login";
import NotFoundCustom from "./Components/NotFoundCustom/NotFoundCustom";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";
import AuthProvider from "./context/AuthProvider";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <HeaderNav />
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/home">
              <Home />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
            <PrivateRoute path="/load">
              <CustomLoader />
            </PrivateRoute>
            <Route path="*">
              <NotFoundCustom />
            </Route>
          </Switch>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
