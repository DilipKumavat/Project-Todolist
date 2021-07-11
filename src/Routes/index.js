import LoginPage from "../Pages/Login";
import Signup from "../Pages/Signup";
import TodoList from "../components/TodoList";
const Routes = [
  {
    path: "/login",
    component: LoginPage,
    isPrivate: false,
    exact: true,
    name: "login page",
  },
  {
    path: "/signup",
    component: Signup,
    name: "signup page",
    exact: false,
  },
  {
      path : "/todolist",
      component : TodoList,
      name : "Todos",
      exact : false
  }
];
export default Routes;
