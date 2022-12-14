import Box from "@mui/material/Box";
import React, { useMemo, useState, useEffect } from "react";
import { DataGrid, GridToolbarContainer, GridToolbarQuickFilter, GridLinkOperator, } from "@mui/x-data-grid";
import Swal from 'sweetalert2'
import { DropDownTreeComponent } from '@syncfusion/ej2-react-dropdowns';
import withReactContent from 'sweetalert2-react-content'
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { Button, Select, FormControl, InputLabel, TextField, MenuItem, Tooltip, Autocomplete, Grid, Typography, Stack, Badge } from "@mui/material";
import { RiFilter2Fill } from "react-icons/ri";

import adminApi from "../../api/adminApi";

export default function InviteWorkTable(props) {
    const [user, setUser] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const url = 'http://10.220.5.65:8090/api/v1/media/view/'
    const loadingStorage = localStorage.getItem('loading');
    const datagridSx = {
        "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "rgb(128, 212, 255)",
            fontSize: 16
        }
    }
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

    const columns = [
        {
            field: "id",
            headerName: "id",
            hide: true,
        },
        {
            field: "name",
            headerName: "Tên đơn vị",
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
            field: "description",
            headerName: "Mô tả",
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
    ];
 
    const fetchData = async () => {
        try {
            const params = { page: 1, size: 1030 }
            const res = await adminApi.getListUnitsCQNN(params)
            console.log('Fetch products successfully: ', res);
            if (res != null) {
                setUser(res.data.result.data);
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
            name: item.name,
            description: item.description,
            address: item.address,
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


