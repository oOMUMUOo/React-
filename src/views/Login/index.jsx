import React from 'react'
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, message } from 'antd';
import Confetti from 'react-confetti'

import './index.css'
import axios from 'axios';


export default function Login(props) {
  const onFinish = (value) => {
    console.log(value)
    console.log(props)
    axios.get(`/users?username=${value.username}&password=${value.password}&roleState=true&_expand=role`).then(res => {
      console.log(res.data)
      if (res.data.length === 0) {
        message.error('账号或密码错误！')
      } else {
        message.success('登录成功!')
        localStorage.setItem('username', JSON.stringify(res.data[0]))
        props.history.replace('/home')
      }
    })

  }

  return (
    <div style={{ backgroundColor: 'rgb(35, 39, 65)', height: '100vh', position: 'relative' }}>
      <Confetti
      />
      <div className='login-box'>
        <div className='login-title'>全球新闻发布管理系统</div>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: 'Please input your Username!',
              },
            ]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
          </Form.Item>
          <Form.Item
            name="password"
            className='height40'
            rules={[
              {
                required: true,
                message: 'Please input your Password!',
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon h100" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>


          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Log in
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
