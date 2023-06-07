import { message } from 'antd'
import React, { useEffect, useState } from 'react'
import { GetCurrentUser } from '../apicalls/users'
import { useNavigate } from 'react-router-dom'
import { getLoggedInUser } from '../utils/helper'
import { useDispatch, useSelector } from 'react-redux'
import { SetCurrentUser } from '../redux/userSlice'
//only logged in user can see this information
//login and register are public so they dont need to be protected page
//children are the pages
const ProtectedPage = ({ children }) => {
    // const [currentUser, setCurrentUser] = useState(null); used before redux
    const navigate = useNavigate()
    const dispatch = useDispatch() //for redux to set the setters aka functions in the store
    const { currentUser } = useSelector((state) => state.users)// to access the props in the store
    const getCurrentUser = async () => { //get user information
        try {
            const response = await GetCurrentUser()
            if (response.success) {
                message.success(response.message);
                // setCurrentUser(response.data) used before redux
                dispatch(SetCurrentUser(response.data))
            } else {
                throw new Error(response.message)
            }
        } catch (error) {
            message.error(error.message)
        }
    }
    //to show every time we render the page 
    useEffect(() => {
        if (localStorage.getItem("token")) {
            getCurrentUser();
        } else {
            navigate("/login") //this will render the login page if no token in local storage aka no user is signed in 
        }
    },[])
  return (
      currentUser && (
        <div>
            <h1>Welcome {getLoggedInUser(currentUser)}</h1>
            {children}
        </div>
      )
  )
}

export default ProtectedPage