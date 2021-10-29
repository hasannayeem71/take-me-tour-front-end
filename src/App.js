import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import About from "./Components/About/About";
import AddPackage from "./Components/AddPackage/AddPackage";
import Book from "./Components/Book/Book";
import DeletePackage from "./Components/DeletePackage/DeletePackage";
import Footer from "./Components/Footer/Footer";
import HeaderNav from "./Components/HeaderNav/HeaderNav";
import Home from "./Components/Home/Home";
import Login from "./Components/Login/Login";
import ManageAll from "./Components/ManageAll/ManageAll";
import MyPackage from "./Components/MyPackage/MyPackage";
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
            <Route exact path="/about">
              <About />
            </Route>
            <PrivateRoute path="/package/book/:id">
              <Book />
            </PrivateRoute>
            <PrivateRoute path="/add-package">
              <AddPackage />
            </PrivateRoute>
            <PrivateRoute path="/delete-package">
              <DeletePackage />
            </PrivateRoute>
            <PrivateRoute path="/manage-package">
              <ManageAll />
            </PrivateRoute>
            <PrivateRoute path="/my-package">
              <MyPackage />
            </PrivateRoute>
            <Route path="*">
              <NotFoundCustom />
            </Route>
          </Switch>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
