import React, { useState, useEffect, forwardRef, useRef } from "react";
import { Button, Select, FormControl, InputLabel, Box, TextField, MenuItem, Grid } from "@material-ui/core";
import { DropDownTreeComponent } from '@syncfusion/ej2-react-dropdowns';
import MaterialTable from "material-table";
import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import Alert from '@material-ui/lab/Alert';
import { RiEmotionSadLine } from "react-icons/ri"
import adminApi from '../../api/adminApi'
import { MdLibraryAdd } from 'react-icons/md'
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import { Header } from '../../components';
import IconButton from '@material-ui/core/IconButton';
import { AiFillCloseCircle } from "react-icons/ai";
import { deepPurple, purple } from '@material-ui/core/colors';
import { withStyles } from '@material-ui/core/styles';
import withReactContent from 'sweetalert2-react-content'
import Swal from 'sweetalert2'
import axios from 'axios';

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => (
        <ChevronRight {...props} ref={ref} />
    )),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => (
        <ChevronLeft {...props} ref={ref} />
    )),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};
export default function TableListUnitsCqnn() {
    const ColorButton = withStyles((theme) => ({
        root: {
            color: theme.palette.getContrastText(deepPurple[500]),
            backgroundColor: purple[500],
            '&:hover': {
                backgroundColor: purple[700],
            },
        },
    }))(Button);
    const tableRef = useRef();
    const [users, setUsers] = useState([]);
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
            const res = await adminApi.getListUnitsNPN()
            const ress = await adminApi.getInf()

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

            setUsers(flatten(res?.data?.result));
            setProvinces(ress.data?.result?.province)
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
    }, [])

    const columns = [
        {
            title: "id",
            field: "id",
            hidden: true
        },
        {
            title: "Tên đơn vị",
            field: "name",
            width: "50%",
            cellStyle: { width: "50%" },
            headerStyle: { width: "50%" },
        },
        {
            title: "Địa chỉ",
            field: "address",
            width: "50%",
            cellStyle: { width: "50%" },
            headerStyle: { width: "50%" },
        },

    ]
    //for error handling
    const [iserror, setIserror] = useState(false)
    const [errorMessages, setErrorMessages] = useState([])


    useEffect(() => {
        tableRef.current.state.data = tableRef.current.state.data.map((data) => {
            data.users.showDetailPanel = tableRef.current.props.detailPanel;
            return data;
        });
    }, []);
    // ----- dropdown treee
    var ddTree;
    const fields = { dataSource: provinces, value: 'id', text: 'name', parentValue: 'parentId', child: 'children', hierarchy: 'hierarchyLevel' };
    const handleOnChangeDropdownTree = () => {
        setInputValues((prev) => ({ ...prev, provinceId: ddTree.value && ddTree.value.length > 0 ? ddTree.value[0] : "" }))
    }
    return (
        <>
            <Box style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
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
                                            defaultValue={2}
                                            disabled
                                        >
                                            <MenuItem value={2}>Đơn vị cơ quan nhà nước</MenuItem>
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
                                <Grid item >
                                    <TextField
                                        type="text"
                                        margin="normal"
                                        name='maED'
                                        label="Mã ED"
                                        fullWidth
                                        variant="outlined"
                                        onChange={handleOnChange}
                                    />
                                </Grid>
                                <Grid item >
                                    <TextField
                                        type="text"
                                        margin="normal"
                                        name='maID'
                                        label="Mã ID"
                                        fullWidth
                                        variant="outlined"
                                        onChange={handleOnChange}
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
                                        multiline
                                        rows={4}
                                        fullWidth
                                        label="Nhập mô tả"
                                        variant="outlined"
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
                                onClick={fetchData}
                                style={{ marginBottom: '10px', marginTop: '10px' }}
                            >
                                Đăng ký
                            </ColorButton>
                        </form>
                    </DialogContent>
                </Dialog>
            </Box>

            <Grid>
                <div>
                    {iserror &&
                        <Alert severity="error">
                            {errorMessages.map((msg, i) => {
                                return <div key={i}>{msg}</div>
                            })}
                        </Alert>
                    }
                    <MaterialTable
                        title=""
                        tableRef={tableRef}
                        localization={{
                            header: {
                                actions: 'Hành động'
                            },
                            body:
                            {
                                editRow:
                                {
                                    deleteText: 'Bạn thật sự muốn xóa tài khoản này'
                                },
                                emptyDataSourceMessage:
                                    <div className="w-full h-full flex items-center justify-center ">
                                        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-violet-400"></div>
                                    </div>
                            }
                        }}
                        icons={tableIcons}
                        columns={columns}
                        data={users}
                        parentChildData={(row, rows) => rows.find(a => a.id === row.parentId)}
                        options={{
                            actionsColumnIndex: -1, headerStyle: {
                                backgroundColor: " #80d4ff"
                            },
                        }}
                    />
                </div>
            </Grid>
        </>
    );
};

