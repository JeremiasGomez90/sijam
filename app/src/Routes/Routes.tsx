import { createBrowserRouter } from "react-router-dom";
import App from "@/App";
import Login from "@/pages/Login";
import Home from "@/pages/Home";
import Perfil from "@/pages/Perfil";
import Settings from "@/pages/Settings";
import ProtectedRoute from "@/Routes/ProtectedRoute";
import Plantas from "@/pages/Plantas";
import Empleados from "@/pages/Empleados";
import NewEmpleado from "@/pages/NewEmpleado";
import NotFound from "@/pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      { path: "login", element: <Login /> },
      {
        path: "home",
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "plantas",
        element: (
          <ProtectedRoute>
            <Plantas />
          </ProtectedRoute>
        ),
      },
      {
        path: "empleados",
        element: (
          <ProtectedRoute>
            <Empleados />
          </ProtectedRoute>
        ),
      },
      {
        path: "/empleados/create",
        element: (
          <ProtectedRoute>
            <NewEmpleado />
          </ProtectedRoute>
        ),
      },
      {
        path: "perfil",
        element: (
          <ProtectedRoute>
            <Perfil />
          </ProtectedRoute>
        ),
      },
      {
        path: "config",
        element: (
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  }
]);
