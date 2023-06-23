import { axiosInstance } from ".";

export const AddInventory = (data) => {
    return axiosInstance("post", "/api/inventory/add", data)
}

export const GetInventory = () => {
    return axiosInstance("get", "/api/inventory/get")
}

export const GetInventoryWithFilters = (filters, limit) => {
    // console.log(data)
    return axiosInstance("post", "/api/inventory/filter", {filters, limit});
}