import moment from "moment"

export const getLoggedInUserName = (user) => {
    if (user.userType === "donar") {
        return user.name;
    } else if (user.userType === "hospital") {
        return user.hospitalName;
    } else if (user.userType === "organization") {
        return user.organizationName;
    }
}
//for validation when we load up we need email and password required to login else display required until they type and if wrong then display the errors
export const getAndtdInputValidation = () => {
    return [{
        required: true,
        message: "Required"
    }]
}

//to show the date in the profile page date column
export const getDateFormat = (date) => {
    return moment(date).format("DD MMM YYYY hh:mm A")
}