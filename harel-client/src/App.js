import logo from "./logo.svg";
import "./App.css";
import Login from "./components/Login";
import Home from "./components/Home";
import Edit from "./components/Edit";

import ErrorPage from "./components/ErrorPage";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";
function App() {
  
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login></Login>,
    },
    {
      path: "/Login",
      element: <Login></Login>,
    },
    {
      path: "/Home",
      element: <Home></Home>,
      errorElement: <ErrorPage />,
    },
    {
      path: "/Edit/:id",
      element: <Edit></Edit>,
      errorElement: <ErrorPage />,
    },
  ]);
  
return  (<RouterProvider router={router} />)
}

export default App;
