import React, { useState, useEffect } from "react";
import { withStyles } from '@material-ui/core/styles';
import { AiOutlineCamera } from 'react-icons/ai'
import TextField from '@material-ui/core/TextField';
import { useStateContext } from "../contexts/ContextProvider";
import { DocumentTitle, Header, Navbar, Sidebar, useTable } from "../components";
import InputLabel from '@material-ui/core/InputLabel';
import adminApi from '../api/adminApi'
import Button from '@material-ui/core/Button';
import { deepPurple, purple } from '@material-ui/core/colors';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import axios from "axios";
// ------------------------------------

const UserProfile = () => {
    const ColorButton = withStyles((theme) => ({
        root: {
            color: theme.palette.getContrastText(deepPurple[500]),
            backgroundColor: purple[500],
            '&:hover': {
                backgroundColor: purple[700],
            },
        },
    }))(Button);
    const { activeMenu } = useStateContext();
    const [user, setUser] = useState({});
    const [picUrl, setPicUrl] = useState();
    const url = `${process.env.REACT_APP_URL}/api/v1/media/view/`;
    const MySwal = withReactContent(Swal)

    const handleChanged = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };
    // ---------------------
    const fetchData = async () => {
        try {
            const res = await adminApi.getUsers()
            setUser(res.data?.result);
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        var FormData = require('form-data')
        var data = new FormData();
        data.append('givenName', user.givenName);
        data.append('files', user.files);
        data.append('Unit', user.Unit);
        data.append('Address', user.Address);

        var config = {
            method: 'post',
            url: `${process.env.REACT_APP_URL}/api/v1/admin/info-user`,
            headers: {
                'Authorization': 'Bearer ' + token,
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                if (response.data.success === true) {
                    localStorage.setItem("loading", true)
                    MySwal.fire({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                            toast.addEventListener('mouseenter', Swal.stopTimer)
                            toast.addEventListener('mouseleave', Swal.resumeTimer)
                        },
                        icon: 'success',
                        title: 'Signed in successfully'
                    })
                } else {
                    MySwal.fire({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 1000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                            toast.addEventListener('mouseenter', Swal.stopTimer)
                            toast.addEventListener('mouseleave', Swal.resumeTimer)
                        },
                        icon: 'error',
                        title: 'Tạo không thành công'
                    })
                }
                console.log(JSON.stringify(response.data));
            })
            .catch(function (error) {
                console.log(error);
            });
    };
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
                        : "bg-[#e3f2fd]   w-full min-h-screen flex-2 "
                }
            >
                <div className="fixed md:static bg-white  navbar w-full ">
                    <Navbar />
                </div>
                <DocumentTitle title='Thông tin cá nhân'/>
                <div class="font-sans leading-tight m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl bg-grey-lighter p-8">
                        <Header title="Thông tin cá nhân" />                       
                        <div class=" mx-auto bg-white rounded-lg overflow-hidden shadow-lg">
                            <div class="bg-cover h-40 bg-gradient-to-r from-cyan-500 to-blue-500" ></div>
                            <div class="border-b px-4 pb-6">
                                <div class="text-center sm:text-left sm:flex ">
                                    <div class="relative block w-1/4 group rounded-full w-auto h-auto" href="#">
                                        <img class="h-40 w-40 rounded-full border-4 border-white -mt-16 mr-4 absolute inset-0 object-cover group-hover:opacity-50"
                                            src={picUrl ? picUrl : url + `${user?.avatar?.file_path}/${user?.avatar?.file_name}`} />
                                        <div className="h-40 w-40 rounded-b-full ">
                                            <div className="transition-all transform translate-y-0 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 rounded-b-full">
                                                <label className="text-center w-[100px] cursor-pointer" for="uploadAvt">
                                                    <span className="text-black font-bold flex items-center justify-center text-[10px] mt-3">
                                                        <AiOutlineCamera className="w-5 h-5" />
                                                        Thay đổi hình ảnh đại diện
                                                    </span>
                                                </label>
                                                <input
                                                    type="file"
                                                    id="uploadAvt"
                                                    name="files"
                                                    className="h-[60px] w-44 opacity-0 rounded-b-full cursor-pointer"
                                                    onChange={(e) => {
                                                        setUser((prev) => ({ ...prev, files: e.target.files[0] }));
                                                        const url = URL.createObjectURL(e.target.files[0]);
                                                        setPicUrl(url);
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="py-2">
                                        <div class="inline-flex text-grey-dark sm:flex items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16"> <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" /> </svg>
                                            <h3 class="font-bold text-2xl mb-1">{user.givenName}</h3>
                                        </div>
                                    </div>
                                </div>
                                <div className="">
                                    <div className="flex border-b-1 py-5 pr-5">
                                        <InputLabel htmlFor="my-input" className="w-1/4">Họ tên</InputLabel>
                                        <TextField
                                            value={user.givenName}
                                            variant="outlined"
                                            className="flex-1"
                                            required
                                            name="givenName"
                                            onChange={handleChanged}
                                        />
                                    </div>
                                    <div className="flex border-b-1 py-5 pr-5">
                                        <InputLabel htmlFor="my-input" className="w-1/4 ">Cơ quan</InputLabel>
                                        <TextField
                                            value={user.Unit}
                                            id="outlined-basic"
                                            variant="outlined"
                                            className="flex-1"
                                            required
                                            name="Unit"
                                            onChange={handleChanged}
                                        />
                                    </div>
                                    <div className="flex border-b-1 py-5 pr-5">
                                        <InputLabel htmlFor="my-input" className=" w-1/4">Địa chỉ</InputLabel>
                                        <TextField
                                            value={user.Address}
                                            id="outlined-basic"
                                            variant="outlined"
                                            className="flex-1"
                                            required
                                            name="Address"
                                            onChange={handleChanged}
                                        />
                                    </div>
                                    <div className="text-center mt-10">
                                        <ColorButton
                                            variant="contained"
                                            style={{
                                                marginRight: '5px',
                                                backgroundColor: '#6738b3',
                                                '&:hover': {
                                                    backgroundColor: '#6738b3',
                                                },
                                            }}
                                            onClick={handleSubmit}
                                        >
                                            Cập nhật
                                        </ColorButton>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
        </div>
    );
};
export default UserProfile;