import React from 'react';
import { AiOutlineCalendar} from 'react-icons/ai';
import {BiEdit,BiGridAlt} from 'react-icons/bi'
import {CgProfile} from 'react-icons/cg';
import { CgUserList } from 'react-icons/cg';
import { TbFileSpreadsheet } from 'react-icons/tb';
import { HiOutlineClipboardList } from 'react-icons/hi';

// slide bar
export const links = [
  {
    title: 'Trang chủ',
    links: [
      {
        path:'/bang-dieu-khien',
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
        path:'/lich',
        name: 'Lịch làm việc',
        icon: <AiOutlineCalendar />,
      },
    ],
  },
  {
    title: 'Danh sách', 
    links: [
      {
        path:'/danh-sach-nguoi-dung',
        name: 'Danh sách người dùng',
        icon: <HiOutlineClipboardList />,
      },
      {
        path:'/danh-sach-don-vi-bao-chi',
        name: 'Danh sách đơn vị báo chí',
        icon: <HiOutlineClipboardList />,
      },
      {
        path:'/danh-sach-co-quan-nha-nuoc',
        name: 'Danh sách đơn vị cơ quan nhà nước',
        icon: <HiOutlineClipboardList />,
      },
      {
        path:'/danh-sach-phong-vien-thuong-tru',
        name: 'Danh sách phóng viên thường trú',
        icon: <HiOutlineClipboardList />,
      },
      {
        path:'/danh-sach-nguoi-phat-ngon',
        name: 'Danh sách người phát ngôn',
        icon: <HiOutlineClipboardList />,
      },
    ],
  },
  {
    title: 'Hệ thống',
    links: [
      {
        path:'/thong-tin-nguoi-dung',
        name: "Hồ sơ",
        icon: <CgProfile />,
      },
    ],
  },
];

