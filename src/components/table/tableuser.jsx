import Box from "@mui/material/Box";
import React, { useMemo, useState, useEffect } from "react";
import { DataGrid, GridToolbarContainer, GridToolbarQuickFilter, GridLinkOperator, GridRenderCellParams } from "@mui/x-data-grid";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { DropDownTreeComponent } from '@syncfusion/ej2-react-dropdowns';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { Button, Select, Popover, FormControl, InputLabel, FormControlLabel, TextField, MenuItem, Tooltip, Grid, Typography, Stack, Badge } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import IconButton from '@mui/material/IconButton';
import { BiEdit, BiMailSend, BiRefresh } from "react-icons/bi";


import { AiOutlineDelete } from "react-icons/ai"
// import { toast } from "react-toastify";
import axiosClient from "../../api/axiosClient";
import Avatar from '@mui/material/Avatar';

import adminApi from "../../api/adminApi";
import MyDialog from "../MyDialog";

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Header } from '../../components';
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import { styled } from '@mui/material/styles';
import { getToken } from "../../Utils/Common";
import InviteWork from './invitework'
import Filter from "./filter";

export default function InviteWorkTable(props) {
    const [user, setUser] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const url = 'http://10.220.5.65:8090/api/v1/media/view/'
    const [provinces, setProvinces] = useState([]);
    const [typeusers, setTypeUsers] = useState([]);
    const [institute, setInstitute] = useState([]);
   // ------------------------------------------
   const MySwal = withReactContent(Swal)

    const loadingStorage = localStorage.getItem('loading');
    let initialFormData = {
        id: null,
        givenName: "",
        address: "",
        typeUsersId: "",
        instituteId: "",
        provinceId: "",
        actived: "",
        block: "",
    };

    const UserDelete = async (id) => {
        setIsLoading(true)
        try {
            const res = await axiosClient.delete(`/admin/manager-user/${id}`, id)
            if (res.success) {
                localStorage.setItem('loading', true)
                setIsLoading(false)
                setTimeout(() => {
                    localStorage.setItem("loading", false)
                }, 5000)
            } else {
                setIsLoading(false)
            }
        } catch (error) {
            setIsLoading(false)
        }
    };

    function CustomToolbar() {
        return (
            <GridToolbarContainer style={{float: 'right'}}>
                <Box
                    sx={{
                        p: 0.5,
                        pb: 0,
                    }}
                >
                    <GridToolbarQuickFilter
                        quickFilterParser={(searchInput) =>
                            searchInput
                                .split(',')
                                .map((value) => value.trim())
                                .filter((value) => value !== '')
                        }
                    />
                </Box>
            </GridToolbarContainer>
        );
    }
    const StyledBadge = styled(Badge)(({ theme }) => ({
        '& .MuiBadge-badge': {
            backgroundColor: '#44b700',
            color: '#44b700',
            boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
            '&::after': {
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                animation: 'ripple 1.2s infinite ease-in-out',
                border: '1px solid currentColor',
                content: '""',
            },
        },
        '@keyframes ripple': {
            '0%': {
                transform: 'scale(.8)',
                opacity: 1,
            },
            '100%': {
                transform: 'scale(2.4)',
                opacity: 0,
            },
        },
    }));
    const datagridSx = {
        "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "rgb(128, 212, 255)",
            fontSize: 16
        }
    }
    const columns = [
        {
            field: "id",
            headerName: "id",
            hide: true,
        },
        {
            field: "avatar",
            headerName: "Ảnh đại diện",
            sortable: false,
            disableColumnMenu: true,
            width: 150,
            headerAlign: 'center',
            align: 'center',
            renderCell: (params) => (
                (params.row.actived === true) ?
                    <StyledBadge
                        overlap="circular"
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        variant="dot"
                    >
                        <Avatar alt="avt" src={url + `${params.value}`} />
                    </StyledBadge>
                    : <StyledBadge sx={{
                        "& .MuiBadge-badge": {
                            color: "red",
                            backgroundColor: "red"
                        }
                    }} overlap="circular" badgeContent=" " variant="dot" anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}>
                        <Avatar alt="avt" src={url + `${params.value}`} />
                    </StyledBadge>
            )
        },
        {
            field: "givenName",
            headerName: "Họ & Tên",
            width: 250,
            headerAlign: 'center',
            align: 'left',
            renderCell: (params) => (
                <Tooltip title={params.value} >
                    <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{params.value}</span>
                </Tooltip>
            ),
        },
        {
            field: "email",
            headerName: "Email",
            width: 250,
            headerAlign: 'center',
            align: 'left',
            renderCell: (params) => (
                <Tooltip title={params.value} >
                    <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{params.value}</span>
                </Tooltip>
            ),
        },
        {
            field: "Institute",
            headerName: "Đơn vị làm việc",
            width: 250,
            headerAlign: 'center',
            align: 'left',
            renderCell: (params) => (
                <Tooltip title={params.value} >
                    <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{params.value}</span>
                </Tooltip>
            ),
        },
        {
            field: "address",
            headerName: "Địa chỉ",
            width: 180,
            headerAlign: 'center',
            align: 'left',
            renderCell: (params) => (
                <Tooltip title={params.value} >
                    <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{params.value}</span>
                </Tooltip>
            ),
        },
        {
            field: "phone",
            headerName: "Số điện thoại",
            width: 160,
            headerAlign: 'center',
            align: 'left',
            renderCell: (params) => (
                <Tooltip title={params.value} >
                    <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{params.value}</span>
                </Tooltip>
            ),
        },
        {
            field: "TypeUser",
            headerName: "Cơ quan",
            width: 160,
            headerAlign: 'center',
            align: 'left',
            renderCell: (params) => (
                <Tooltip title={params.value} >
                    <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{params.value}</span>
                </Tooltip>
            ),
        },
        {
            field: "actived",
            headerName: "Trạng thái",
            width: 160,
            headerAlign: 'center',
            align: 'center',
            renderCell: (params) => (
                (params.row.actived === true) ?
                    <div class="flex items-center border rounded-full px-4 py-2">
                        <div class="h-2.5 w-2.5 rounded-full bg-green-400 mr-2 "></div> Hoạt động
                    </div>
                    : <div class="flex items-center border rounded-full px-4 py-2">
                        <div class="h-2.5 w-2.5 rounded-full bg-red-500 mr-2"></div> Đã khóa
                    </div>
            )
        },
        {
            field: "actions",
            headerName: "Hành động",
            sortable: false,
            disableClickEventBubbling: true,
            disableColumnMenu: true,
            width: 120,
            align: 'center',
            headerAlign: 'center',
            renderCell: (params) => (
                <strong className="flex justify-center">
                    <IconButton className="hover:!bg-blue-300 hover:!text-white"
                        onClick={() => editMember(params.row)}>
                        <BiEdit />
                    </IconButton>
                    <IconButton className="hover:!bg-blue-300 hover:!text-white"
                        onClick={() => UserDelete(params.id)}>
                        <AiOutlineDelete />
                    </IconButton>
                </strong>
            ),
        },
    ];

    const [openMemberDialog, setOpenMemberDialog] = useState(false);
    const [memberData, setMemberData] = useState(initialFormData);

    const editMember = async (memberData) => {
        setOpenMemberDialog(true);
        setMemberData(memberData);
    };
    const clearMemberData = async () => {
        setMemberData(initialFormData);
    };
    const handleChanged = (e) => {
        setMemberData({
            ...memberData,
            [e.target.name]: e.target.value
        });
    };
    const handleClickedOpen = () => {
        setOpenMemberDialog(true);
    };

    const handleClosed = () => {
        setOpenMemberDialog(false);
        clearMemberData();
    };

    const saveMember = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        const formData = new FormData();
        const data = { ...memberData }
        console.log(data);
        formData.append("givenName", data.givenName);
        formData.append("address", data.address);
        formData.append("email", data.email);
        formData.append("typeUsersId", data.typeUsersId);
        formData.append("instituteId", data.instituteId);
        formData.append("provinceId", data.provinceId);
        if (data.actived === true) {
            formData.append("actived", 'true')
            formData.append("block", 'false')
        } else {
            formData.append("block", "true")
            formData.append("actived", "false")
        }
        var config = {
            method: 'post',
            url: 'http://10.220.5.65:8090/api/v1/admin/update-users/' + memberData.id,
            headers: {
                'Authorization': 'Bearer ' + token
            },
            data: formData
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
                        title: 'Chỉnh sửa thành công'
                    })
                    setOpenMemberDialog(false)
                    setIsLoading(false)
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
    };

    const fetchData = async () => {
        try {
            const params = { page: 1, size: 100 }
            setIsLoading(true)
            const res = await adminApi.getListReporter(params)
            const ress = await adminApi.getInf()
            console.log('Fetch products successfully: ', res);
            if (res != null) {
                setUser(res.data?.result?.data);
                setProvinces(ress.data.result.province)
                setTypeUsers(ress.data.result.typeUsers)
                setInstitute(ress.data.result.institute)
                setIsLoading(false)
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
    }, [loadingStorage]);
    const Rows = useMemo(() => {
        const cloneData = [...user];
        const arr = cloneData.map((item) => ({
            id: item.id,
            avatar: item.avatar,
            givenName: item.givenName,
            email: item.email,
            Institute: item.Institute?.name,
            instituteId: item.instituteId,
            address: item.address,
            phone: item.phone,
            TypeUser: item.TypeUser?.name,
            typeUsersId: item.typeUsersId,
            provinceId: item.provinceId,
            actived: item.actived,
            block: item.block
        }));
        return arr;
    }, [user]);
    // ----- dropdown treee
    var ddTree;
    var ddTrees;
    const fields = { dataSource: provinces, value: 'id', text: 'name', parentValue: 'parentId', child: 'children' };
    const handleOnChangeDropdownTree = () => {
        setMemberData((prev) => ({ ...prev, provinceId: ddTree.value && ddTree.value.length > 0 ? ddTree.value[0] : "" }));
    }
    const fieldss = { dataSource: institute, value: 'id', text: 'name', child: 'children' };
    const handleOnChangeDropdownTreee = () => {
        setMemberData((prev) => ({ ...prev, instituteId: ddTrees.value && ddTrees.value.length > 0 ? console.log(ddTrees.value[0]) : "" }));
    }
    return (
        <>
            <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
            >
                <Grid item md={4}>
                    <Dialog
                        // disableBackdropClick
                        open={openMemberDialog}
                        onClose={handleClosed}
                        aria-labelledby="form-dialog-title"
                    >
                        <DialogTitle id="form-dialog-title">
                            Chỉnh sửa thông tin
                        </DialogTitle>
                        <DialogContent>
                            <TextField
                                defaultValue={memberData.givenName}
                                value={memberData.givenName}
                                onChange={handleChanged}
                                id="givenName"
                                name="givenName"
                                label="Họ và tên"
                                type="text"
                                fullWidth
                                error={memberData.givenName === ""}
                                helperText={memberData.givenName === "" ? 'Không được để trường rỗng!' : ' '}
                                sx={{ mt: 2 }}
                            />
                            <TextField
                                defaultValue={memberData.address}
                                value={memberData.address}
                                onChange={handleChanged}
                                id="address"
                                name="address"
                                label="Địa chỉ"
                                type="text"
                                fullWidth
                                error={memberData.address === ""}
                                helperText={memberData.address === "" ? 'Không được để trường rỗng!' : ' '}
                            />
                            <TextField
                                defaultValue={memberData.email}
                                value={memberData.email}
                                onChange={handleChanged}
                                id="email"
                                name="email"
                                label="email"
                                type="text"
                                fullWidth
                                error={memberData.email === ""}
                                helperText={memberData.email === "" ? 'Không được để trường rỗng!' : ' '}
                            />
                            <FormControl variant="outlined" >
                                <InputLabel id="demo-simple-select-label">Loại người dùng</InputLabel>
                                <Select
                                    value={memberData.typeUsersId}
                                    defaultValue={memberData.typeUsersId}
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    name="typeUsersId"
                                    onBlur={handleChanged}
                                    label="Loại người dùng"
                                    sx={{ width: '550px', mb: 3 }}
                                >
                                    {typeusers.map((x, index) => (
                                        <MenuItem value={x.id} key={index}>
                                            {x.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormControl variant="outlined" style={{ marginBottom: '24px', border: '1px', backgroundColor: '#ede7e6', borderRadius: '5px', width: '100%' }}>
                                {/* <InputLabel id="demo-simple-select-label">Đơn vị</InputLabel> */}
                                <DropDownTreeComponent
                                    ref={(dropdowntrees) => { ddTrees = dropdowntrees }}
                                    fields={fieldss}
                                    allowFiltering={false}
                                    change={handleOnChangeDropdownTreee}
                                    placeholder="Chọn trường thích hợp"
                                    value={[String(memberData.instituteId)]}
                                    changeOnBlur={false}
                                    popupHeight="400px"
                                    style={{ fontSize: '16px', height: '45px', paddingLeft: '14px' }}
                                />
                            </FormControl>
                            <FormControl variant="outlined" style={{ marginBottom: '24px', border: '1px', backgroundColor: '#ede7e6', borderRadius: '5px', width: '100%' }}>
                                <DropDownTreeComponent
                                    ref={(dropdowntree) => { ddTree = dropdowntree }}
                                    fields={fields}
                                    allowFiltering={false}
                                    change={handleOnChangeDropdownTree}
                                    placeholder="Chọn trường thích hợp"
                                    value={[String(memberData.provinceId)]}
                                    changeOnBlur={false}
                                    popupHeight="400px"
                                    style={{ fontSize: '16px', height: '45px', paddingLeft: '14px' }}
                                />
                            </FormControl>
                            <FormControl variant="outlined" >
                                <InputLabel id="demo-simple-select-label">Trạng thái tài khoản</InputLabel>
                                <Select
                                    value={memberData.actived}
                                    defaultValue={memberData.actived}
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    name="actived"
                                    onChange={handleChanged}
                                    label="Trạng thái tài khoản"
                                    sx={{ width: '550px' }}
                                >
                                    <MenuItem value={true}>Mở</MenuItem>
                                    <MenuItem value={false}>Đóng</MenuItem>
                                </Select>
                            </FormControl>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClosed} color="primary">
                                Hủy
                            </Button>
                            <Button onClick={saveMember} color="primary" >
                                Cập nhật
                            </Button>
                        </DialogActions>
                        {/* </form> */}
                    </Dialog>
                </Grid>
            </Grid>
            <Box sx={{ height: 631, width: "100%" }}>
                <DataGrid
                    columns={columns}
                    rows={Rows}
                    pageSize={10}
                    disableSelectionOnClick {...Rows}
                    rowsPerPageOptions={[10]}
                    loading={isLoading}
                    experimentalFeatures={{ newEditingApi: true }}
                    sx={datagridSx}
                    components={{
                        Toolbar: CustomToolbar,
                    }}
                    initialState={{
                        filter: {
                            filterModel: {
                                items: [],
                                quickFilterLogicOperator: GridLinkOperator.Or,
                            },
                        },
                    }}
                />
            </Box>
        </>
    );
};


