import Illustration from "../data/Illustration.png"
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import React, { useState } from 'react';


import { Typography, Button, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { FcNews } from "react-icons/fc"
import axios from 'axios';

export default function EnterCode() {
    const navigate = useNavigate();

    const { control, register, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: {
            email: '',
            entercode: ''
        }
    });
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
                    <form onSubmit={handleSubmit} className=" ng-untouched ng-pristine ng-valid">
                        <div className="space-y-10">
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="email"
                                label="Nhập email"
                                {...register("email",
                                    {
                                        required: "Bắt buộc nhập email.",
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                            message: "Invalid email address",
                                        },
                                    }
                                )}
                                error={Boolean(errors.email)}
                                helperText={errors.email?.message}
                            />
                        </div>
                        <div className="space-y-10">
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="entercode"    
                                label="Nhập code"
                                {...register("entercode",
                                    {
                                        required: "Bắt buộc nhập entercode.",
                                        pattern: {
                                            value: /[0-9]{6}/,
                                            message: "Invalid entercode",
                                        },
                                    }
                                )}
                                error={Boolean(errors.entercode)}
                                helperText={errors.entercode?.message}
                            />
                        </div>
                        <div className="space-y-10">
                            <Button
                                fullWidth
                                size="large"
                                type="submit"
                                variant="contained"
                                sx={{
                                    marginTop: '30px',
                                    backgroundColor: '#6738b3',
                                    '&:hover': {
                                        backgroundColor: '#6738b3',
                                    },
                                }}
                            >
                                Nhập mã code
                            </Button>
                        </div>
                        <div className="pt-10 text-center">
                            <div className=" h-px divide-y divide-blue-200 bg-gray-500"></div>
                            <div className="pt-5">
                                <Typography
                                    component={Link}
                                    to="/login"
                                    variant="subtitle1"
                                    sx={{ textDecoration: 'none', textAlign: 'center', fontWeight: '500' }}
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

