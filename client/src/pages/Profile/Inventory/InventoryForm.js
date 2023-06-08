import { Form, Input, Modal, Radio, message } from 'antd'
import React, { useState } from 'react'
import { getAndtdInputValidation } from '../../../utils/helper'
import { useDispatch } from 'react-redux'
import { AddInventory } from '../../../apicalls/inventory'
import { SetLoading } from '../../../redux/loadersSlice'

const InventoryForm = ({ open, setOpen, reloadData }) => {
    const [invetoryType, setInventoryType] = useState("in")
    const [form] = Form.useForm() // this is for the submit and since we get it when we click the modal is in the form so we attach it there 
    const dispatch = useDispatch()

    const onFinish = async (values) => {
        // console.log(values)
        try {
            dispatch(SetLoading(true))
            const response = await AddInventory({
                ...values,
                invetoryType
            })
            dispatch(SetLoading(false))
            if (response.success) {
                message.success("Inventory Added Successfully")
                setOpen(false)
            } else {
                throw new Error(response.message)
            }
        } catch (error) {
            message.error(error.message)
            dispatch(SetLoading(false))
        }
    }
    return (
    <Modal
        title="ADD INVENTORY"
        open={open}
        onCancel={()=> setOpen(false)}
        centered
          onOk={() => { //we attach the variable we define to the form inside the modal and here we give the logic 
            form.submit()
        }}
    > 
        <Form
            layout="vertical"
            className='flex flex-col gap-5'
            form={form}
            onFinish={onFinish}
        >
            <Form.Item label="Inventory Type">
                <Radio.Group
                    value={invetoryType}
                    onChange={(e) => setInventoryType(e.target.value)}
                >
                    <Radio value="in">In</Radio>    
                    <Radio value="out">Out</Radio>   
                </Radio.Group>
            </Form.Item>
            <Form.Item label="Blood Group" name="bloodGroup" rules={getAndtdInputValidation()}>
                <select name="" id="">
                    <option value="a+">A+</option>
                    <option value="a-">A-</option>
                    <option value="b+">B+</option>
                    <option value="b-">B-</option>
                    <option value="ab+">AB+</option>
                    <option value="ab-">AB-</option>
                    <option value="o+">O+</option>
                    <option value="o-">O-</option>
                </select> 
            </Form.Item>  
            <Form.Item
                label={invetoryType === "out" ? "Hospital Email" : "Donar Email"}
                name="email"
                rules={getAndtdInputValidation()}
            >
                <Input type="email"/>
            </Form.Item>  
            <Form.Item label="Quantity (ML)" name="quantity" rules={getAndtdInputValidation()}>
                <Input type="number"/>   
            </Form.Item>
        </Form>    
    </Modal>
  )
}

export default InventoryForm