import { Tabs } from 'antd'
import React from 'react'
import { useSelector } from 'react-redux'
import Inventory from './Inventory'
import Donars from './Donars'
import Hospitals from './Hospitals'

const Profile = () => {
    const { currentUser } = useSelector((state) => state.users)
  return (
    <div>
        <Tabs>
            {
                currentUser.userType ==="organization" && 
                    <>
                    <Tabs.TabPane tab="Inventory" key="1">
                        <Inventory />
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="Donars" key="2">
                        <Donars />
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="Hospitals" key="3">
                        <Hospitals />
                    </Tabs.TabPane>
                    </>
            }
        </Tabs>
    </div>
  )
}

export default Profile