import React, { useMemo, useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { DropDownTreeComponent } from '@syncfusion/ej2-react-dropdowns';
import axios from 'axios';
import { Button, Select, Popover, FormControl, InputLabel, Box, TextField, MenuItem, Tooltip, Grid, Badge } from "@material-ui/core";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import Autocomplete from '@material-ui/lab/Autocomplete';
import IconButton from '@material-ui/core/IconButton';
import axiosClient from "../../api/axiosClient";
import Avatar from '@material-ui/core/Avatar';
import adminApi from "../../api/adminApi";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles, withStyles, createTheme } from '@material-ui/core/styles';
import ClearIcon from '@material-ui/icons/Clear';
import SearchIcon from '@material-ui/icons/Search';
import { Header } from '../../components';
import { deepPurple, purple } from '@material-ui/core/colors';
import { BiEdit } from "react-icons/bi";
import { AiOutlineDelete, AiFillCloseCircle } from "react-icons/ai"
import { RiFilter2Fill } from "react-icons/ri";
import { MdLibraryAdd } from "react-icons/md";
import NoRowsOverlay from '../NoRowsOverlay';
const defaultTheme = createTheme();
const useStyles = makeStyles(
    (theme) => ({
        root: {
            padding: theme.spacing(0.5, 0.5, 0),
            justifyContent: 'flex-end',
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'wrap',
        },
        backgroundHeader: {
            '& .super-app-theme--header': {
                backgroundColor: 'rgb(128, 212, 255);',
            },
        },
        textField: {
            [theme.breakpoints.down('xs')]: {
                width: '100%',
            },
            margin: theme.spacing(1, 0.5, 1.5),
            '& .MuiSvgIcon-root': {
                marginRight: theme.spacing(0.5),
            },
            '& .MuiInput-underline:before': {
                borderBottom: `1px solid ${theme.palette.divider}`,
            },
        },
        closeButton: {
            position: "absolute",
            right: theme.spacing(1),
            top: theme.spacing(1),
            color: theme.palette.grey[500]
        }
    }),
    { defaultTheme },
);

function escapeRegExp(value) {
    return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}
