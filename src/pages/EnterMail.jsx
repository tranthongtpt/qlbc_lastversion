import Illustration from "../data/Illustration.png"
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom";
import withReactContent from 'sweetalert2-react-content'
import { Typography,  Button, TextField } from "@material-ui/core";
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import { deepPurple, purple } from '@material-ui/core/colors';
import { DocumentTitle } from "../components";

export default function EnterMail() {
    const ColorButton = withStyles((theme) => ({
        root: {
            color: theme.palette.getContrastText(deepPurple[500]),
            backgroundColor: purple[500],
            '&:hover': {
                backgroundColor: purple[700],
            },
        },
    }))(Button);
    const MySwal = withReactContent(Swal)
    const navigate = useNavigate();
    const [inputValues, setInputValues] = useState({})
    const handleOnChange = (e) => {
        setInputValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };
    const handleSubmit = (e) => {
        e.preventDefault();

        const data = JSON.stringify({
            "email": inputValues.email
        });

        const config = {
            method: 'get',
            url: `${process.env.REACT_APP_URL}api/v1/user/forgot-password?email=conghuancse1@gmail.com`,
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
                        iconColor: 'white',
                        customClass: {
                            popup: 'colored-toast'
                        },
                        showConfirmButton: false,
                        timer: 1500,
                        timerProgressBar: true,
                        icon: 'success',
                        title: 'success',
                        iconColor: "#40E0D0	"
                    }).then(() => {
                        navigate('/nhap-code');
                    })
                } else {
                    MySwal.fire({
                        toast: true,
                        position: 'top-right',
                        iconColor: 'white',
                        customClass: {
                            popup: 'colored-toast'
                        },
                        showConfirmButton: false,
                        timer: 1500,
                        timerProgressBar: true,
                        icon: 'error',
                        title: 'Error',
                        iconColor: "#CD5C5C	"
                    })
                }
            })
            .catch(function (error) {
                console.log(error);
            });

    }

    return (
        <section className="relative w-full h-screen flex bg-blue-200">
            <DocumentTitle title="Nhập email"/>
            <div className="relative w-6/12 h-full">
                <img src={Illustration} className="absolute top-0 left-0 w-full h-full object-scale-down" />
            </div>

            <div className="w-6/12 h-full justify-center items-center flex">
                <div className="flex flex-col max-w-md p-6 rounded-md sm:p-10 dark:bg-gray-900 dark:text-gray-100 bg-white h-[500px] w-[470px] rounded-[12px] border-solid border-[1px] border-sky-200">
                    <div className="mb-5 text-center">
                        <h1 className="my-3 text-3xl font-bold up uppercase text-stone-600">ứng dụng quản lý báo chí</h1>
                        <p className="text-sm subpixel-antialiased text-[#6738b3] font-bold">Hi, Welcome Back</p>
                    </div>
                    <div className="flex items-center pt-4 pb-4 space-x-1">
                        <div className="flex-1 h-[.5px] sm:w-16 divide-y divide-slate-300 bg-gray-500"></div>
                        <p className="px-3 text-sm dark:text-gray-400 border rounded-lg p-1">Đăng nhập</p>
                        <div className="flex-1 h-[.5px] sm:w-16 divide-y divide-blue-200 bg-gray-500"></div>
                    </div>
                    <form onSubmit={handleSubmit} className=" ng-untouched ng-pristine ng-valid">
                        <div className="space-y-10">
                            <TextField
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                name="email"
                                label="Nhập email để lấy code"   
                                onChange={handleOnChange}
                            />
                        </div>
                        <div className="space-y-10">
                            <ColorButton
                                fullWidth
                                size="large"
                                type="submit"
                                variant="contained"
                                style={{
                                    marginTop:'30px',
                                    backgroundColor: '#6738b3',
                                    '&:hover': {
                                        backgroundColor: '#6738b3',
                                    },
                                }}
                            >
                                Đăng nhập
                            </ColorButton>
                        </div>
                        <div className="pt-10 text-center">
                            <div className=" h-px divide-y divide-blue-200 bg-gray-500"></div>
                            <div className="pt-5">
                                <Typography
                                    component={Link}
                                    to="/dang-nhap"
                                    variant="subtitle1"
                                    style={{ textDecoration: 'none',textAlign:'center',fontWeight: '500'}}
                                >
                                        Quay lại trang login
                                </Typography>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}

