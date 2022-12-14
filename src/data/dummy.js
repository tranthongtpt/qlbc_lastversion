import React from 'react';
import { AiOutlineCalendar} from 'react-icons/ai';
import { FiShoppingBag, FiEdit, FiPieChart, FiBarChart, FiCreditCard, FiStar, FiShoppingCart } from 'react-icons/fi';
import { BsKanban, BsBarChart, BsBoxSeam, BsCurrencyDollar, BsShield, BsChatLeft } from 'react-icons/bs';
import {BiUserCircle,BiCog,BiBarChartSquare,BiMessageRoundedDots,BiEdit,BiGridAlt} from 'react-icons/bi'
import {CgProfile} from 'react-icons/cg';
import { FaUserEdit } from 'react-icons/fa';
import { CgUserList } from 'react-icons/cg';
import { TbFileSpreadsheet } from 'react-icons/tb';
import { MdOutlineSupervisorAccount } from 'react-icons/md';
import { HiOutlineRefresh } from 'react-icons/hi';
import { TiTick } from 'react-icons/ti';
import { HiOutlineClipboardList } from 'react-icons/hi';
import { GrLocation } from 'react-icons/gr';

export const gridOrderImage = (props) => (
  <div>
    <img
      className="rounded-xl h-20 md:ml-3"
      src={props.ProductImage}
      alt="order-item"
    />
  </div>
);

export const gridOrderStatus = (props) => (
  <button
    type="button"
    style={{ background: props.StatusBg }}
    className="text-white py-1 px-2 capitalize rounded-2xl text-md"
  >
    {props.Status}
  </button>
);


// slide bar
export const links = [
  {
    title: 'Trang chủ',
    links: [
      {
        path:'/bangdieukhien',
        name: 'Bảng điều khiển',
        icon: <BiGridAlt />,
      },
    ],
  },

  {
    title: 'Trang',
    links: [
      {
        path: "/financial",
        name: "Đăng làm việc",
        icon: <BiEdit />,
      },
      {
        path:'/customers',
        name: "Quản lý người dùng",
        icon: <CgUserList />,
      },
      {
        path:'/customers',
        name: "Xem văn bản",
        icon: <TbFileSpreadsheet />,
      },
      {
        path:'/calendar',
        name: 'Lịch làm việc',
        icon: <AiOutlineCalendar />,
      },
    ],
  },
  {
    title: 'Danh sách',
    links: [
      {
        path:'/listreporter',
        name: 'Danh sách user',
        icon: <HiOutlineClipboardList />,
      },
      {
        path:'/listunits',
        name: 'Danh sách các đơn vị',
        icon: <HiOutlineClipboardList />,
      },
      {
        path:'/listresidentreporter',
        name: 'Danh sách phóng viên thường trú',
        icon: <HiOutlineClipboardList />,
      },
      {
        path:'/listspokesman',
        name: 'Danh sách người phát ngôn',
        icon: <HiOutlineClipboardList />,
      },
    ],
  },
  {
    title: 'Hệ thống',
    links: [
      {
        path:'/userprofile',
        name: "Hồ sơ",
        icon: <CgProfile />,
      },
    ],
  },
  // {
  //   title: 'Charts',
  //   links: [
  //     {
  //       name: 'line',
  //       icon: <AiOutlineStock />,
  //     },
  //     {
  //       name: 'area',
  //       icon: <AiOutlineAreaChart />,
  //     },

  //     {
  //       name: 'bar',
  //       icon: <AiOutlineBarChart />,
  //     },
  //     {
  //       name: 'pie',
  //       icon: <FiPieChart />,
  //     },
  //     {
  //       name: 'financial',
  //       icon: <RiStockLine />,
  //     },
  //     {
  //       name: 'color-mapping',
  //       icon: <BsBarChart />,
  //     },
  //     {
  //       name: 'pyramid',
  //       icon: <GiLouvrePyramid />,
  //     },
  //     {
  //       name: 'stacked',
  //       icon: <AiOutlineBarChart />,
  //     },
  //   ],
  // },
];

