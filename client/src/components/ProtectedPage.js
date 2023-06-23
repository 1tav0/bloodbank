import { message } from 'antd'
import React, { useEffect } from 'react'
import { GetCurrentUser } from '../apicalls/users'
import { useNavigate } from 'react-router-dom'
import { getLoggedInUserName } from '../utils/helper'
import { useDispatch, useSelector } from 'react-redux'
import { SetCurrentUser } from '../redux/userSlice'
import { SetLoading } from '../redux/loadersSlice'
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import LogoutIcon from '@mui/icons-material/Logout';
import { Button } from '@mui/material';
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
            dispatch(SetLoading(true)) //to show the loading bar when we refresh the page
            const response = await GetCurrentUser()
            dispatch(SetLoading(false))
            if (response.success) {
                message.success(response.message);
                // setCurrentUser(response.data) used before redux
                dispatch(SetCurrentUser(response.data))
            } else {
                throw new Error(response.message)
            }
        } catch (error) {
            dispatch(SetLoading(false))
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
            {/* header */}
            <div className='flex justify-between items-center bg-primary text-white px-5 py-3'>
                  <div onClick={() => navigate("/")} className='cursor-pointer'>
                    <h1 className="text-2xl">
                        BLOODBANK HOSPITAL
                    </h1>
                    <span className='text-xs'>
                        {currentUser.userType.toUpperCase()}
                    </span>
                </div>
                  <div className='flex items-center gap-1'>
                    <AdminPanelSettingsIcon />
                    <div className='flex flex-col'>
                        <span className='mr-5 text-md cursor-pointer' 
                            onClick = { () => navigate('/profile')}
                        >
                              {getLoggedInUserName(currentUser).toUpperCase()}
                        </span>
                    </div>
                      <LogoutIcon className='ml-5 cursor-pointer'
                          onClick={() => {
                            localStorage.removeItem("token");
                            navigate('/login')
                          }}
                      />
                </div>
            </div>
            {/* body */}
            <div className='px-5 py-2'>{children}</div>
        </div>
      )
  )
}

export default ProtectedPage