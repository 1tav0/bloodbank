import { Form, Input } from 'antd'
import React from 'react'
import { getAndtdInputValidation } from '../../utils/helper'

const OrgHospitalForm = ({type}) => (
    <>
        <Form.Item
            label={type === "hospital" ? "Hospital Name" : "Organization Name"}
            name={type==="hospital" ? "hospitalName" : "organizationName"}
            rules = {getAndtdInputValidation()}
        >
            <Input />
        </Form.Item>
        <Form.Item name="owner" label="Owner" rules = {getAndtdInputValidation()}>
            <Input />
        </Form.Item>
        <Form.Item name="email" label="Email" rules = {getAndtdInputValidation()}>
            <Input />
        </Form.Item>
        <Form.Item name="phone" label="Phone" rules = {getAndtdInputValidation()} >
            <Input />
        </Form.Item>
        <Form.Item name="website" label="Website" rules = {getAndtdInputValidation()}>
            <Input />
        </Form.Item>
        <Form.Item name="password" label="Password" rules = {getAndtdInputValidation()}>
            <Input type="password" />
        </Form.Item>
        <Form.Item name="address" label="Address" className='col-span-2' rules = {getAndtdInputValidation()}>
            <Input />
        </Form.Item>
    </>
)

export default OrgHospitalForm