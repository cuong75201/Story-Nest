import { Outlet } from "react-router"
import HeaderLayout from "./header/header"

function UserLayout() {
  return (
    <div className="main-layout">
        <HeaderLayout/>
        <Outlet />
    </div>
  )
}

export default UserLayout
