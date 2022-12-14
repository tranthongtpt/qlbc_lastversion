import React, { useState, useEffect } from "react";
import { Button, Select, FormControl, InputLabel, Box, TextField, MenuItem, Grid } from "@material-ui/core";
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Autocomplete from '@material-ui/lab/Autocomplete'
import { DropDownTreeComponent } from '@syncfusion/ej2-react-dropdowns';
import withReactContent from 'sweetalert2-react-content'
import Swal from 'sweetalert2'
import axios from 'axios';
import adminApi from "../../../api/adminApi";
import { MdLibraryAdd } from 'react-icons/md'
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import { Header } from '../..';
import IconButton from '@material-ui/core/IconButton';
import { AiFillCloseCircle } from "react-icons/ai";
import { deepPurple, purple } from '@material-ui/core/colors';

export default function InviteWork(props) {
    const ColorButton = withStyles((theme) => ({
        root: {
            color: theme.palette.getContrastText(deepPurple[500]),
            backgroundColor: purple[500],
            '&:hover': {
                backgroundColor: purple[700],
            },
        },
    }))(Button);
    const useStyles = makeStyles((theme) => ({
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

    const [typeusers, setTypeUsers] = useState([]);
    const [typeInstitute, setTypeInstitute] = useState([]);
    const [provinces, setProvinces] = useState([]);
    const [lprovinces, setLprovinces] = useState('');
    const [options, setOptions] = useState("");
    const [inputValues, setInputValues] = useState({})
    const [loading, setLoading] = useState(false);
    const [institute, setInstitute] = useState([]);
    const [value, setValue] = useState(options[0]);
    const [inputValue, setInputValue] = useState('');
    // ------------------------------------------
    const MySwal = withReactContent(Swal)
    // ----- dropdown treee
    var ddTree;
    let fields = { dataSource: institute, value: 'id', text: 'name', child: 'children' };
    const handleOnChangeDropdownTree = () => {
        setInputValues((prev) => ({ ...prev, instituteId: ddTree.value && ddTree.value.length > 0 ? ddTree.value[0] : "" }));
    }
    const onSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        const data = { ...inputValues }
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
                        title: 'Th??m th??nh c??ng'
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
                        title: 'T???o kh??ng th??nh c??ng'
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
            const res = await adminApi.getInf()
            if (res != null) {
                setTypeUsers(res?.data?.result?.typeUsers)
                setTypeInstitute(res?.data?.result?.typeInstitute)
                setInstitute(res?.data?.result?.institute)
                setProvinces(res?.data?.result?.province)
            }
        } catch (error) {
            let statusText = " l???i r???i ahihi "
            try {
                statusText = error.res.statusText;
            } catch (e) {

            }
            console.log(error.toString() + ".\n" + statusText);
        }
    }
    const xx = typeusers.filter((x) => (x.id !== 1) && (x.id !== 2) && (x.id !== 7) && (x.id !== 8) && (x.id !== 9) && (x.id !== 10))
    const xxx = typeusers.filter((x) => (x.id !== 1) && (x.id !== 2) && (x.id !== 3) && (x.id !== 4) && (x.id !== 6))
    const handleChange = (e) => {
        const index = provinces[0]?.children.findIndex(x => x.id === e.target.value);
        setLprovinces(index);
        setOptions(e.target.value)
    }
    const handleOnChange = (e) => {
        setInputValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };
    useEffect(() => {
        fetchData();
    }, [])

    return (
        <>
            <Button variant="contained" color="primary" onClick={handleClickOpen} style={{ fontSize: '24px',marginRight:'10px' }}>
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
                        <Header title="C???p t??i kho???n ng?????i d??ng" />
                        <IconButton
                            aria-label="close"
                            onClick={handleClose}
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
                                    label="Nh???p email"
                                    name='email'
                                    onChange={handleOnChange}
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
                                    label="H??? v?? t??n"
                                    name='givenName'
                                    onChange={handleOnChange}
                                />
                            </Grid>
                            <Grid item xs={6} sm={6}>
                                <InputLabel >Ch???n lo???i ????n v???</InputLabel>
                                <FormControl variant="outlined" style={{ marginBottom: '10px', width: '100%' }}>
                                    <Select
                                        name="typeInstitute"
                                        onChange={handleOnChange}
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
                                <InputLabel>Lo???i t??i kho???n</InputLabel>
                                <FormControl variant="outlined" style={{ marginBottom: '10px', width: '100%' }}>
                                    {inputValues.typeInstitute === 2 ? (<Select
                                        name="typeUsersId"
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
                                    </Select>) : (<Select
                                        name="typeUsersId"
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
                                        placeholder="Ch???n t??n ????n v???"
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
                                            variant="outlined" label="Ch???n T???nh/Th??nh" />}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={6} sm={6} >
                                <FormControl fullWidth variant="outlined" style={{ marginTop: '10px', marginBottom: '10px' }}>
                                    <InputLabel id="demo-simple-select-label">Ch???n Qu???n/Huy???n</InputLabel>
                                    <Select onChange={handleChange} value={options} labelId="demo-simple-select-label" label="Ch???n Qu???n/Huy???n">
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
                                    <InputLabel id="demo-simple-select-label">Ch???n Ph?????ng/X??</InputLabel>
                                    <Select labelId="demo-simple-select-label" label="Ch???n Ph?????ng/X??" onChange={handleOnChange} name="provinceId">
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
                            ????ng k??
                        </ColorButton>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
};
