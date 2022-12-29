import React, { useState, useEffect } from "react";
import { Button, Select, FormControl, InputLabel, Box, TextField, MenuItem, Grid, Typography, Stack, Badge } from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles';
import withReactContent from 'sweetalert2-react-content'
import Swal from 'sweetalert2'
import axios from 'axios';
import adminApi from "../../../api/adminApi";
import { DropDownTreeComponent } from '@syncfusion/ej2-react-dropdowns';
import { MdLibraryAdd } from 'react-icons/md'
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import { Header } from '../..';
import IconButton from '@material-ui/core/IconButton';
import { AiFillCloseCircle } from "react-icons/ai";
import { deepPurple, purple } from '@material-ui/core/colors';

export default function InviteUnit(props) {
    const ColorButton = withStyles((theme) => ({
        root: {
            color: theme.palette.getContrastText(deepPurple[500]),
            backgroundColor: purple[500],
            '&:hover': {
                backgroundColor: purple[700],
            },
        },
    }))(Button);

    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [inputValues, setInputValues] = useState({})
    const [provinces, setProvinces] = useState([]);
    const MySwal = withReactContent(Swal)

    // ------------------------------------------
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleOnChange = (e) => {
        setInputValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const onSubmit = (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        setLoading(true)
        const data = { ...inputValues }
        const formData = new FormData();
        formData.append("typeInstituteId", data.typeInstituteId)
        formData.append("parentId", data.provinceId)
        formData.append("name", data.name)
        formData.append("maED", 'null')
        formData.append("maID", 'null')
        formData.append("hierarchyLevel", data.hierarchyLevel)
        formData.append("files", data.files)
        formData.append("description", data.description)
        formData.append("provinceId", data.provinceId)
        formData.append("address", data.address)
        const config = {
            method: 'post',
            url: `${process.env.REACT_APP_URL}/api/v1/admin/register-institute`,
            headers: {
                'Authorization': 'Bearer ' + token,
            },
            data: formData
        };

        axios(config)
            .then(function (response) {
                if (response.data?.success === true) {
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
                        title: 'Bạn đã đăng ký thành công'
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
            const params = { page: 1, size: 1030 }
            const res = await adminApi.getListUnitsCQNN(params)
            const ress = await adminApi.getInf()
            console.log('Fetch products successfully: ', res);
            if (res != null) {
                setProvinces(ress.data?.result?.province)
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
    }, []);
    // ----- dropdown treee
    var ddTree;
    const fields = { dataSource: provinces, value: 'id', text: 'name', parentValue: 'parentId', child: 'children', hierarchy: 'hierarchyLevel' };
    const handleOnChangeDropdownTree = () => {
        setInputValues((prev) => ({ ...prev, provinceId: ddTree.value && ddTree.value.length > 0 ? ddTree.value[0] : "" }))
    }

    return (
        <>
            <Button color="primary" variant="contained" onClick={handleClickOpen} style={{ fontSize: '24px' }}>
                <MdLibraryAdd />
            </Button>
            <Dialog
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
                        >
                            <AiFillCloseCircle />
                        </IconButton>
                    </MuiDialogTitle>
                    <form onSubmit={onSubmit}>
                        <Grid
                            container
                            direction="column"
                            alignItems="stretch">
                            <Grid item>
                                <FormControl fullWidth variant="outlined">
                                    <InputLabel id="demo-simple-select-label">Đơn vị</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        name="typeInstituteId"
                                        onChange={handleOnChange}
                                        label="Đơn vị"
                                        defaultValue={1}
                                        disabled
                                    >
                                        <MenuItem value={1}>Đơn vị báo chí</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item style={{ border: '1px', backgroundColor: '#F7F7F7', borderRadius: '5px', marginTop: '14px' }}>
                                <DropDownTreeComponent
                                    ref={(dropdowntree) => { ddTree = dropdowntree }}
                                    fields={fields}
                                    allowFiltering={false}
                                    change={handleOnChangeDropdownTree}
                                    placeholder="Chọn tỉnh/huyện/xã"
                                    changeOnBlur={false}
                                    popupHeight="400px"
                                    style={{ fontSize: '16px', height: '45px', paddingLeft: '14px' }}
                                />
                            </Grid>
                            <Grid item>
                                <TextField
                                    type="text"
                                    margin="normal"
                                    name='name'
                                    fullWidth
                                    label="Nhập tên"
                                    variant="outlined"
                                    onChange={handleOnChange}
                                />
                            </Grid>
                            <Grid item >
                                <TextField
                                    type="text"
                                    margin="normal"
                                    name='description'
                                    variant="outlined"
                                    multiline
                                    rows={4}
                                    fullWidth
                                    label="Nhập mô tả"
                                    onChange={handleOnChange}
                                />
                            </Grid>
                            <Grid item >
                                <TextField
                                    type="text"
                                    variant="outlined"
                                    margin="normal"
                                    name='address'
                                    fullWidth
                                    label="Nhập địa chỉ"
                                    onChange={handleOnChange}
                                />
                            </Grid>
                            <Grid item >
                                <FormControl>
                                    <input
                                        accept="image/*"
                                        type="file"
                                        id="select-image"
                                        className="block w-full text-sm text-slate-500
                              file:mr-4 file:py-2 file:px-4
                              file:rounded-full file:border-0
                              file:text-sm file:font-semibold
                              file:bg-violet-50 file:text-violet-700
                              hover:file:bg-violet-100"
                                        name='files'
                                        onChange={(e) => {
                                            setInputValues((prev) => ({ ...prev, files: e.target.files[0] }));
                                        }
                                        }
                                    />
                                </FormControl>
                            </Grid>
                        </Grid>
                        <ColorButton
                            type="submit"
                            variant="contained"
                            fullWidth
                            loading={loading}
                            onClick={loading ? "Loading..." : "Đăng ký"}
                            style={{ marginBottom: '10px', marginTop: '10px' }}
                        >
                            Đăng ký
                        </ColorButton>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
};
