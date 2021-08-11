/*!

=========================================================
* Material Dashboard React - v1.8.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Route, BrowserRouter } from "react-router-dom";

// core components
import Admin from "layouts/Admin.js";
import RTL from "layouts/RTL.js";
import { Login } from "./views/Login/Login";
import { ProtectedRoute } from "views/Login/protectedRoute";

// Redux
import { store } from "./Redux/Store";
import { Provider } from "react-redux";

import "assets/css/material-dashboard-react.css?v=1.8.0";
import "react-toastify/dist/ReactToastify.css";

const hist = createBrowserHistory();

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Route path="/" exact component={Login} />
      <ProtectedRoute path="/admin" component={Admin} />
      <ProtectedRoute path="/rtl" component={RTL} />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
