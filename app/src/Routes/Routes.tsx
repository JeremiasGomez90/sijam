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
import NewPlanta from "@/pages/NewPlanta";
import Grupos from "@/pages/Grupos";
import NewGrupo from "@/pages/NewGrupo";
import Novedades from "@/pages/Novedades";
import NewNovedad from "@/pages/NewNovedad";
import Referencias from "@/pages/Referencias";
import NewReferencia from "@/pages/NewReferencia";
import Contratos from "@/pages/Contratos";
import NewContrato from "@/pages/NewContrato";

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
        path: "empleados",
        element: (
          <ProtectedRoute>
            <Empleados />
          </ProtectedRoute>
        ),
      },
      {
        path: "/empleados/crear",
        element: (
          <ProtectedRoute>
            <NewEmpleado />
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
        path: "plantas/crear",
        element: (
          <ProtectedRoute>
            <NewPlanta />
          </ProtectedRoute>
        ),
      },
      {
        path: "contratos",
        element: (
          <ProtectedRoute>
            <Contratos />
          </ProtectedRoute>
        ),
      },
      {
        path: "contratos/crear",
        element: (
          <ProtectedRoute>
            <NewContrato />
          </ProtectedRoute>
        ),
      },
      {
        path: "grupos",
        element: (
          <ProtectedRoute>
            <Grupos />
          </ProtectedRoute>
        ),
      },
      {
        path: "grupos/crear",
        element: (
          <ProtectedRoute>
            <NewGrupo />
          </ProtectedRoute>
        ),
      },
      {
        path: "novedades",
        element: (
          <ProtectedRoute>
            <Novedades />
          </ProtectedRoute>
        ),
      },
      {
        path: "novedades/crear",
        element: (
          <ProtectedRoute>
            <NewNovedad />
          </ProtectedRoute>
        ),
      },
      {
        path: "referencias",
        element: (
          <ProtectedRoute>
            <Referencias />
          </ProtectedRoute>
        ),
      },
      {
        path: "referencias/crear",
        element: (
          <ProtectedRoute>
            <NewReferencia />
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
