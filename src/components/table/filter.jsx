import React, { useState } from 'react';
import Box from '@mui/material/Box';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Checkbox from '@mui/material/Checkbox';
import Popover from '@mui/material/Popover';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import { RiFilter2Fill } from "react-icons/ri";
import { styled, createTheme, ThemeProvider } from '@mui/system';
import { MenuItem } from '@mui/material';

export default function Filter() {
    const [anchorEl, setAnchorEl] = useState(null);
    const handleClick = (e) => {
        setAnchorEl(e.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const [checked, setChecked] = useState({
        check1: false,
        check2: false
    });

    const handleChange = (e) => {
        setChecked({
            ...checked,
            [e.target.name]: e.target.checked,
        });
    };
    const { check1, check2 } = checked
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    return (
        <>
            <Button aria-describedby={id} variant="outlined" onClick={handleClick} startIcon={<RiFilter2Fill />}>
                Bộ lọc
            </Button>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'left',
                    horizontal: 'left',
                }}
                sx={{ position: 'absolute', top: '40px' }}
            >
                <Box>
                    <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
                        <FormLabel component="legend">Theo loại đơn vị</FormLabel>
                        <FormGroup>
                            <FormControlLabel
                                control={
                                    <Checkbox checked={check1} onChange={handleChange} name="check1" />
                                }
                                label="Đơn vị báo chí"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox checked={check2} onChange={handleChange} name="check2" />
                                }
                                label="Cơ quan nhà nước"
                            />
                        </FormGroup>
                        <FormHelperText>Be careful</FormHelperText>
                    </FormControl>
                    <FormControl style={{ minWidth: 120 }} variant="outlined">
                        <FormLabel component="legend">Theo loại đơn vị</FormLabel>
                        <InputLabel id="demo-simple-select-outlined-label">
                            Language
                        </InputLabel>
                        <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"

                            onChange={handleChange}
                            label="Language"
                        >
                            <MenuItem></MenuItem>
                        </Select>
                    </FormControl>
                </Box>
            </Popover>
        </>
    )
}