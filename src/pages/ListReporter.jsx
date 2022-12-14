import React, { useState, useEffect, forwardRef, useRef } from "react";

import Tableuser from '../components/table/tableuser'
import { useStateContext } from "../contexts/ContextProvider";
import { Header, Navbar, Sidebar, useTable } from "../components";
import axiosClient from "../api/axiosClient";
import adminApi from '../api/adminApi'
import axios from "axios"
import MyDialog from "../components/MyDialog"
import InviteWork from "../components/table/invitework";
import { Grid } from "@mui/material";

// var axios = require('axios');
// ------------------------------------

const ListReporter = () => {
  const tableRef = useRef();
  const { activeMenu } = useStateContext();
  const [users, setUsers] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogWord, setDialogWord] = useState('');
  const [dialogId, setDialogId] = useState('');
  //for error handling
  const [iserror, setIserror] = useState(false)
  const [errorMessages, setErrorMessages] = useState([])

  const fetchData = async () => {
    try {
      const params = { page: 1, size: 100 }
      const res = await adminApi.getListReporter(params)
      console.log('Fetch products successfully: ', res);
      setUsers(res.data?.result?.data);
    } catch (error) {
      let statusText = "get lỗi rồi ahihi "
      try {
        statusText = error.res.statusText;
      } catch (e) {

      }
      console.log(error.toString() + ".\n" + statusText);
    }
  };

  useEffect(() => {
    fetchData();
  }, [])
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
            ? "bg-[#e3f2fd] min-h-screen md:ml-72 w-full"
            : "bg-[#e3f2fd]   w-full min-h-screen flex-2 "
        }
      >
        <div className="fixed md:static bg-white  navbar w-full ">
          <Navbar />
        </div>

        <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
          <Grid style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
            <Header title="Danh sách người dùng" />
            <InviteWork />
          </Grid>
          <Tableuser/>
        </div>
      </div>
    </div>
  );
};
export default ListReporter;
