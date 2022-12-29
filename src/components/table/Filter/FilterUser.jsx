import React, { useState, useEffect } from 'react';
import Box from '@material-ui/core/Box';
import FormControl from '@material-ui/core/FormControl';
import Popover from '@material-ui/core/Popover';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import { RiFilter2Fill } from "react-icons/ri";
import MenuItem from '@material-ui/core/MenuItem';
import { DropDownTreeComponent } from '@syncfusion/ej2-react-dropdowns';
import adminApi from "../../../api/adminApi";
import { deepPurple, purple } from '@material-ui/core/colors';
import { withStyles } from '@material-ui/core/styles';

export default function FilterUser() {
    const ColorButton = withStyles((theme) => ({
        root: {
            color: theme.palette.getContrastText(deepPurple[500]),
            backgroundColor: purple[500],
            '&:hover': {
                backgroundColor: purple[700],
            },
        },
    }))(Button);

    const [provinces, setProvinces] = useState([]);
    const [inputValues, setInputValues] = useState({})
    const [institute, setInstitute] = useState([]);
    const [typeusers, setTypeUsers] = useState([]);
    const [typeInstitute, setTypeInstitute] = useState([]);
    const handleOnChange = (e) => {
        setInputValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };
    // -----   dropdown treee
    var ddTree;
    var ddTrees;
    const fields = { dataSource: provinces, value: 'id', text: 'name', parentValue: 'parentId', child: 'children' };
    const handleOnChangeDropdownTree = () => {
        setInputValues((prev) => ({ ...prev, provinceId: ddTree.value && ddTree.value.length > 0 ? ddTree.value[0] : "" }));
    }
    const fieldss = { dataSource: institute, value: 'id', text: 'name', child: 'children' };
    const handleOnChangeDropdownTreee = () => {
        setInputValues((prev) => ({ ...prev, instituteId: ddTrees.value && ddTrees.value.length > 0 ? console.log(ddTrees.value[0]) : "" }));
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

    const fetchData = async () => {
        try {
            const ress = await adminApi.getInf()
            if (ress != null) {
                setProvinces(ress.data.result.province)
                setTypeUsers(ress.data.result.typeUsers)
                setInstitute(ress.data.result.institute)
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
    return (
        <>
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
                    <Box style={{ padding: '16px', display: 'flex', flexDirection: 'column', borderRadius: '5px', width: '350px'}}>
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
                        <FormControl variant="outlined" style={{ marginBottom: '24px', border: '1px', backgroundColor: '#F7F7F7', borderRadius: '5px', width: 'auto' }}>
                            <DropDownTreeComponent
                                ref={(dropdowntrees) => { ddTrees = dropdowntrees }}
                                fields={fieldss}
                                allowFiltering={false}
                                change={handleOnChangeDropdownTreee}
                                placeholder="Chọn tìm theo đơn vị"
                                changeOnBlur={false}
                                popupHeight="400px"
                                style={{ fontSize: '16px', height: '45px', paddingLeft: '14px' }}
                            />
                        </FormControl>
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
                                {typeusers.map((user, index) => (
                                    <MenuItem value={user.id} key={index}>
                                        {user.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <InputLabel>Chọn loại đơn vị</InputLabel>
                        <FormControl variant="outlined" style={{ marginBottom: '24px', width: 'auto' }}>
                            <Select
                                name="typeInstitute"
                                onChange={handleOnChange}
                                inputProps={{
                                    sx: {
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
                        <InputLabel>Chọn trạng thái hoạt động</InputLabel>
                        <FormControl variant="outlined" style={{ marginBottom: '24px', width: 'auto' }}>
                            <Select
                                name="block"
                                onChange={handleOnChange}
                                inputProps={{
                                    sx: {
                                        backgroundColor: '#F7F7F7'
                                    }
                                }}
                            >
                                <MenuItem value={1}>Khoá</MenuItem>
                                <MenuItem value={0}>Hoạt động</MenuItem>
                            </Select>
                        </FormControl>
                        <ColorButton onClick={() => fetchData()}>Lọc</ColorButton>
                    </Box>
                </Popover>
        </>
    )
}