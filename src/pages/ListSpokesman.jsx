import React, { useState, useEffect, forwardRef, useRef } from "react";

import TableSpokesman from '../components/table/tablespokesman'
import { useStateContext } from "../contexts/ContextProvider";
import { Header, Navbar, Sidebar } from "../components";
import {Grid} from "@mui/material";
import adminApi from '../api/adminApi'

// ------------------------------------

const ListSpokesman = () => {
  const { activeMenu } = useStateContext();
  const [users, setUsers] = useState([]);

  const fetchData = async () => {
    try {
      const params = { page: 1, size: 100 }
      const response = await adminApi.getUser(params)
      console.log('Fetch products successfully: ', response);
      setUsers(response.data?.result?.data);
    } catch (error) {
      console.log('Failed to fetch product list: ', error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

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
            ? " bg-[#e3f2fd] min-h-screen md:ml-72 w-full  "
            : "bg-[#e3f2fd] w-full min-h-screen flex-2 "
        }
      >
        <div className="fixed md:static bg-white navbar w-full ">
          <Navbar />
        </div>

        <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
          <Grid style={{ marginBottom: '20px' }}>
            <Header title="Danh sách người phát ngôn" />
          </Grid>
          <TableSpokesman />
        </div>

      </div>
    </div>
  );
};
export default ListSpokesman;
