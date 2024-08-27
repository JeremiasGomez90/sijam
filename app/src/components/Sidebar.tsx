import { useNavigate, useLocation } from "react-router-dom"
import { HomeIcon, Users2, User, Factory, LogOut, Group, Newspaper, ArchiveRestore, Blinds, FileText, List } from "lucide-react"
import { useAuth } from "@/contexts/useAuth";

function SettingsIcon() {
  return (
    <svg
      className="h-4 w-4"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}

const links = [
  {
    label: "Inicio",
    path: "/",
    icon: <HomeIcon className="h-4 w-4" />,
  },
  {
    label: "Empleados",
    path: "/empleados",
    icon: <Users2 className="h-4 w-4" />,
  },
  {
    label: "Plantas",
    path: "/plantas",
    icon: <Factory className="h-4 w-4" />,
  },
  {
    label: "Contratos",
    path: "/contratos",
    icon: <FileText className="h-4 w-4" />,
  },
  {
    label: "Grupos",
    path: "/grupos",
    icon: <Group className="h-4 w-4" />,
  },
  {
    label: "Novedades",
    path: "/novedades",
    icon: <Newspaper className="h-4 w-4" />,
  },
  {
    label: "Referencias",
    path: "/referencias",
    icon: <Blinds className="h-4 w-4" />,
  },
  {
    label: "Adicionales",
    path: "/adicionales",
    icon: <List className="h-4 w-4" />,
  },
  {
    label: "Fichadas",
    path: "/fichadas",
    icon: <ArchiveRestore className="h-4 w-4" />,
  },
  {
    label: "Perfil",
    path: "/perfil",
    icon: <User className="h-4 w-4" />,
  },
  {
    label: "Configuracion",
    path: "/config",
    icon: <SettingsIcon />,
  },
];

export default function Sidebar() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { logout, user } = useAuth();

  return (
    <aside className="flex w-64 flex-col border-r bg-background">
      <nav className="flex flex-1 flex-col overflow-y-auto px-4 py-6">
        <div className="flex flex-col space-y-1 justify-between h-full">
          <div className="flex flex-col space-y-1">
            {links.map((link, index) => (
              <span
                key={link.path + index}
                className={`${pathname.includes(link.path) && link.path !== "/" && "bg-muted text-foreground"} flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-black hover:text-white`}
                onClick={() => navigate(link.path)}
              >
                {link.icon}
                {link.label}
              </span>
            ))}
          </div>
          <div>
            <div className="flex flex-col px-3">
              <span className="text-sm">{`${user?.firstName} ${user?.lastName}`}</span>
              <span className="text-[12px]">{user?.email}</span>
            </div>
            <span
              className="flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-black hover:text-white mt-2"
              onClick={logout}
            >
              <LogOut className="h-4 w-4" />
              Cerrar Sesion
            </span>
          </div>
        </div>
      </nav>
    </aside>
  )
}