const StyledBadge = withStyles((theme) => ({
    badge: {
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
            animation: '$ripple 1.2s infinite ease-in-out',
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
}))(Badge);

function QuickSearchToolbar(props) {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <TextField
                variant="standard"
                value={props.value}
                onChange={props.onChange}
                placeholder="Search…"
                className={classes.textField}
                InputProps={{
                    startAdornment: <SearchIcon fontSize="small" />,
                    endAdornment: (
                        <IconButton
                            title="Clear"
                            aria-label="Clear"
                            size="small"
                            style={{ visibility: props.value ? 'visible' : 'hidden' }}
                            onClick={props.clearSearch}
                        >
                            <ClearIcon fontSize="small" />
                        </IconButton>
                    ),
                }}
            />

        </div>
    );
}
export default function InviteWorkTable(props) {
    const ColorButton = withStyles((theme) => ({
        root: {
            color: theme.palette.getContrastText(deepPurple[500]),
            backgroundColor: purple[500],
            '&:hover': {
                backgroundColor: purple[700],
            },
        },
    }))(Button);
    const classes = useStyles();
    const [user, setUser] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const url = `${process.env.REACT_APP_URL}/api/v1/media/view/`;
    const [typeusers, setTypeUsers] = useState([]);
    const [institute, setInstitute] = useState([]);
    const [typeInstitute, setTypeInstitute] = useState([]);

    const [provinces, setProvinces] = useState([]);
    const [lprovinces, setLprovinces] = useState('');
    const [options, setOptions] = useState("");
    const [value, setValue] = useState(options[0]);
    const [inputValue, setInputValue] = useState('');
    const [opens, setOpens] = useState(false);
    const handleClickOpens = () => {
        setOpens(true);
    };
    const handleCloses = () => {
        setOpens(false);
    };
    // ------------------------------------------
    const MySwal = withReactContent(Swal)
    const loadingStorage = localStorage.getItem('loading');
    let initialFormData = {
        page: 1,
        size: 100
    };

    const UserDelete = async (id) => {
        try {
            const res = await axiosClient.delete(`/admin/manager-user/${id}`, id)
            if (res.success) {
                fetchData()
            }
        } catch (error) {
            console.log(error);
        }
    };

    const columns = [
        {
            field: "id",
            headerClassName: 'super-app-theme--header',
            headerName: "Số thứ tự",
            sortable: false,
            headerAlign: 'center',
            align: 'center',
            renderCell: (index) => index.api.getRowIndex(index.row.id) + 1,
        },
        {
            field: "givenName",
            headerName: "Họ & Tên",
            headerClassName: 'super-app-theme--header',
            width: 300,
            headerAlign: 'center',
            align: 'left',
            renderCell: (params) => (
                <>
                    <Grid container spacing={1} style={{ flexWrap: 'unset' }}>
                        <Grid item>
                            {(params.row.actived === true) ?
                                <StyledBadge
                                    overlap="circular"
                                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                    variant="dot"
                                >
                                    <Avatar alt="avt" src={url + `${params.row.avatar}`} />
                                </StyledBadge>
                                : <Badge overlap="circular" badgeContent=" " variant="dot" anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'right',
                                }}>
                                    <Avatar alt="avt" src={url + `${params.row.avatar}`} />
                                </Badge>
                            }
                        </Grid>
                        <Grid item>
                            <Tooltip title={params.value} >
                                <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{params.value}</span>
                            </Tooltip>
                        </Grid>
                    </Grid>
                </>
            ),
        },
        {
            field: "email",
            headerName: "Email",
            headerClassName: 'super-app-theme--header',
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
            headerClassName: 'super-app-theme--header',
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
            field: "TypeUser",
            headerName: "Chức vụ",
            headerClassName: 'super-app-theme--header',
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
            field: "address",
            headerName: "Địa chỉ",
            headerClassName: 'super-app-theme--header',
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
            headerClassName: 'super-app-theme--header',
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
            headerClassName: 'super-app-theme--header',
            width: 160,
            headerAlign: 'center',
            align: 'center',
            renderCell: (params) => (
                (params.row.actived === true) ?
                    <div className="flex items-center">
                        <span className="h-2.5 w-2.5 rounded-full bg-green-400 mr-2 " /> Hoạt động
                    </div>
                    : <div className="flex items-center">
                        <span className="h-2.5 w-2.5 rounded-full bg-red-500 mr-2" /> Đã khóa
                    </div>
            )
        },
        {
            field: "actions",
            headerName: "Hành động",
            headerClassName: 'super-app-theme--header',
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
    const [inputValues, setInputValues] = useState(initialFormData)
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
    const handleOnChange = (e) => {
        setInputValues({
            ...inputValues,
            [e.target.name]: e.target.value
        });
    };
    const handleChange = (e) => {
        const index = provinces[0]?.children.findIndex(x => x.id === e.target.value);
        setLprovinces(index);
        setOptions(e.target.value)
    }
    const handleSelect = (id) => {
        setInputValues({
            ...inputValues,
            'instituteId': id
        });
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
            url: `${process.env.REACT_APP_URL}/api/v1/admin/update-users/` + memberData.id,
            headers: {
                'Authorization': 'Bearer ' + token
            },
            data: formData
        };

        axios(config)
            .then(function (response) {
                if (response.data.success === true) {
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
                    fetchData()
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
    const onSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        const data = { ...memberData }
        const formData = new FormData();
        formData.append('email', data.email);
        formData.append('givenName', data.givenName);
        formData.append('typeUsersId', data.typeUsersId);
        formData.append('instituteId', data.instituteId);
        formData.append('provinceId', data.provinceId);

        const config = {
            method: 'post',
            url: `${process.env.REACT_APP_URL}/api/v1/admin/users-register`,
            headers: {
                'Authorization': 'Bearer ' + token,
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
                        title: 'Thêm thành công'
                    })
                    setOpens(false)
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
    }
    const fetchData = async () => {
        try {
            const flatten = (obj) => {
                const array = Array.isArray(obj) ? obj : [obj];
                return array.reduce((acc, value) => {
                    acc.push(value);
                    if (value.children) {
                        acc = acc.concat(flatten(value.children));
                        delete value.children;
                    }
                    return acc;
                }, []);
            }
            const res = await adminApi.getListReporter(inputValues)
            const ress = await adminApi.getInf()
            if (res.data.success === true) {
                setUser(res?.data?.result?.data);
                setTypeUsers(ress?.data?.result?.typeUsers)
                setInstitute(flatten(ress?.data?.result?.institute))
                setTypeInstitute(ress?.data?.result?.typeInstitute)
                setProvinces(ress?.data?.result?.province)
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
    const xx = typeusers.filter((x) => (x.id !== 1) && (x.id !== 2) && (x.id !== 7) && (x.id !== 8) && (x.id !== 9) && (x.id !== 10))
    const xxx = typeusers.filter((x) => (x.id !== 1) && (x.id !== 2) && (x.id !== 3) && (x.id !== 4) && (x.id !== 6))
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
    const [searchText, setSearchText] = useState('');
    const [rows, setRows] = useState(Rows);
    const requestSearch = (searchValue) => {
        setSearchText(searchValue);
        const searchRegex = new RegExp(escapeRegExp(searchValue), 'i');
        const filteredRows = Rows.filter((row) => {
            return Object.keys(row).some((field) => {
                return searchRegex.test(row[field]);
            });
        });
        setRows(filteredRows);
    };
    useEffect(() => {
        setRows(Rows);
    }, [Rows]);
    // ----- dropdown treee
    var ddTree;
    var ddTrees;
    let fields = { dataSource: institute, value: 'id', text: 'name', child: 'children' };
    const handleOnChangeDropdownTree = () => {
        setMemberData((prev) => ({ ...prev, instituteId: ddTree.value && ddTree.value.length > 0 ? ddTree.value[0] : "" }));
    }
    let fieldss = { dataSource: provinces, value: 'id', text: 'name', child: 'children' };
    const handleOnChangeDropdownTrees = () => {
        setMemberData((prev) => ({ ...prev, provinceId: ddTrees.value && ddTrees.value.length > 0 ? ddTrees.value[0] : "" }));
    }
    // -----
    const [anchorEl, setAnchorEl] = useState(null);
    const handleClick = (e) => {
        setAnchorEl(e.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    function getIndex(id) {
        return institute.findIndex(obj => obj.id === id);
    }
    return (
        <>
            <Box style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
                <Button variant="contained" color="primary" onClick={handleClickOpens} style={{ fontSize: '24px', marginRight: '10px' }}>
                    <MdLibraryAdd />
                </Button>
                <Dialog
                    disableEscapeKeyDown
                    open={opens}
                    onClose={handleCloses}
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
                                onClick={handleCloses}
                                className={classes.closeButton}
                            >
                                <AiFillCloseCircle />
                            </IconButton>
                        </MuiDialogTitle>
                        <form onSubmit={onSubmit} className="">
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
                                        onChange={handleChanged}
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
                                        onChange={handleChanged}
                                    />
                                </Grid>
                                <Grid item xs={6} sm={6}>
                                    <InputLabel >Chọn loại đơn vị</InputLabel>
                                    <FormControl variant="outlined" style={{ marginBottom: '10px', width: '100%' }}>
                                        <Select
                                            name="typeInstitute"
                                            onChange={handleChanged}
                                        >
                                            {typeInstitute.map((user, index) => (
                                                <MenuItem value={user.id} key={index}>
                                                    {user.name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={6} sm={6}>
                                    <InputLabel>Loại tài khoản</InputLabel>
                                    <FormControl variant="outlined" style={{ marginBottom: '10px', width: '100%' }}>
                                        {memberData.typeInstitute === 2 ? (<Select
                                            name="typeUsersId"
                                            onChange={handleChanged}
                                            inputProps={{
                                                style: {
                                                    backgroundColor: '#F7F7F7'
                                                }
                                            }}
                                        >
                                            {xx.map((user, index) => (
                                                <MenuItem value={user.id} key={index}>
                                                    {user.name}
                                                </MenuItem>
                                            ))}
                                        </Select>) : (<Select
                                            name="typeUsersId"
                                            onChange={handleChanged}
                                            inputProps={{
                                                style: {
                                                    backgroundColor: '#F7F7F7'
                                                }
                                            }}
                                        >
                                            {xxx.map((user, index) => (
                                                <MenuItem value={user.id} key={index}>
                                                    {user.name}
                                                </MenuItem>
                                            ))}
                                        </Select>)}
                                    </FormControl>
                                </Grid>
                                <Grid item xs={6} sm={6}>
                                    <FormControl fullWidth variant="outlined" style={{ marginTop: '10px', backgroundColor: '#F7F7F7', marginBottom: '10px', borderRadius: '5px', width: '100%' }}>
                                        <DropDownTreeComponent
                                            ref={(dropdowntree) => { ddTree = dropdowntree }}
                                            fields={fields}
                                            allowFiltering={false}
                                            change={handleOnChangeDropdownTree}
                                            placeholder="Chọn tên đơn vị"
                                            changeOnBlur={false}
                                            popupHeight="400px"
                                            style={{ fontSize: '16px', height: '45px', paddingLeft: '14px' }}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={6} sm={6} >
                                    <FormControl fullWidth style={{ marginTop: '10px', marginBottom: '10px' }}>
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
                                            options={provinces.map((province, index) => (
                                                province.name
                                            ))}
                                            renderInput={(params) => <TextField {...params}
                                                variant="outlined" label="Chọn Tỉnh/Thành" />}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={6} sm={6} >
                                    <FormControl fullWidth variant="outlined" style={{ marginTop: '10px', marginBottom: '10px' }}>
                                        <InputLabel id="demo-simple-select-label">Chọn Quận/Huyện</InputLabel>
                                        <Select onChange={handleChange} value={options} labelId="demo-simple-select-label" label="Chọn Quận/Huyện">
                                            {provinces[0]?.children?.map((district, index) => {
                                                return (
                                                    <MenuItem value={district.id} key={index}>
                                                        {district.name}
                                                    </MenuItem>
                                                )
                                            })}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={6} sm={6} >
                                    <FormControl fullWidth variant="outlined" style={{ marginTop: '10px', marginBottom: '10px' }}>
                                        <InputLabel id="demo-simple-select-label">Chọn Phường/Xã</InputLabel>
                                        <Select labelId="demo-simple-select-label" label="Chọn Phường/Xã" onChange={handleChanged} name="provinceId">
                                            {provinces[0]?.children[lprovinces]?.children?.map((district, index) => {
                                                return (
                                                    <MenuItem value={district.id} key={index}>
                                                        {district.name}
                                                    </MenuItem>
                                                )
                                            })}
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>
                            <ColorButton
                                type="submit"
                                variant="contained"
                                fullWidth
                                style={{ marginBottom: '10px', marginTop: '10px' }}
                                onClick={fetchData}
                            >
                                Đăng ký
                            </ColorButton>
                        </form>
                    </DialogContent>
                </Dialog>
                {/* ----------------------- */}
                <Button variant="contained" color="primary" startIcon={<RiFilter2Fill />} aria-describedby={id} onClick={handleClick}>Bộ lọc </Button>
                <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    style={{ position: 'absolute', top: '40px' }}
                >
                    <Box style={{ padding: '16px', display: 'flex', flexDirection: 'column', borderRadius: '5px', width: '300px' }}>
                        <InputLabel>Tìm theo tên đơn vị</InputLabel>
                        <FormControl variant="outlined" style={{ marginBottom: '24px', width: 'auto' }}>
                            <Autocomplete
                                value={
                                    institute[getIndex(inputValues.instituteId)]
                                }
                                id="combo-box-demo"
                                onChange={(event, value) => handleSelect(value.id)}
                                options={[...institute]}
                                getOptionLabel={(option) => option.name}
                                style={{ width: '100%' }}
                                renderInput={(params) => <TextField {...params} variant="outlined" />}
                            />
                        </FormControl>
                        <InputLabel>Chọn loại đơn vị</InputLabel>
                        <FormControl variant="outlined" style={{ marginBottom: '24px', width: 'auto' }}>
                            <Select
                                value={inputValues.typeinstitute}
                                name="typeinstitute"
                                onChange={handleOnChange}
                                inputProps={{
                                    style: {
                                        backgroundColor: '#F7F7F7'
                                    }
                                }}
                            >
                                {typeInstitute.map((user, index) => (
                                    <MenuItem value={user.id} key={index}>
                                        {user.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <InputLabel>Loại tài khoản</InputLabel>
                        {inputValues.typeinstitute === 2 ? (<FormControl variant="outlined" style={{ marginBottom: '24px', width: 'auto' }}>
                            <Select
                                value={inputValues.typeUsers}
                                name="typeUsers"
                                onChange={handleOnChange}
                                inputProps={{
                                    style: {
                                        backgroundColor: '#F7F7F7'
                                    }
                                }}
                            >
                                {xx.map((user, index) => (
                                    <MenuItem value={user.id} key={index}>
                                        {user.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>) : (<FormControl variant="outlined" style={{ marginBottom: '24px', width: 'auto' }}>
                            <Select
                                value={inputValues.typeUsers}
                                name="typeUsers"
                                onChange={handleOnChange}
                                inputProps={{
                                    style: {
                                        backgroundColor: '#F7F7F7'
                                    }
                                }}
                            >
                                {xxx.map((user, index) => (
                                    <MenuItem value={user.id} key={index}>
                                        {user.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>)}
                        <InputLabel>Chọn trạng thái hoạt động</InputLabel>
                        <FormControl variant="outlined" style={{ marginBottom: '24px', width: 'auto' }}>
                            <Select
                                value={inputValues.isBlock}
                                name="isBlock"
                                onChange={handleOnChange}
                                inputProps={{
                                    style: {
                                        backgroundColor: '#F7F7F7'
                                    }
                                }}
                            >
                                <MenuItem value={1}>Khoá</MenuItem>
                                <MenuItem value={0}>Hoạt động</MenuItem>
                            </Select>
                        </FormControl>
                        <ColorButton fullWidth onClick={fetchData}>Lọc</ColorButton>
                    </Box>
                </Popover>
                {/* ----------------------- */}
            </Box>
            <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
            >
                <Grid item md={4}>
                    <Dialog
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
                                variant="outlined"
                                fullWidth
                                error={memberData.givenName === ""}
                                helperText={memberData.givenName === "" ? 'Không được để trường rỗng!' : ' '}
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
                                variant="outlined"
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
                                variant="outlined"
                                error={memberData.email === ""}
                                helperText={memberData.email === "" ? 'Không được để trường rỗng!' : ' '}
                            />
                            <FormControl variant="outlined" fullWidth>
                                <InputLabel id="demo-simple-select-label">Loại người dùng</InputLabel>
                                <Select
                                    value={memberData.typeUsersId}
                                    defaultValue={memberData.typeUsersId}
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    name="typeUsersId"
                                    onBlur={handleChanged}
                                    label="Loại người dùng"
                                    style={{ marginBottom: '14px' }}
                                >
                                    {typeusers.map((x, index) => (
                                        <MenuItem value={x.id} key={index}>
                                            {x.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormControl variant="outlined" style={{ marginBottom: '24px', border: '1px', backgroundColor: '#F7F7F7', borderRadius: '5px', width: '100%' }}>
                                <DropDownTreeComponent
                                    ref={(dropdowntree) => { ddTree = dropdowntree }}
                                    fields={fields}
                                    allowFiltering={false}
                                    change={handleOnChangeDropdownTree}
                                    placeholder="Chọn tên đơn vị"
                                    value={[String(memberData.instituteId)]}
                                    changeOnBlur={false}
                                    filterBarPlaceholder='Search'
                                    popupHeight="400px"
                                    style={{ fontSize: '16px', height: '45px', paddingLeft: '14px' }}
                                />
                            </FormControl>
                            <FormControl variant="outlined" style={{ marginBottom: '24px', border: '1px', backgroundColor: '#F7F7F7', borderRadius: '5px', width: '100%' }}>
                                <DropDownTreeComponent
                                    ref={(dropdowntree) => { ddTrees = dropdowntree }}
                                    fields={fieldss}
                                    allowFiltering={false}
                                    change={handleOnChangeDropdownTrees}
                                    placeholder="Chọn tỉnh thích hợp"
                                    value={[String(memberData.provinceId)]}
                                    changeOnBlur={false}
                                    popupHeight="400px"
                                    style={{ fontSize: '16px', height: '45px', paddingLeft: '14px' }}
                                />
                            </FormControl>
                            <FormControl variant="outlined" fullWidth>
                                <InputLabel id="demo-simple-select-label">Trạng thái tài khoản</InputLabel>
                                <Select
                                    value={memberData.actived}
                                    defaultValue={memberData.actived}
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    name="actived"
                                    onChange={handleChanged}
                                    label="Trạng thái tài khoản"

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
            <Box style={{ height: 680, width: '100%' }} className={classes.backgroundHeader}>
                <DataGrid
                    columns={columns}
                    rows={rows}
                    pageSize={10}
                    rowsPerPageOptions={[10]}
                    loading={isLoading}
                    experimentalFeatures={{ newEditingApi: true }}
                    components={{ Toolbar: QuickSearchToolbar, NoRowsOverlay }}
                    disableColumnMenu
                    componentsProps={{
                        toolbar: {
                            value: searchText,
                            onChange: (event) => requestSearch(event.target.value),
                            clearSearch: () => requestSearch(''),
                        },
                    }}
                />
            </Box>
        </>
    );
};


