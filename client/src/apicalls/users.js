import { axiosInstance } from ".";

export const LoginUser = async (payload) => {
    const response = await axiosInstance("post", "/api/users/login", payload);
    return response
}

export const RegisterUser = async (payload) => {
    const response = await axiosInstance("post", "/api/users/register", payload)
    return response
}

export const GetCurrentUser = async (payload) => {
    const response = await axiosInstance("get", "api/users/get-current-user")
    return response
}