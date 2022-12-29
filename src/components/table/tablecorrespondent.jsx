import Box from "@material-ui/core/Box";
import React, { useMemo, useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Tooltip, TextField, Grid,Badge, IconButton, Button, Select, FormControl, Popover, InputLabel, MenuItem } from "@material-ui/core";
import Avatar from '@material-ui/core/Avatar';
import adminApi from "../../api/adminApi";
import ClearIcon from '@material-ui/icons/Clear';
import SearchIcon from '@material-ui/icons/Search';
import { makeStyles, createTheme, withStyles } from '@material-ui/core/styles';
import NoRowsOverlay from '../NoRowsOverlay';
import { deepPurple, purple } from '@material-ui/core/colors';
import { RiFilter2Fill } from "react-icons/ri";

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
export default function TableCorrespondent() {
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
    const url = `${process.env.REACT_APP_URL}/api/v1/media/view/`;
    const [typeusers, setTypeUsers] = useState([]);
    const [inputValues, setInputValues] = useState({})
    const xx = typeusers.filter((x) => (x.id !== 2) && (x.id !== 1) && (x.id !== 5))
    const handleOnChange = (e) => {
        setInputValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

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
            field: "givenName",
            headerName: "Họ & Tên",
            headerClassName: 'super-app-theme--header',
            flex: 1,
            minWidth: 200,
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
            field: "email",
            headerName: "Email",
            headerClassName: 'super-app-theme--header',
            flex: 1,
            minWidth: 200,
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
            flex: 1,
            minWidth: 200,
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
            flex: 1,
            minWidth: 200,
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
            flex: 1,
            minWidth: 200,
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
            headerName: "Loại người dùng",
            headerClassName: 'super-app-theme--header',
            flex: 1,
            minWidth: 200,
            headerAlign: 'center',
            align: 'left',
            renderCell: (params) => (
                <Tooltip title={params.value} >
                    <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{params.value}</span>
                </Tooltip>
            ),
        },
    ];

    const fetchData = async () => {
        try {
            const params = { typeUsersId: inputValues.typeUsersId, page: 1, size: 100 }
            const ress = await adminApi.getInf()
            const res = await adminApi.getJournaList(params)
            if (ress != null && res != null) {
                setTypeUsers(ress.data.result.typeUsers)
                setUser(res.data.result.data)
            }
        } catch (error) {
            let statusText = " lỗi rồi ahihi "
            try {
                statusText = error.res.statusText;
            } catch (e) {

            }
            console.log(error.toString() + ".\n" + statusText);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const Rows = useMemo(() => {
        const cloneData = [...user];
        const arr = cloneData.map((item) => ({
            id: item.id,
            avatar: item.avatar,
            givenName: item.givenName,
            email: item.email,
            Institute: item.Institute?.name,
            address: item.Institute?.address,
            phone: item.phone,
            TypeUser: item.TypeUser?.name
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
                    <Box style={{ padding: '16px', display: 'flex', flexDirection: 'column', borderRadius: '5px', width: '350px' }}>
                        <InputLabel>Loại tài khoản</InputLabel>
                        <FormControl variant="outlined" style={{ marginBottom: '24px', width: 'auto' }}>
                            <Select
                                name="typeUsersId"
                                onChange={handleOnChange}
                                inputProps={{
                                    sx: {
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
                        Toolbar: QuickSearchToolbar,NoRowsOverlay
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


