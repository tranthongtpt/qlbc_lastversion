import React, { useEffect, useState } from "react";
import { AiOutlineMenu, AiOutlineNotification } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { MdLogout } from "react-icons/md";
import { IoNotificationsOutline } from "react-icons/io5";
import { useNavigate, NavLink } from "react-router-dom";
import adminApi from "../api/adminApi";
import { useStateContext } from "../contexts/ContextProvider";
import { Button, Menu, MenuItem, Divider, ListItemIcon, ListItemText, IconButton } from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles';
const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const Navbar = () => {
  const {
    currentColor,
    activeMenu,
    setActiveMenu,

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
  const [users, setUsers] = useState({});
  const fetchData = async () => {
    try {
      const res = await adminApi.getUsers();
      if (res != null) {
        setUsers(res?.data?.result)
      }
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
  const handleActiveMenu = () => setActiveMenu(!activeMenu);
  // ----------------------
  const url = `${process.env.REACT_APP_URL}/api/v1/media/view/`;

  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/dang-nhap")
  }
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="flex justify-between p-2 md:ml-6 md:mr-6 relative">
      <Button
        size="medium"
        onClick={() => handleActiveMenu()}
      >
        <AiOutlineMenu style={{ fontSize: '20px' }} />
      </Button>
      <div className="flex">
        <IconButton color="primary" aria-label="add to shopping cart">
          <IoNotificationsOutline />
        </IconButton>
        <Button
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
          startIcon={<img
            className="rounded-full w-8 h-8"
            src={url + `${users?.avatar?.file_path}/${users?.avatar?.file_name}`}
            alt="user-profile"
          />}
        >
          hi,Admin
        </Button>
        <StyledMenu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem onClick={() => (navigate("/danh-sach-nguoi-dung"))}>
            <ListItemIcon>
              <CgProfile fontSize="large" />
            </ListItemIcon>
            <ListItemText>Hồ sơ của tôi</ListItemText>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <AiOutlineNotification fontSize="large" />
            </ListItemIcon>
            <ListItemText>Thông báo</ListItemText>
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleLogout}> <ListItemIcon>
            <MdLogout fontSize="large" />
          </ListItemIcon>
            <ListItemText>Đăng xuất</ListItemText></MenuItem>
        </StyledMenu>
      </div>
    </div>
  );
};

export default Navbar;
