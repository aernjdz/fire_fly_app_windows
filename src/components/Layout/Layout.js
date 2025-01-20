import { Outlet } from "react-router-dom";
import Menu from "../component/menufooter";
const Layout = () => {
    return (
        <>
          
          
                <Outlet/>
                <Menu/>
        
            
        </>
    )
}
export default Layout;