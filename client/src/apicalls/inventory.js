import { axiosInstance } from ".";

export const AddInventory = (data) => {
    return axiosInstance("post", "/api/inventory/add", data)
}

export const GetInventory = () => {
    return axiosInstance("get", "api/inventory/get")
}