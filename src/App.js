import React, { useEffect } from "react";
import routes from "./Routes";
import {
  BrowserRouter,
  Switch,
  Route,
  Link,
  useHistory,
  useLocation,
  Redirect,
} from "react-router-dom";
import LoginPage from "./Pages/Login";

const App = () => {
  const history = useHistory();
  console.log(history, "history");

  
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
