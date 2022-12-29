import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import axios from 'axios';
import Illustration from "../data/Illustration.png"
import {
    Button,
    IconButton,
    InputAdornment,
    Typography,
    TextField
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { deepPurple, purple } from '@material-ui/core/colors';
import { DocumentTitle } from "../components";
export default function Login() {
    const ColorButton = withStyles((theme) => ({
        root: {
            color: theme.palette.getContrastText(deepPurple[500]),
            backgroundColor: purple[500],
            '&:hover': {
                backgroundColor: purple[700],
            },
        },
    }))(Button);
    const navigate = useNavigate();
   
    const MySwal = withReactContent(Swal)

    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);
    const [inputValues, setInputValues] = useState({})
    const handleOnChange = (e) => {
        setInputValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };
    const handleSubmit = (e) => {
        e.preventDefault();

        const data = JSON.stringify({
            "usersName": inputValues.usersName,
            "password": inputValues.password,
        });

        const config = {
            method: 'post',
            url:  `${process.env.REACT_APP_URL}/api/v1/admin/login`,
            headers: {
                'Content-Type': 'application/json',
            },
            data: data
        };

        axios(config)
            .then(response => {
                if (response.data.success === true || 'accessToken' in response) {
                    MySwal.fire({
                        toast: true,
                        position: 'top-right',
                        customClass: {
                            popup: 'colored-toast'
                        },
                        showConfirmButton: false,
                        timer: 1000,
                        timerProgressBar: true,
                        icon: 'success',
                        title: 'Thành công',
                        iconColor: "#40E0D0	",
                        text: 'Đăng nhập thành công',
                    }).then(() => {
                        localStorage.setItem('token', response.data.result.token);
                        navigate('/danh-sach-nguoi-dung');
                    })
                } else {
                    MySwal.fire({
                        toast: true,
                        position: 'top-right',
                        customClass: {
                            popup: 'colored-toast'
                        },
                        showConfirmButton: false,
                        timer: 1000,
                        timerProgressBar: true,
                        icon: 'error',
                        title: 'Lỗi',
                        iconColor: "#CD5C5C	",
                        text: 'Đăng nhập không thành công',
                    })
                }
            })
            .catch(function (error) {
                console.log(error);
            });

    }

    return (
        <section className="relative w-full h-screen flex bg-blue-200">
            <DocumentTitle title='Đăng nhập'/>
            <div className="relative w-6/12 h-full">
                <img src={Illustration} className="absolute top-0 left-0 w-full h-full object-scale-down" />
            </div>

            <div className="w-6/12 h-full justify-center items-center flex">
                <div className="flex flex-col max-w-md p-6 rounded-md sm:p-10 dark:bg-gray-900 dark:text-gray-100 bg-white h-[600px] w-[470px] rounded-[12px] border-solid border-[1px] border-sky-200">
                    <div className="mb-5 text-center">
                        <h1 className="my-3 text-3xl font-bold up uppercase text-stone-600">ứng dụng quản lý báo chí</h1>
                        <p className="text-sm subpixel-antialiased text-[#6738b3] font-bold">Hi, Welcome Back</p>
                    </div>
                    <div className="flex items-center pt-4 pb-4 space-x-1">
                        <div className="flex-1 h-[.5px] sm:w-16 divide-y divide-slate-300 bg-gray-500"></div>
                        <p className="px-3 text-sm dark:text-gray-400 border rounded-lg p-1">Đăng nhập</p>
                        <div className="flex-1 h-[.5px] sm:w-16 divide-y divide-blue-200 bg-gray-500"></div>
                    </div>
                    <form onSubmit={handleSubmit} className="ng-untouched ng-pristine ng-valid">
                        <div className="space-y-4">
                            <div>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="usersName"
                                    label="Nhập tài khoản"
                                    onChange={handleOnChange}
                                />
                            </div>
                            <div>
                                <div className="flex justify-between mb-2">
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="password"
                                        name="password"
                                        label="Nhập mật khẩu"
                                        type={showPassword ? "text" : "password"}
                                        onChange={handleOnChange}
                                        InputProps={{ // <-- This is where the toggle button is added.
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={handleClickShowPassword}
                                                        onMouseDown={handleMouseDownPassword}
                                                    >
                                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                                    </IconButton>
                                                </InputAdornment>
                                            )
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="float-right font-bold text-[#6738b3]">
                                <Link to="/nhap-mail">
                                    Quên mật khẩu
                                </Link>
                        </div>
                        
                        <div className="space-y-2">
                            <div>
                                <ColorButton
                                    fullWidth
                                    size="large"
                                    type="submit"
                                    variant="contained"
                                    style={{
                                        marginTop: '10px',
                                        backgroundColor: '#6738b3',
                                        '&:hover': {
                                            backgroundColor: '#6738b3',
                                        },
                                    }}
                                >
                                    Đăng nhập
                                </ColorButton>
                            </div>

                        </div>
                        <div className="pt-10 text-center">
                            <div className=" h-px divide-y divide-blue-200 bg-gray-500"></div>
                            <div className="pt-4">
                                <Typography
                                    component={Link}
                                    to="/dang-nhap"
                                    variant="subtitle1"
                                    sx={{ textDecoration: 'none',textAlign:'center',fontWeight: '500'}}
                                >
                                        Yêu cầu cấp tài khoản
                                </Typography>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}

