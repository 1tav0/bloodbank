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
    "#CE5959", "#1A5F7A", "#88621B", "#245953", "#2C3333", "#804674", "#A84448", "#635985"
  ]
  return (
    <div>
      <span className="text-primary text-2xl">
        Welcome {getLoggedInUserName(currentUser)}
      </span>
      <div className="grid grid-cols-4 gap-5 mt-5">
        {
          bloodGroupData.map((bloodGroup, index) => {
            const color = colors[index];
            return (
              <div
                className={`p-5 flex justify-between text-white rounded items-center`}
                style={
                  {backgroundColor: color}
                }
              >
                <h1 className='text-4xl uppercase'>{bloodGroup.bloodGroup}</h1>
                <div className='flex flex-col justify-between gap-2'>
                  <div className="flex justify-between gap-5">
                    <span>Total In: </span>
                    <span>{bloodGroup.totalIn} ML</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Total Out: </span>
                    <span>{bloodGroup.totalOut} ML </span>
                  </div>

                  <div className="flex justify-between">
                    <span>Available: </span>
                    <span>{bloodGroup.available} ML</span>
                  </div>
                </div>

              </div>
            )
            
          })
        }
      </div>
    </div>
  )
}

export default Home