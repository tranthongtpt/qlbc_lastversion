import React, { useState, useEffect, forwardRef, useRef } from "react";
import MaterialTable from "material-table";

import AddBox from "@mui/icons-material/AddBox";
import ArrowDownward from "@mui/icons-material/ArrowDownward";
import Check from "@mui/icons-material/Check";
import ChevronLeft from "@mui/icons-material/ChevronLeft";
import ChevronRight from "@mui/icons-material/ChevronRight";
import Clear from "@mui/icons-material/Clear";
import DeleteOutline from "@mui/icons-material/DeleteOutline";
import Edit from "@mui/icons-material/Edit";
import FilterList from "@mui/icons-material/FilterList";
import FirstPage from "@mui/icons-material/FirstPage";
import LastPage from "@mui/icons-material/LastPage";
import Remove from "@mui/icons-material/Remove";
import SaveAlt from "@mui/icons-material/SaveAlt";
import Search from "@mui/icons-material/Search";
import ViewColumn from "@mui/icons-material/ViewColumn";
import Alert from '@mui/material/Alert';
import { RiEmotionSadLine } from "react-icons/ri"
import { Grid} from "@mui/material";

// ----------------------

import adminApi from '../../api/adminApi'

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

export default function ListUnitss(props) {
    const tableRef = useRef();
    const [users, setUsers] = useState([]);
    const [provinces, setProvinces] = useState([]);
    const fetchData = async () => {
        try {
            const res = await adminApi.getListUnitsNPN()
            const ress = await adminApi.getInf();
            console.log('Fetch products successfully: ', res);

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

            const provincesaaa = ress.data?.result?.province.map((item, index) => {
                return (
                    item
                )
            })
            setUsers(flatten(res?.data?.result));
            setProvinces(provincesaaa)

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
            console.log(data);
            data.users.showDetailPanel = tableRef.current.props.detailPanel;
            return data;
        });
    }, []);

    return (
        <>
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
                                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                                        <h1 style={{ fontSize: '1rem' }}>
                                            Xin lỗi! Không có trường này trong bảng
                                        </h1>  <RiEmotionSadLine style={{ fontSize: '2rem' }} />
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

