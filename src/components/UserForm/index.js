import React, { useState, useEffect } from 'react'
import { Form, Input, Select } from 'antd'

const UserForm = (props => {
    const [isDisabled, setIsDisabled] = useState(false)


    useEffect(()=> {
        setIsDisabled(props.isDisabled)
    },[props.isDisabled])
    return (
        <div>
            <Form
                form={props.form}  // 将 ref 参数传递给 Form 组件
                layout="vertical"
                name="form_in_modal"
                initialValues={{
                    modifier: 'public',
                }}
            >
                <Form.Item
                    name="username"
                    label="用户名"
                    validateTrigger="onBlur"
                    rules={[
                        {
                            required: true,
                            message: '请输入用户名!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="password"
                    label="密码"
                    validateTrigger="onBlur"
                    rules={[
                        {
                            required: true,
                            message: '请输入密码!',
                        },
                    ]}>
                    <Input type="password" />
                </Form.Item>

                <Form.Item
                    name="region"
                    label="区域"
                    validateTrigger="onBlur"
                    rules={isDisabled ? [] : [
                        {
                            required: true,
                            message: '请输入区域!',
                        },
                    ]}>
                    <Select
                        disabled={isDisabled}
                        style={{
                            width: '100%',
                        }}
                        options={props.regionList}
                    />
                </Form.Item>

                <Form.Item
                    name="roleId"
                    label="角色"
                    validateTrigger="onBlur"
                    rules={[
                        {
                            required: true,
                            message: '请输入区域!',
                        },
                    ]}>
                    <Select
                        style={{
                            width: '100%',
                        }}
                        onChange={(value) => {
                            if(value === 1) {
                                setIsDisabled(true)
                                props.form.setFieldsValue({
                                    region: ''
                                })
                            } else {
                                setIsDisabled(false)
                            }
                        }}
                        options={props.roleList}
                        fieldNames={{ label: "roleName", value: 'id' }}
                    />
                </Form.Item>

            </Form>
        </div>
    )
})
export default UserForm