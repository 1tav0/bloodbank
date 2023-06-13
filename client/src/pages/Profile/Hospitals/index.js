import { Table, message } from 'antd';
import React, { useEffect, useState } from 'react'
import { SetLoading } from '../../../redux/loadersSlice';
import { useDispatch } from 'react-redux';
import { GetAllHospitalsOfAnOrganization } from '../../../apicalls/users';
import { getDateFormat } from '../../../utils/helper';

const Hospitals = () => {
    const dispatch = useDispatch();
    const [data, setData] = useState([]);
    
    const getData = async () => {
        try {
            dispatch(SetLoading(true));
            const response = await GetAllHospitalsOfAnOrganization();
            dispatch(SetLoading(false));
            if (response.success) {
                setData(response.data);
            } else {
                throw new Error(response.message);
            }
        } catch (error) {
            message.error(error.message);
            dispatch(SetLoading(false));
        }
    }

    const columns = [
        {
            title: "Hospital Name",
            dataIndex: "hospitalName"
        },
        {
            title: "Email",
            dataIndex: "email"
        },
        {
            title: "Phone",
            dataIndex: "phone"
        },
        {
            title: "Address",
            dataIndex: "address"

        },
        {
            title: "Created At",
            dataIndex: "createdAt",
            render: (text) => getDateFormat(text)

        }
    ]

    useEffect(() => {
        getData();
    }, [])

  return (
    <div>
          <Table columns={columns} dataSource={data} />
    </div>
  )
}

export default Hospitals