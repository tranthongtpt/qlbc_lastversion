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

export default function FilterUnitsCqnn() {
    const ColorButton = withStyles((theme) => ({
        root: {
            color: theme.palette.getContrastText(deepPurple[500]),
            backgroundColor: purple[500],
            '&:hover': {
                backgroundColor: purple[700],
            },
        },
    }))(Button);

    const [typeusers, setTypeUsers] = useState([]);
    const [inputValues, setInputValues] = useState({})
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

    const fetchData = async () => {
        try {
            const ress = await adminApi.getInf()
            
            if (ress != null) {
                setTypeUsers(ress.data.result.typeUsers)
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
                            {typeusers.map((user, index) => (
                                <MenuItem value={user.id} key={index}>
                                    {user.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <ColorButton onClick={() => fetchData()}>Lọc</ColorButton>
                </Box>
            </Popover>
        </>
    )
}