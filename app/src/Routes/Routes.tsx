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
import EditEmpleado from "@/pages/EditEmpleado";
import EditPlanta from "@/pages/EditPlanta";
import EditContrato from "@/pages/EditContrato";
import EditGrupo from "@/pages/EditGrupo";
import EditNovedad from "@/pages/EditNovedad";
import EditReferencia from "@/pages/EditReferencia";
import Adicionales from "@/pages/Adicionales";
import NewAdicional from "@/pages/NewAdicional";
import EditAdicional from "@/pages/EditAdicional";

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
        path: "/empleado/:id",
        element: (
          <ProtectedRoute>
            <EditEmpleado />
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
        path: "planta/:id",
        element: (
          <ProtectedRoute>
            <EditPlanta />
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
        path: "contrato/:id",
        element: (
          <ProtectedRoute>
            <EditContrato />
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
        path: "grupo/:id",
        element: (
          <ProtectedRoute>
            <EditGrupo />
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
        path: "novedad/:id",
        element: (
          <ProtectedRoute>
            <EditNovedad />
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
        path: "referencia/:id",
        element: (
          <ProtectedRoute>
            <EditReferencia />
          </ProtectedRoute>
        ),
      },
      {
        path: "adicionales",
        element: (
          <ProtectedRoute>
            <Adicionales />
          </ProtectedRoute>
        ),
      },
      {
        path: "adicionales/crear",
        element: (
          <ProtectedRoute>
            <NewAdicional />
          </ProtectedRoute>
        ),
      },
      {
        path: "adicional/:id",
        id: "edit-adicional",
        element: (
          <ProtectedRoute>
            <EditAdicional />
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
