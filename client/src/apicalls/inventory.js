import { axiosInstance } from ".";

export const AddInventory = (data) => {
    return axiosInstance("post", "/api/inventory/add", data)
}