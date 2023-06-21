import "./App.css";
import Layout from "./pages/Layout";
import { Navigate, useRoutes } from "react-router-dom";
import DiaryPost from "../src/pages/DiaryPost";
import Home from "../src/pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { useAuthContext } from "./hooks/useAuthContext";

const App = () => {
  const { user } = useAuthContext();
  const elements = useRoutes([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", element: user ? <Home /> : <Navigate to="/api/login" /> },
        {
          path: "/api/posts/:id",
          element: user ? <DiaryPost /> : <Navigate to="/api/login" />,
        },
        {
          path: "/api/signup",
          element: !user ? <Signup /> : <Navigate to="/" />,
        },
        {
          path: "/api/login",
          element: !user ? <Login /> : <Navigate to="/" />,
        },
      ],
    },
  ]);
  return elements;
};

export default App;
