import React from "react";

import { useStateContext } from "../contexts/ContextProvider";
import { DocumentTitle, Header, Navbar, Sidebar } from "../components";
import TableListUnits from "../components/table/tablelistunits";
import { Grid } from "@material-ui/core";
// ---------------------


const ListUnits = () => {
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
        <DocumentTitle title='Danh sách các đơn vị báo chí' />
        <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
          <Grid style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '20px' }}>
            <Header title="Danh sách đơn vị báo chí" />
          </Grid>
          <TableListUnits />
        </div>
      </div>
    </div>
  );
};
export default ListUnits;
