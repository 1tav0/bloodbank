import React, { useState } from 'react'
import { Button, Form, Input, Radio } from 'antd'
import { Link } from 'react-router-dom'
import OrgHospitalForm from './OrgHospitalForm';

const Register = () => {
  const [type, setType] = useState("1tav0");

  return (
    <div className='flex h-screen items-center justify-center bg-primary'>
       <Form
            layout='vertical'
            className="bg-white rounded shadow grid grid-cols-2 p-5 gap-5 w-1/2"
        >
            <h1 className="col-span-2 uppercase text-2xl">
                  <span className="text-primary">
                    {type.toUpperCase()} - REGISTRATION
                  </span>
                  <hr />
            </h1>
            
            <Radio.Group onChange={(e) => setType(e.target.value)} 
              value={type}
              className='col-span-2'
            >
              <Radio value="1tav0">1tav0</Radio>
              <Radio value="hospital">Hospital</Radio>
              <Radio value="organization">Organization</Radio>
            </Radio.Group>
            
            {
              type === "1tav0" 
              && 
              (
                <>
                  <Form.Item label="Name">
                    <Input />
                  </Form.Item>
                  <Form.Item label="Email">
                      <Input />
                  </Form.Item>
                  <Form.Item label="Phone">
                    <Input />
                  </Form.Item>
                  <Form.Item label="Password">
                      <Input />
                  </Form.Item>
                </>
              ) 
            }
            {
              type !== "1tav0"
              &&
              (
                <OrgHospitalForm type={type} />
              )
            }
            <Button type='primary' block className='col-span-2'>
                Register
            </Button>
            
            <Link to='/login' className='col-span-2 text-center'>
                Already Have an account? Login
            </Link>
       </Form>
    </div>
  )
}

export default Register