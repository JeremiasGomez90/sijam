import { Outlet } from "react-router-dom";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { UserProvider } from "./contexts/useAuth";

function App() {
  return (
    <>
      <UserProvider>
        <Outlet />
        <Toaster />
      </UserProvider>
    </>
  );
}

export default App;