import { Outlet } from "react-router-dom"
import Sidebar from "./Sidebar";

function App() {
  return (
    <div className="w-full flex h-svh max-h-svh">
      <Sidebar />
      <div className="h-full flex-1">
        <div className="flex h-full flex-col overflow-y-scroll">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default App;