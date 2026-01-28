import { axiosInstance, getAxiosInstance, getAxiosInstanceFormData } from "@/config/axios";
import { AUTH_URLS } from "@/constants/apiUrls";

export const loginService = async (payload: any) => {
 return  await axiosInstance.post(`/api/auth/login`, {
    email: payload.email,
    password: payload.password,
  });
};
export const forgotPasswordService = async (payload: any) =>
  await axiosInstance.post(`${AUTH_URLS.FORGET_PASSWORD}`, payload);
export const sendOtpService = async (payload: any) =>
  await axiosInstance.post(`${AUTH_URLS.VERIFY_OTP}`, payload);
export const resetPassword = async (payload: any) =>
  await axiosInstance.post(`${AUTH_URLS.RESET_PASSWORD}`, payload);
export const logOutService = async (route: string) => {
  const axiosInstance = await getAxiosInstance();
  return axiosInstance.post(route);
};


export const getDahboardData = async (route: string) => {
    const axiosInstance = await getAxiosInstance()
    return axiosInstance.get(route);
}
export const getData = async (route: string) => {
    const axiosInstance = await getAxiosInstance()
    return axiosInstance.get(route);
}
export const putData = async (route: string) => {
    const axiosInstance = await getAxiosInstance()
    return axiosInstance.put(route);
}
export const patchData = async (route: string,payload:any) => {
    const axiosInstance = await getAxiosInstance()
    return axiosInstance.patch(route,payload);
}
export const deleteData = async (route: string) => {
    const axiosInstance = await getAxiosInstance()
    return axiosInstance.delete(route);
}
export const postData = async (route: string,payload:any) => {
    const axiosInstance = await getAxiosInstance()
    return axiosInstance.post(route,payload);
}

export const updateAdminDetails = async (route: string, payload:any) =>{
  const axiosInstance = await getAxiosInstance()
  return axiosInstance.patch(route, payload);
}
