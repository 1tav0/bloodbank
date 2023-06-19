import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { SetLoading } from '../../../redux/loadersSlice';
import { GetAllOrganizationsOfADonar, GetAllOrganizationsOfAHospital } from '../../../apicalls/users';
import { Modal, Table, message } from 'antd';
import { getDateFormat } from '../../../utils/helper';
import InventoryTable from '../../../components/InventoryTable';

const Organizations = ({userType}) => {
    const [data, setData] = useState([]);
    const dispatch = useDispatch();
    const [showHistoryModal, setShowHistoryModal] = useState(false);
    const [selectedOrganization, setSelectedOrganization] = useState(null);
    const { currentUser } = useSelector((state) => state.users)
    const getData = async () => {
        try {
            dispatch(SetLoading(true));
            let response = null;
            if (userType === "hospital") {
                response = await GetAllOrganizationsOfAHospital();
            } else {
                response = await GetAllOrganizationsOfADonar();
            }
            
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

        },
        {
            title: "Action",
            dataIndex: "action",
            render: (text, record) => (
                <span className="underline text-md cursor-pointer"
                    onClick={() => {
                        setSelectedOrganization(record);
                        setShowHistoryModal(true);
                    }}
                >
                    History
                </span>
            )
        }
    ]

    useEffect(() => {
        getData();
    }, [])
    
  return (
    <div>
        <Table columns={columns} dataSource={data} />
        
        {
            showHistoryModal && (
                <Modal 
                    title={
                        `${ userType === "donar"
                            ? "Donations History"
                            : "Consumptions History"
                          } In ${selectedOrganization.organizationName}`
                    }
                    centered
                    open = { showHistoryModal }
                    width = { 1000 }
                    onCancel={ () => setShowHistoryModal(false)}
                >
                    <InventoryTable
                        filters = {
                            {
                                organization: selectedOrganization._id,
                                [userType]: currentUser._id, //here userType can be donar or hospital
                            }
                        }
                    />
                </Modal>
            )
        }
    </div>
  )
}

export default Organizations