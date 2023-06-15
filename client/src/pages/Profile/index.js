import { Tabs } from 'antd'
import React from 'react'
import { useSelector } from 'react-redux'
import Inventory from './Inventory'
import Donars from './Donars'
import Hospitals from './Hospitals'
import Organizations from './Organizations'

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
            {
                currentUser.userType === "donar" && (
                  <>
                    <Tabs.TabPane tab="Donations" key="1">
                        
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="Organizations" key="2">
                        <Organizations />
                    </Tabs.TabPane>
                  </>
            )}
            {
                currentUser.userType === "donar" && (
                  <>
                    <Tabs.TabPane tab="Consumption" key="1">
                        
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="Organizations" key="2">
                        <Organizations userType="hospital"/>
                    </Tabs.TabPane>
                  </>
            )}
        </Tabs>
    </div>
  )
}

export default Profile