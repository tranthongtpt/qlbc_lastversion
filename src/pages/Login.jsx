import Illustration from "../data/Illustration.png"
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
// import Button from '@material-ui/core/Button';

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useForm } from "../components/Form/useForm";
// import { TextField, InputAdornment, IconButton } from "@material-ui/core";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import axios from 'axios';
import {
    Box,
    Button,
    Checkbox,
    Divider,
    FormControl,
    FormControlLabel,
    FormHelperText,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Stack,
    Typography,
    useMediaQuery,
    TextField
} from '@mui/material';

export default function Login() {
    const navigate = useNavigate();
   
    const MySwal = withReactContent(Swal)

    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = JSON.stringify({
            "usersName": values.usersName,
            "password": values.password,
        });

        const config = {
            method: 'post',
            url: 'http://10.220.5.65:8090/api/v1/admin/login',
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
                        title: 'success',
                        iconColor: "#40E0D0	",
                        text: 'Đăng nhập thành công',
                    }).then(() => {
                        localStorage.setItem('token', response.data.result.token);
                        navigate('/bangdieukhien');
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
                        title: 'Error',
                        iconColor: "#CD5C5C	",
                        text: 'Đăng nhập không thành công',
                    })
                }
                console.log(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });

    }

    const initialFValues = {
        usersName: '',
        password: ''
    }
    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('usersName' in fieldValues)
            temp.usersName = test(fieldValues.usersName) ? "" : "usersName is not valid."
        if ('password' in fieldValues)
            temp.password = fieldValues.password.length < 7 ? "" : "Minimum 6 numbers required."
        setErrors({
            ...temp
        })

        if (fieldValues == values)
            return Object.values(temp).every(x => x == "")
    }
    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFValues, true, validate);

    return (
        <section className="relative w-full h-screen flex bg-blue-200">
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
                                    value={values.usersName}
                                    onChange={handleInputChange}
                                    error={errors.usersName}
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
                                        value={values.password}
                                        onChange={handleInputChange}
                                        error={errors.password}
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
                                <Link to="/entermail">
                                    Quên mật khẩu
                                </Link>
                        </div>
                        <div className="space-y-2">
                            <div>
                                <Button
                                    fullWidth
                                    size="large"
                                    type="submit"
                                    variant="contained"
                                    sx={{
                                        mt: 2,
                                        backgroundColor: '#6738b3',
                                        '&:hover': {
                                            backgroundColor: '#6738b3',
                                        },
                                    }}
                                >
                                    Đăng nhập
                                </Button>
                            </div>

                        </div>
                        <div className="pt-10 text-center">
                            <div className=" h-px divide-y divide-blue-200 bg-gray-500"></div>
                            <div className="pt-4">
                                <Typography
                                    component={Link}
                                    to="/login"
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

