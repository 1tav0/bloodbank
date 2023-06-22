import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GetAllBloodGroupsInInventory } from '../../apicalls/dashboard';
import { message } from 'antd'
import { SetLoading } from '../../redux/loadersSlice';
import { getLoggedInUserName } from '../../utils/helper';

const Home = () => {
  const { currentUser } = useSelector((state) => state.users)
  const [bloodGroupData = [], setBloodGroupData] = useState([]);
  const dispatch = useDispatch();


  const getData = async () => {
    try {
      dispatch(SetLoading(true))
      const response = await GetAllBloodGroupsInInventory();
      dispatch(SetLoading(false))
      if (response.success) {
        setBloodGroupData(response.data);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      message.error(error.message);
      dispatch(SetLoading(false))
    }
  }

  useEffect(() => {
    getData()
  }, [])

  const colors = [
    "#CE5959", "#1A5F7A", "#88621B", "#245953", "#2C3333", "#4E6E81", "#A84448", "#245953"
  ]
  return (
    <div>
      <span className="text-primary text-2xl">
        Welcome {getLoggedInUserName(currentUser)}
      </span>
      <div className="grid grid-cols-4">
        {
          bloodGroupData.map((bloodGroup, index) => {
            return (
              <div
                className={`bg-[${colors[index]}] p-5 flex justify-between text-white rounded-md`}
              >
              
              </div>
            )
            
          })
        }
      </div>
    </div>
  )
}

export default Home