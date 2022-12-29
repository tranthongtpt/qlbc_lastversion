import React, { useEffect } from "react";
import {BiEdit} from 'react-icons/bi'
import { Link } from 'react-router-dom';
import { useStateContext } from "../contexts/ContextProvider";

const Toolbar = () => {
  const {
    currentColor,
    activeMenu,
    setActiveMenu,
    handleClick,
    isClicked,
    setScreenSize,
    screenSize,
  } = useStateContext();

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (screenSize <= 900) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  const handleActiveMenu = () => setActiveMenu(!activeMenu);

  return (
    <div className="">
        <div className="">
            <Link href="/" className="">
            <BiEdit/>
                <p>Đăng ký làm việc</p>
            </Link>
           
        </div>
        {/* <div className="rounded-md min-w-280 block">
            <Link href="/detailuser" className="items-center border border-indigo-600 flex h-12">
            <FaUserEdit/>
                <p>Đăng ký tài khoản user</p>
            </Link>
        </div>
        <div className="rounded-md min-w-280 block">
            <Link href="/" className="items-center border border-indigo-600 flex h-12">
            <CgUserList/>
                <p>Quản lý người dùng</p>
            </Link>    
        </div>
        <div className="rounded-md min-w-280 block">
            <Link href="/" className="items-center border border-indigo-600 flex h-12">
            <TbFileSpreadsheet/>
                <p>Xem văn bản</p>
                <span className="items-start flex h-5 justify-end bg-red-500 rounded-full py-2 px-6 text-white">5</span>
            </Link>
        </div>
        <div className="rounded-md min-w-280 block">
            <Link href="/" className="items-center border border-indigo-600 flex h-12">
            <HiOutlineClipboardList/>
                <p>Danh sách đơn vị báo chí</p>
            </Link>
        </div> */}
    </div>
  );
};

export default Toolbar;
