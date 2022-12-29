import React from "react";

import TableCorrespondent from '../components/table/tablecorrespondent'
import { useStateContext } from "../contexts/ContextProvider";
import { DocumentTitle, Header, Navbar, Sidebar } from "../components";
import { Grid } from "@material-ui/core";
// ------------------------------------
const ListResidentReporter = () => {
  const { activeMenu } = useStateContext();
  return (
    <div className="flex relative dark:bg-main-dark-bg">
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
            ? "dark:bg-main-dark-bg  bg-[#e3f2fd] min-h-screen md:ml-72 w-full  "
            : "bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 "
        }
      >
        <div className="fixed md:static bg-white dark:bg-main-dark-bg navbar w-full ">
          <Navbar />
        </div>
        <DocumentTitle title="Danh sách phóng viên thường trú"/>
        <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
          <Grid style={{ marginBottom: '20px'}}>
            <Header title="Danh sách phóng viên thường trú"/>
          </Grid>
          <TableCorrespondent/>
        </div>
      </div>
    </div>
  );
};
export default ListResidentReporter;
