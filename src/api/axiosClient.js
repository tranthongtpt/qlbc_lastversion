import axios from 'axios';
// import queryString from 'query-string';
import { stringify } from "qs";
import { getToken } from '../Utils/Common';

const axiosClient = axios.create({
    baseURL: "http://10.220.5.65:8090/api/v1",
    headers: {
        'Authorization': `Bearer ${getToken()}`,
        'content-type': 'application/json',
    },
    // paramsSerializer: (params) => qs.stringify(params,{arrayFormat: 'brackets'}),
    paramsSerializer: { serialize: stringify},
},);

// Thêm một bộ đón chặn request
axiosClient.interceptors.request.use(function (config) {
    // Làm gì đó trước khi request dược gửi đi
 
    return config;
  }, function (error) {
    // Làm gì đó với lỗi request
    return Promise.reject(error);
  });

// Thêm một bộ đón chặn response
axiosClient.interceptors.response.use(function (response) {
    // Bất kì mã trạng thái nào nằm trong tầm 2xx đều khiến hàm này được trigger
    // Làm gì đó với dữ liệu response
    
      return response;
  }, function (error) {
    // Bất kì mã trạng thái nào lọt ra ngoài tầm 2xx đều khiến hàm này được trigger\
    // Làm gì đó với lỗi response
    return Promise.reject(error);
  });

export default axiosClient;