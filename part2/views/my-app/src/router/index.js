import React, { Component } from "react";
import Home from "../pages/home";

import { BrowserRouter, Route, Switch, useParams } from "react-router-dom";

//import DetailRead from "../pages/home/DetailRead";

const Router = (props) => {
  let routes = (
    <Switch>
      <Route exact path="/" component={Home} />
     
    </Switch>
  );

  if (true) {
    return (
      <BrowserRouter>
        {routes}
      </BrowserRouter>
    );
  } else {
    return (
      <BrowserRouter>
        
      </BrowserRouter>
    );
  }
};
export default Router;
