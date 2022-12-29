import Box from "@material-ui/core/Box";
import React, { useMemo, useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { makeStyles, createTheme } from '@material-ui/core/styles';
import { Avatar, Badge, Grid, Button, TextField, Tooltip, IconButton, Popover, FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";
import adminApi from "../../api/adminApi";
import ClearIcon from '@material-ui/icons/Clear';
import SearchIcon from '@material-ui/icons/Search';
import { deepPurple, purple } from '@material-ui/core/colors';
import withReactContent from 'sweetalert2-react-content'
import Swal from 'sweetalert2'
import { withStyles } from '@material-ui/core/styles';
import { RiFilter2Fill } from "react-icons/ri";
import { DropDownTreeComponent } from '@syncfusion/ej2-react-dropdowns';
import NoRowsOverlay from '../NoRowsOverlay';
import axios from 'axios';
import { MdLibraryAdd } from 'react-icons/md';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import { Header } from '../../components';
import { AiFillCloseCircle } from "react-icons/ai";

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
    }),
    { defaultTheme },
);
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

export default function TableListUnits(props) {
    const ColorButton = withStyles((theme) => ({
        root: {
            color: theme.palette.getContrastText(deepPurple[500]),
            backgroundColor: purple[500],
            '&:hover': {
                backgroundColor: purple[700],
            },
        },
    }))(Button);
    let initialFormData = {
        page: 1,
        size: 1030
    };
    const classes = useStyles();
    const url = `${process.env.REACT_APP_URL}/api/v1/media/view/`;
    const [user, setUser] = useState([]);
    const [loading, setLoading] = useState(false);
    const [opens, setOpens] = useState(false);
    const MySwal = withReactContent(Swal)
    // --------
    const handleClickOpens = () => {
        setOpens(true);
    };
    const handleCloses = () => {
        setOpens(false);
    };

    const [provinces, setProvinces] = useState([]);
    const [inputValues, setInputValues] = useState(initialFormData)
    const [typeInstitute, setTypeInstitute] = useState([]);
    const handleOnChange = (e) => {
        setInputValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };
    // -----   dropdown treee
    var ddTree;
    const fields = { dataSource: provinces, value: 'id', text: 'name', parentValue: 'parentId', child: 'children' };
    const handleOnChangeDropdownTree = () => {
        setInputValues((prev) => ({ ...prev, provinceId: ddTree.value && ddTree.value.length > 0 ? ddTree.value[0] : "" }));
    }
    // -----    end dropdown treee
    const [anchorEl, setAnchorEl] = useState(null);
    const handleClick = (e) => {
        setAnchorEl(e.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    function escapeRegExp(value) {
        return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
    }
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
            field: "maED",
            headerClassName: 'super-app-theme--header',
            headerName: "MãED",
            sortable: false,
            headerAlign: 'center',
            align: 'left',
            renderCell: (params) => (
                <Tooltip title={params.value} >
                    <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{params.value}</span>
                </Tooltip>
            ),
        },
        {
            field: "maID",
            headerClassName: 'super-app-theme--header',
            headerName: "MãID",
            sortable: false,
            minWidth: 150,
            headerAlign: 'center',
            align: 'left',
            renderCell: (params) => (
                <Tooltip title={params.value} >
                    <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{params.value}</span>
                </Tooltip>
            ),
        },
        {
            field: "name",
            headerName: "Tên đơn vị",
            headerClassName: 'super-app-theme--header',
            flex: 1,
            headerAlign: 'center',
            align: 'left',
            renderCell: (params) => (
                <>
                    <Grid container spacing={1} style={{ flexWrap: 'unset' }}>
                        <Grid item>
                            <Badge overlap="circular" badgeContent=" " variant="dot" anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                            }}>
                                <Avatar alt="avt" src={url + `${params.row.avatar}`} />
                            </Badge>
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
            field: "hierarchyLevel",
            headerName: "Cấp đơn vị",
            headerClassName: 'super-app-theme--header',
            flex: .5,
            headerAlign: 'center',
            align: 'center',
            renderCell: (params) => (
                <Tooltip title={params.value} >
                    <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Cấp {params.value}</span>
                </Tooltip>
            ),
        },
        {
            field: "address",
            headerName: "Địa chỉ",
            headerClassName: 'super-app-theme--header',
            flex: 1,
            headerAlign: 'center',
            align: 'left',
            renderCell: (params) => (
                <Tooltip title={params.value} >
                    <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{params.value}</span>
                </Tooltip>
            ),
        },
        {
            field: "typeInstituteId",
            headerName: "Loại đơn vị",
            headerClassName: 'super-app-theme--header',
            flex: .5,
            headerAlign: 'center',
            align: 'left',
            renderCell: (params) => (
                (params.value) === 2 ? <div>Cơ quan nhà nước</div> : <div>Đơn vị báo chí</div>
                // <Tooltip title={params.value} >
                //     <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{params.value}</span>
                // </Tooltip>
            ),
        },

    ];
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
                    setOpens(false)
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
            const params = { provinceId: inputValues.provinceId, typeInstitute: inputValues.typeInstitute, page: 1, size: 1030 }
            const res = await adminApi.getListUnitsCQNN(inputValues)
            const ress = await adminApi.getInf()
            if (res != null && ress != null) {
                setUser(res.data?.result?.data);
                setProvinces(ress.data.result.province)
                setTypeInstitute(ress.data?.result?.typeInstitute)
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
    const Rows = useMemo(() => {
        const cloneData = [...user];
        const arr = cloneData.map((item) => ({
            id: item.id,
            name: item.name,
            description: item.description,
            address: item.address,
            maID: item.maID,
            maED: item.maED,
            avatar: item.avatar,
            hierarchyLevel: item.hierarchyLevel,
            typeInstituteId: item.typeInstituteId
        }));
        return arr;
    }, [user]);
    const [searchText, setSearchText] = useState('');
    const [rowss, setRows] = useState(Rows);
    const requestSearch = (searchValue) => {
        setSearchText(searchValue);
        const searchRegex = new RegExp(escapeRegExp(searchValue), 'i');
        const filteredRows = Rows.filter((row) => {
            return Object.keys(row).some((field) => {
                return searchRegex.test(row[field]);
            });
        });
        console.log(filteredRows);
        setRows(filteredRows);
    };
    useEffect(() => {
        setRows(Rows);
    }, [Rows]);

    return (
        <>
            <Box style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
                {/* ---------- */}
                <Button color="primary" variant="contained" onClick={handleClickOpens} style={{ fontSize: '24px',marginRight:'10px' }}>
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
                {/* ---------- */}
                <Button variant="contained" color="primary" startIcon={<RiFilter2Fill />} aria-describedby={id} onClick={handleClick}>
                    Bộ lọc 
                </Button>
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
                    <Box style={{ padding: '16px', display: 'flex', flexDirection: 'column', borderRadius: '5px', width: '350px' }}>
                        <FormControl variant="outlined" style={{ marginBottom: '24px', border: '1px', backgroundColor: '#F7F7F7', borderRadius: '5px', width: 'auto' }}>
                            <DropDownTreeComponent
                                ref={(dropdowntree) => { ddTree = dropdowntree }}
                                fields={fields}
                                allowFiltering={false}
                                change={handleOnChangeDropdownTree}
                                placeholder="Chọn tìm theo tỉnh/huyện/xã"
                                changeOnBlur={false}
                                popupHeight="400px"
                                style={{ fontSize: '16px', height: '45px', paddingLeft: '14px', border: '5px' }}
                            />
                        </FormControl>
                        <InputLabel>Chọn loại đơn vị</InputLabel>
                        <FormControl variant="outlined" style={{ marginBottom: '24px', width: 'auto' }}>
                            <Select
                                name="typeInstitute"
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
                        <ColorButton onClick={fetchData}>Lọc</ColorButton>
                    </Box>
                </Popover>
            </Box>
            <Box style={{ height: 680, width: '100%' }} className={classes.backgroundHeader}>
                <DataGrid
                    columns={columns}
                    rows={rowss}
                    pageSize={10}
                    disableSelectionOnClick {...Rows}
                    rowsPerPageOptions={[10]}
                    experimentalFeatures={{ newEditingApi: true }}
                    components={{
                        Toolbar: QuickSearchToolbar, NoRowsOverlay
                    }}
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
