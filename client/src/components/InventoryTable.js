import React, { useEffect, useState } from 'react'
import { GetInventoryWithFilters } from '../apicalls/inventory'
import { useDispatch } from 'react-redux'
import { getDateFormat } from '../utils/helper'
import { SetLoading } from '../redux/loadersSlice'
import { Table, message } from 'antd'

const InventoryTable = ({filters, userType, limit}) => {
  const [data, setData] = useState([])
  const dispatch = useDispatch()
  const columns = [
    {
      title: "Inventory Type",
      dataIndex: "inventoryType",
      render: (text) => text.toUpperCase()
    },
    {
      title: "Blood Group",
      dataIndex: "bloodGroup",
      render: (text) => text.toUpperCase()
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      render: (text) => text + " ML"
    },
    {
      title: "Reference",
      dataIndex: "reference",
      render: (text, record) => {
        if (userType === "organization") {
          return record.inventoryType === "in" ? record.donar?.name : record.hospital?.hospitalName
        } else {
          return record.organization.organizationName
        }
      }
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      render: (text) => getDateFormat(text)
    },
  ]

  //change columns for hospital & onar
  if (userType !== "organization") {
    //remove inventory type column
    columns.splice(0, 1);
    //chnage reference column to organization name
    columns[2].title = "Organization Name";
    //date column should be renamed to taken date
    columns[3].title = userType === "hospital" ? "Consumed On" : "Donated Date";
  }



  const getData = async () => {
    try {
      dispatch(SetLoading(true))
      const response = await GetInventoryWithFilters(filters, limit)
      dispatch(SetLoading(false))
      // console.log(response)
      if (response.success) {
        setData(response.data)
      } else {
        throw new Error(response.message)
      }
    } catch (error) {
      message.error(error.message)
      dispatch(SetLoading(false))
    }
  }

  useEffect(() => {
    getData()
  },[])

  return (
    <div>
        <Table columns={columns} dataSource={data} className='mt-3'/>
    </div>
  )
}

export default InventoryTable