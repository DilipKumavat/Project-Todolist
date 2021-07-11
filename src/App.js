import React from "react";
import routes from "./Routes";
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

const App = () => {
   
  return (
    <BrowserRouter>
      <div>
        <Switch>
        <Redirect exact from= "/" to="/login"/>
          {routes.map((route, i) => {
            return <RoutesWithSubRoute key={i} {...route} />;
            // <Route path={route.path}><route.component/></Route>
          })}
        </Switch>
      </div>
    </BrowserRouter>
  );
};

function RoutesWithSubRoute(route) {
  return (
    <Route
      path={route.path}
      render={(props) => <route.component {...props} />}
    />
  );
}

export default App;
