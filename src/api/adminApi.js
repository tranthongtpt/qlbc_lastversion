import axiosClient from "./axiosClient";
const userApi = {
    getListReporter: async (params) =>{
        const url = `/admin/manager-user?page=${params?.page}&size=${params?.size}`;
        return await axiosClient.post(url,{params})
    },
    getUser: async (params) =>{
        const url = '/user/data-spokesman';
        return await axiosClient.get(url,{params})
    },
    getInf: async () =>{
        const url = '/user/infomation';
        return await axiosClient.get(url)
    },
    postInf: async () =>{
        const url = '/admin/register-institute';
        return await axiosClient.get(url)
    },
    getJournaList: async (params) =>{
        const url = '/user/data-journalist';
        return await axiosClient.get(url,{params})
    },
    getListUnitsCQNN: async (params) =>{
        const url = `/admin/manager-institute?page=${params?.page}&size=${params?.size}`;
        return await axiosClient.post(url,{params})
    },
    getListUnitsNPN: async () =>{
        const url = '/pub/data-unit';
        return await axiosClient.get(url)
    },
    forgotpassword: async() =>{
        const url ='/user/forgot-password';
        return await axiosClient.get(url)
    },
    updateUser: async (params) =>{
        const url = '/admin/update-users'
        return await axiosClient.patch(url,{params})
    },
    getUsers: async (params) =>{
        const url = '/admin/info-user';
        return await axiosClient.get(url,{params})
    },
    deleteUser: async (params) =>{
        const url = '/admin/manager-user/'
        return await axiosClient.delete(url,{params})
    }, 
}

export default userApi;


