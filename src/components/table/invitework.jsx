import React, { useMemo, useState, useEffect } from "react";
import { Button, Select, FormControl, InputLabel, Box, TextField, MenuItem, Autocomplete, Grid, Typography, Stack, Badge } from "@mui/material";
import { styled } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";
import withReactContent from 'sweetalert2-react-content'
import Swal from 'sweetalert2'
import { useForm, Controller } from "react-hook-form";
import axios from 'axios';
import adminApi from "../../api/adminApi";
import { MdLibraryAdd } from 'react-icons/md'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import { Header } from '../../components';
import IconButton from '@mui/material/IconButton';
import { AiFillCloseCircle } from "react-icons/ai";


export default function InviteWork(props) {
    const useStyles = styled((theme) => ({
        formControl: { margin: "10px 0", display: "block" },
        closeButton: {
            position: "absolute",
            right: theme.spacing(1),
            top: theme.spacing(1),
            color: theme.palette.grey[500]
        }
    }));
    const classes = useStyles();
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const navigate = useNavigate();

    const [typeusers, setTypeUsers] = useState([]);
    const [typeinstitute, setTypeInstitute] = useState([]);
    const [provinces, setProvinces] = useState([]);
    const [lprovinces, setLprovinces] = useState('');
    const [options, setOptions] = useState("");

    const [loading, setLoading] = useState(false);

    const [value, setValue] = useState(options[0]);
    const [inputValue, setInputValue] = useState('');

    // ------------------------------------------
    const MySwal = withReactContent(Swal)

    const { control, register, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: {
            email: '',
            givenName: '',
            typeUsersId: '',
            instituteId: '',
            provinceId: '',
        }
    });

    const onSubmit = (data, e) => {
        const token = localStorage.getItem('token');
        setLoading(true)
        console.log(data);
        const config = {
            method: 'post',
            url: 'http://10.220.5.65:8090/api/v1/admin/users-register',
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
                        title: 'Thêm thành công'
                    })
                    setOpen(false)
                    setLoading(false)
                    setTimeout(() => {
                        localStorage.setItem("loading", false)
                    }, 2000)

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
    }
    const fetchData = async () => {
        try {
            setLoading(true)
            const res = await adminApi.getInf()
            console.log('Fetch products successfully: ', res);
            if (res != null) {
                setTypeUsers(res.data.result.typeUsers)
                setTypeInstitute(res.data.result.typeInstitute)
                setProvinces(res.data.result.province)
                setLoading(false)
            }
        } catch (error) {
            let statusText = " lỗi rồi ahihi "
            try {
                statusText = error.res.statusText;
            } catch (e) {

            }
            console.log(error.toString() + ".\n" + statusText);
            setLoading(false)
        }
    }
    const handleChange = (e) => {
        const index = provinces[0]?.children.findIndex(x => x.id === e.target.value);
        setLprovinces(index);
        console.log(index);
        setOptions(e.target.value)
    }
    useEffect(() => {
        reset();
        fetchData();
    }, [reset])

    return (
        <>
            <Button variant="outlined" onClick={handleClickOpen} startIcon={<MdLibraryAdd />}>
                Thêm tài khoản
            </Button>
            <Dialog
                disableBackdropClick
                disableEscapeKeyDown
                open={open}
                onClose={handleClose}
                PaperProps={{
                    style: {
                        minHeight: '400px',
                        minWidth: '700px',
                    }
                }}
            >
                <DialogContent>
                    <MuiDialogTitle disableTypography style={{ display: 'flex', justifyContent: 'space-between' }} >
                        <Header title="Cấp tài khoản người dùng" />
                        <IconButton
                            aria-label="close"
                            onClick={handleClose}
                            className={classes.closeButton}
                        >
                            <AiFillCloseCircle />
                        </IconButton>
                    </MuiDialogTitle>
                    <form onSubmit={handleSubmit(onSubmit)} className="">
                        <Grid container spacing={1}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    type="text"
                                    variant="outlined"
                                    fullWidth
                                    InputLabelProps={{
                                        shrink: true
                                    }}
                                    label="Nhập email"
                                    name='email'
                                    {...register("email", { required: "Bắt buộc nhập email.", pattern: /$^|.+@.+..+/ })}
                                    error={Boolean(errors.email)}
                                    helperText={errors.email?.message}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    type="text"
                                    variant="outlined"
                                    fullWidth
                                    InputLabelProps={{
                                        shrink: true
                                    }}
                                    label="Họ và tên"
                                    name='givenName'
                                    {...register("givenName", { required: "Bắt buộc nhập." })}
                                    error={Boolean(errors.givenName)}
                                    helperText={errors.givenName?.message}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl sx={{ width: 1, mt: 2, mb: 2 }} >
                                    <InputLabel id="demo-simple-select-label">Loại tài khoản</InputLabel>
                                    <Controller
                                        rules={{ required: true }}
                                        render={({ field }) => (
                                            <Select
                                                {...field}
                                                labelId="demo-simple-select-label"
                                                label="Loại tài khoản"
                                               
                                            >
                                                {typeusers.map((user, index) => (
                                                    <MenuItem value={user.id} key={index}>
                                                        {user.name}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        )}
                                        name="typeUsersId"
                                        control={control}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={6} sm={6}>
                                <FormControl sx={{ width: 1, mt: 2, mb: 2 }}>
                                    <InputLabel id="demo-simple-select-label">Đơn vị</InputLabel>
                                    <Controller
                                        rules={{ required: true }}
                                        render={({ field }) => (
                                            <Select {...field} labelId="demo-simple-select-label" label="Đơn vị">
                                                {typeinstitute.map((tpinstitute, index) => (
                                                    <MenuItem value={tpinstitute.id} key={index}>
                                                        {tpinstitute.name}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        )}
                                        name="instituteId"
                                        control={control}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={6} sm={6} >
                                <FormControl sx={{ width: 1, mt: 2, mb: 2 }}>
                                    <Autocomplete
                                        value={value}
                                        onChange={(event, newValue) => {
                                            setValue(newValue);
                                        }}
                                        inputValue={inputValue}
                                        onInputChange={(event, newInputValue) => {
                                            setInputValue(newInputValue);
                                        }}
                                        id="controllable-states-demo"
                                        name="provinceId"
                                        control={control}
                                        options={provinces.map((province, index) => (
                                            province.name
                                        ))}
                                        renderInput={(params) => <TextField {...params} label="Chọn Tỉnh/Thành" />}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={6} sm={6} >
                                <FormControl sx={{ width: 1, mt: 2, mb: 2 }}>
                                    <InputLabel id="demo-simple-select-label">Chọn Quận/Huyện</InputLabel>
                                    <Controller
                                        rules={{ required: true }}
                                        render={({ field }) => (
                                            <Select {...field} onChange={handleChange} value={options} labelId="demo-simple-select-label" label="Chọn Quận/Huyện">
                                                {provinces[0]?.children?.map((district, index) => {
                                                    return (
                                                        <MenuItem value={district.id} key={index}>
                                                            {district.name}
                                                        </MenuItem>
                                                    )
                                                })}
                                            </Select>
                                        )}
                                        name="provinceId"
                                        control={control}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={6} sm={6} >
                                <FormControl sx={{ width: 1, mt: 2, mb: 2 }}>
                                    <InputLabel id="demo-simple-select-label">Chọn Phường/Xã</InputLabel>
                                    <Controller
                                        render={({ field }) => (
                                            <Select {...field} labelId="demo-simple-select-label" label="Chọn Phường/Xã">
                                                {provinces[0]?.children[lprovinces]?.children?.map((district, index) => {
                                                    return (
                                                        <MenuItem value={district.id} key={index}>
                                                            {district.name}
                                                        </MenuItem>
                                                    )
                                                })}
                                            </Select>
                                        )}
                                        name="provinceId"
                                        control={control}
                                    />
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            variant="contained"
                            className="w-64"
                            fullWidth
                            loading={loading}
                            onClick={loading ? "Loading..." : "Đăng ký"}
                            sx={{
                                mt: 3,
                                backgroundColor: '#6738b3',
                                '&:hover': {
                                    backgroundColor: '#6738b3',
                                },
                            }}
                        >
                            Đăng ký
                        </Button>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
};
