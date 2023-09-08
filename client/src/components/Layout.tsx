import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";

const Layout = () => {
  const pathName = useLocation().pathname;
  return (
    <>
      <div className="dark:bg-background bg-slate-100 overscroll-auto h-full min-h-screen break-all">
        {!pathName.includes("/profile") && <Navbar />}
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
