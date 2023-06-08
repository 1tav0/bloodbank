import { Modal } from 'antd'
import React from 'react'

const InventoryForm = ({ open, setOpen, reloadData }) => {
  return (
    <Modal
        title="Add Invetory"
        open={open}
        onCancel={()=> setOpen(false)}
        centered
    >     
    </Modal>
  )
}

export default InventoryForm