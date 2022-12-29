import React from "react";
import { DocumentTitle, Header, Navbar, Sidebar, useTable } from "../components";
import { useStateContext } from "../contexts/ContextProvider";


const Layout = (props) => {
    const { activeMenu } = useStateContext();
    return (
        <div className="flex relative ">
          {activeMenu ? (
            <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg ">
              <Sidebar />
            </div>
          ) : (
            <div className="w-0 dark:bg-secondary-dark-bg">
              <Sidebar />
            </div>
          )}
          <div
            className={
              activeMenu
                ? "  bg-[#e3f2fd] min-h-screen md:ml-72 w-full  "
                : "bg-[#e3f2fd]  w-full min-h-screen flex-2 "
            }
          >
            <div className="fixed md:static bg-white  navbar w-full ">
              <Navbar />
            </div>
            {props}
          </div>
        </div>
      );
}

export default Layout;