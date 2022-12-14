import Box from "@mui/material/Box";
import React, { useMemo, useState, useEffect } from "react";
import { DataGrid, GridToolbarContainer, GridToolbarQuickFilter, GridLinkOperator, } from "@mui/x-data-grid";
import Swal from 'sweetalert2'
import { DropDownTreeComponent } from '@syncfusion/ej2-react-dropdowns';
import withReactContent from 'sweetalert2-react-content'
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { Button, Select, FormControl,Tooltip, InputLabel, TextField, MenuItem, Autocomplete, Grid, Typography, Stack, Badge } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import IconButton from '@mui/material/IconButton';
import { BiEdit, BiMailSend, BiRefresh } from "react-icons/bi";

import { RiFilter2Fill } from "react-icons/ri";
import { AiOutlineDelete } from "react-icons/ai"
// import { toast } from "react-toastify";
import axiosClient from "../../api/axiosClient";
import Avatar from '@mui/material/Avatar';
import adminApi from "../../api/adminApi";
import { styled } from '@mui/material/styles';
export default function InviteWorkTable(props) {
    const [user, setUser] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const url = 'http://10.220.5.65:8090/api/v1/media/view/'
    const loadingStorage = localStorage.getItem('loading');
    function CustomToolbar() {
        return (
            <GridToolbarContainer className="float-right">
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
            align: 'center',
            minWidth: 140,
            renderCell: (params) => (
                <Badge
                    overlap="circular"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    variant="dot"
                >
                    <Avatar alt="avt" src={url + `${params.value}`} />
                </Badge>
            ),
            flex: 1,
        },
        {
            field: "givenName",
            headerName: "Họ & Tên",
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
            field: "email",
            headerName: "Email",
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
            headerName: "Cơ quan",
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
          const params = { typeUsersId: 4, page: 1, size: 100 }
          const res = await adminApi.getJournaList(params)
          console.log('Fetch products successfully: ', res);
          setUser(res.data.result.data)
          console.log(res.data.result.data);
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
    }, [loadingStorage]);


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
    return (
        <>
            <Box sx={{ height: 631, width: "100%" }}>
                <DataGrid
                    columns={columns}
                    rows={Rows}
                    pageSize={10}
                    disableSelectionOnClick {...Rows}
                    rowsPerPageOptions={[10]}
                    loading={isLoading}
                    sx={datagridSx}
                    experimentalFeatures={{ newEditingApi: true }}
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


