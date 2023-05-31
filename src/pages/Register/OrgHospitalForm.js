import { Form, Input } from 'antd'
import React from 'react'

const OrgHospitalForm = ({type}) => (
    <>
        <Form.Item
            label={type === "hospital" ? "Hospital Name" : "Organization Name"}
            name={type==="hospital" ? "hospitalName" : "organizationName"}
        >
            <Input />
        </Form.Item>
        <Form.Item name="1tav0" label="1tav0">
            <Input />
        </Form.Item>
        <Form.Item name="email" label="Email">
            <Input />
        </Form.Item>
        <Form.Item name="phone" label="Phone">
            <Input />
        </Form.Item>
        <Form.Item name="website" label="Website">
            <Input />
        </Form.Item>
        <Form.Item name="password" label="Password">
            <Input />
        </Form.Item>
    </>
)

export default OrgHospitalForm