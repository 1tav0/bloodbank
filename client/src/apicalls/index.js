import axios from 'axios'

export const axiosInstance = async (method, endpoint, payload) => {
    try {
        const response = await axios({
            method,
            url: endpoint,
            data: payload,
            headers: { //we need this whenever we make api calls outside rigister and login we must pass the token aka data we have or the logged in user in the local storage
                //we will validate the token in the backend and we will send the response to the front end if the token is valid else invalid 
                 //whatever api calls we perform for the register and login pages we will need authorization key to access the token aka jwt token 
                 authorization: `Bearer ${localStorage.getItem("token")}`
            } 
        },
        )
        return response.data;
    } catch (error) {
        return error;
    }
}