import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { SetLoading } from '../../../redux/loadersSlice';
import { GetAllDonarsOfAnOrganization } from '../../../apicalls/users';
import { Table, message } from 'antd';
import { getDateFormat } from '../../../utils/helper';

const Organizations = () => {
    const [data, setData] = useState([]);
    const dispatch = useDispatch();

    const getData = async () => {
        try {
            dispatch(SetLoading(true));
            const response = await GetAllDonarsOfAnOrganization();
            dispatch(SetLoading(false));
            if (response.success) {
                setData(response.data);
            } else {
                throw new Error(response.message);
            }
        } catch (error) {
            message.error(error.message);
            dispatch(SetLoading(false))
        }
    }

    const columns = [
        {
            title: "Name",
            dataIndex: "organizationName"
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

export default Organizations