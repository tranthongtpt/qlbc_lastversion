import React, { useState, useEffect } from "react";

import { useStateContext } from "../contexts/ContextProvider";
import { Header, Navbar, Sidebar } from "../components";
import TableListUnits from "../components/table/tablelistunits";
import adminApi from '../api/adminApi'
import ListUnitss from "../components/table/ListUnitsCqnn";
// ---------------------
import axios from 'axios';
import Swal from 'sweetalert2'
import { Button, Select, FormControl, InputLabel, TextField, MenuItem, Grid, Typography } from "@mui/material";
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import { MdLibraryAdd } from "react-icons/md"
import { DropDownTreeComponent } from '@syncfusion/ej2-react-dropdowns';
import withReactContent from 'sweetalert2-react-content'
import IconButton from '@mui/material/IconButton';
import { AiFillCloseCircle } from "react-icons/ai";
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import MuiDialogTitle from "@material-ui/core/DialogTitle";
// ---------------------
import { styled } from '@mui/material/styles';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';


const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));
const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, .05)'
      : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

const ListUnits = () => {
  const { activeMenu } = useStateContext();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [inputValues, setInputValues] = useState({});
  const MySwal = withReactContent(Swal)
  const [selectedImage, setSelectedImage] = useState(null);
  const [provinces, setProvinces] = useState([]);
  const [expanded, setExpanded] = useState('panel1');

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  const useStyles = styled((theme) => ({
    formControl: { margin: "10px 0", display: "block" },
    closeButton: {
      position: "absolute",
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500]
    }
  }));

  const classes = useStyles();

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleOnChange = (e) => {
    setInputValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // ----- dropdown treee
  var ddTree;
  const fields = { dataSource: provinces, value: 'id', text: 'name', parentValue: 'parentId', child: 'children', hierarchy: 'hierarchyLevel' };
  const handleOnChangeDropdownTree = () => {
    setInputValues((prev) => ({ ...prev, provinceId: ddTree.value && ddTree.value.length > 0 ? ddTree.value[0] : "" }))
  }

  const onSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    setLoading(true)
    const data = { ...inputValues }
    console.log(data);
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
      url: 'http://10.220.5.65:8090/api/v1/admin/register-institute',
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
      const ress = await adminApi.getInf();
      console.log('Fetch products successfully: ', res);
      const provincesaaa = ress.data?.result?.province.map((item, index) => {
        return (
          item
        )
      })

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
  return (
    <div className="flex relative ">
      {activeMenu ? (
        <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg ">
          <Sidebar />
        </div>
      ) : (
        <div className="w-0 dark:bg-secondary-dark-bg">
          <Sidebar />
        </div>
      )}
      <div
        className={
          activeMenu
            ? "  bg-[#e3f2fd] min-h-screen md:ml-72 w-full  "
            : "bg-[#e3f2fd]  w-full min-h-screen flex-2 "
        }
      >
        <div className="fixed md:static bg-white  navbar w-full ">
          <Navbar />
        </div>

        <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
          <Grid style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
            <Header title="Danh sách các đơn vị" />
            <Button color="primary" variant="outlined" onClick={handleClickOpen} startIcon={<MdLibraryAdd />}>
              Thêm tài khoản
            </Button>
          </Grid>
          <Dialog
            disableBackdropClick
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
                  className={classes.closeButton}
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
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">Đơn vị</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        name="typeInstituteId"
                        onChange={handleOnChange}
                        label="Đơn vị"
                        defaultValue={1}
                      >
                        <MenuItem value={1}>Đơn vị báo chí</MenuItem>
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
                  {inputValues.typeInstituteId === 1 ? (<>
                    <Grid item >
                      <TextField
                        type="text"
                        margin="normal"
                        name='maED'
                        label="Mã ED"
                        fullWidth
                        disabled
                        InputLabelProps={{
                          shrink: true,
                        }}
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
                        disabled
                        InputLabelProps={{
                          shrink: true,
                        }}
                        onChange={handleOnChange}
                      />
                    </Grid></>) : <><Grid item >
                      <TextField
                        type="text"
                        margin="normal"
                        name='maED'
                        label="Mã ED"
                        fullWidth
                        InputLabelProps={{
                          shrink: true,
                        }}
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
                        InputLabelProps={{
                          shrink: true,
                        }}
                        onChange={handleOnChange}
                      />
                    </Grid></>}

                  <Grid item>
                    <TextField
                      type="text"
                      margin="normal"
                      name='name'
                      fullWidth
                      label="Nhập tên"
                      InputLabelProps={{
                        shrink: true,
                      }}
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
                      InputLabelProps={{
                        shrink: true,
                      }}
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
                      InputLabelProps={{
                        shrink: true,
                      }}
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
                          setSelectedImage(e.target.files[0])
                        }
                        }
                      />
                    </FormControl>
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  variant="contained"
                  className="w-64"
                  fullWidth
                  loading={loading}
                  onClick={loading ? "Loading..." : "Đăng ký"}
                  sx={{
                    mt: 3,
                    backgroundColor: '#6738b3',
                    '&:hover': {
                      backgroundColor: '#6738b3',
                    },
                  }}
                >
                  Đăng ký
                </Button>
              </form>
            </DialogContent>
          </Dialog>
          <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
            <AccordionSummary
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Danh sách đơn vị báo chí</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <TableListUnits />
            </AccordionDetails>
          </Accordion>
          <Accordion  expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
            <AccordionSummary
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography>Danh sách đơn vị cơ quan nhà nước</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <ListUnitss />
            </AccordionDetails>
          </Accordion>
        </div>

      </div>
    </div>
  );
};
export default ListUnits;
