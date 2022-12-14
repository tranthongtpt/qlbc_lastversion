import React, { useState, useEffect, forwardRef } from "react";

import TableCorrespondent from '../components/table/tablecorrespondent'
import { useStateContext } from "../contexts/ContextProvider";
import { Header, Navbar, Sidebar } from "../components";

import adminApi from '../api/adminApi'
import { Grid } from "@mui/material";

// ------------------------------------
const ListResidentReporter = () => {

  const { activeMenu } = useStateContext();
  const [users, setUsers] = useState([]);

  const fetchData = async () => {
    try {
      const params = { typeUsersId: 4, page: 1, size: 100 }
      const res = await adminApi.getJournaList(params)
      console.log('Fetch products successfully: ', res);
      if (res != null) {
        setUsers(res.data.result.data)
      }
      console.log(res.data.result.data);
    } catch (error) {
      let statusText = " lỗi rồi ahihi "
      try {
        statusText = error.res.statusText;
      } catch (e) {

      }
      console.log(error.toString() + ".\n" + statusText);
    }
  }

  useEffect(() => {
    fetchData();
  }, [])


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
