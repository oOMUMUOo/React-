import React, { useEffect, useState, useRef } from 'react'
import { Button, Tag, Table, Switch, Modal, Form, message, Select } from 'antd'
import axios from 'axios';
import { UnorderedListOutlined, DeleteOutlined } from '@ant-design/icons'
import UserForm from '../../components/UserForm';

export default function User() {

  const [dataSource, setDataSource] = useState([])
  const [addModal, setAddModal] = useState(false)
  const [regionList, setRegionList] = useState([])
  const [roleList, setRoleList] = useState([])
  const [updateModal, setUpdateModal] = useState(false)
  const [addForm] = Form.useForm();
  const [isDisabled, setIsDisabled] = useState(false)
  const [updateForm] = Form.useForm();
  const [currentItem, setCurrentItem] = useState(null)

  const colorList = {
    "超级管理员": "red",
    "区域管理员": "orange",
    "区域编辑": "blue",
  }

  const columns = [
    {
      title: '区域',
      dataIndex: 'region',
      filters: [
        ...regionList.map(item => ({
          text: item.title,
          value: item.value
        })),{
          text: "全球",
          value: "全球"
        }
      ],
      onFilter: (value, record) => {
        if(value === '全球') {
          return record.region === ''
        } else { 
          return record.region === value
        }
      },
      key: 'region',
      render: (region) => {
        return <span style={{ fontWeight: 'bold' }}>{region ? region : '全球'}</span>
      }
    },
    {
      title: '角色名称',
      dataIndex: 'role',
      key: 'role',
      render: (role) => {
        return <Tag color={colorList[role.roleName]} style={{ fontSize: '14px' }}>{role.roleName}</Tag>
      },
      filters: [
        ...roleList.map(item => ({
          text: item.roleName,
          value: item.roleName
        }))
      ],
      onFilter: (value, record) => {
          return record.role.roleName == value
      },
    },
    {
      title: '用户名',
      dataIndex: "username",
      key: "username"
    },
    {
      title: '用户状态',
      dataIndex: "roleState",
      key: "roleState",
      render: (roleState, item) => {
        return <Switch onChange={() => handleSwitchChange(item)} checked={roleState} disabled={item.default}></Switch>
      }
    },
    {
      title: '操作',
      render: (item) => {
        return <div>
          <Button danger shape='circle' icon={<DeleteOutlined />} onClick={() => handleDelete(item)} disabled={item.default}></Button>
          <Button onClick={() => handleUpdate(item)} type='primary' shape='circle' icon={<UnorderedListOutlined />} style={{ marginLeft: '10px' }} disabled={item.default}></Button>
        </div>
      }
    },
  ];

  const handleDelete = (item) => {
    Modal.confirm({
      title: '删除',
      content: (
        <div>
          确定删除
          <span style={{ color: 'orange' }}>{item.username}</span>
          吗？
        </div>
      ),
      onOk() {
        setDataSource(dataSource.filter(ele => {
          return ele.id != item.id
        }))
        axios.delete(`/users/${item.id}`).then(res => {
          if (res.status === 200) {
            message.success('删除成功!')
          }
        })
      },
      footer: (_, { OkBtn, CancelBtn }) => (
        <>
          <CancelBtn />
          <OkBtn />
        </>
      ),
    })
  }

  const CollectionCreateForm = ({ open, onCreate, onCancel }) => {

    return (
      <div>
        <Modal
          open={addModal}
          title="Create a new collection"
          okText="Create"
          cancelText="Cancel"
          onCancel={onCancel}
          onOk={() => {
            addForm.validateFields().then(res => {
              axios.post('/users', {
                ...res,
                "roleState": true,
                "default": false,
              }).then(response => {
                if (response.status === 201) {
                  setAddModal(false)
                  message.success('增加成功！')
                  setDataSource([...dataSource, {
                    ...response,
                    role: roleList.filter(item => item.id === res.roleId)[0]
                  }])
                }
              }).catch(err => {
                console.log(err)
              })
            })
          }}
        >
          <UserForm form={addForm} roleList={roleList} regionList={regionList}></UserForm>

        </Modal>

        <Modal
          open={updateModal}
          title="更新用户"
          okText="Update"
          cancelText="Cancel"
          onCancel={() => setUpdateModal(false)}
          onOk={() => {
            updateForm.validateFields().then(res => {
              setDataSource(dataSource.map(item => {
                if (item.id === currentItem.id) {
                  return {
                    ...item,
                    ...res,
                    role: roleList.filter(data => data.id === res.roleId)[0]
                  }
                } else {
                  return item
                }
              }))
              axios.patch(`/users/${currentItem.id}`, {
                ...res,
              }).then(response => {
                if (response.status === 200) {
                  setUpdateModal(false)
                  message.success('更新成功！')
                }
              }).catch(err => {
                console.log(err)
              })
            })
          }}
        >
          <UserForm isDisabled={isDisabled} form={updateForm} roleList={roleList} regionList={regionList}></UserForm>

        </Modal>

      </div>



    );
  };

  const onCreate = (values) => {
    setAddModal(false);
  };

  const showAddModal = () => {
    setAddModal(true)
  }

  const addModalCancel = () => {
    setAddModal(false)
  }

  const addModalOk = () => {
    setAddModal(false)
  }

  const regionChange = () => {

  }

  const roleChange = (val) => {
  }

  const handleSwitchChange = (item) => {
    item.roleState = !item.roleState
    setDataSource([...dataSource])
    axios.patch(`/users/${item.id}`, {
      roleState: item.roleState
    })
  }

  const handleUpdate = (item) => {
    console.log(item)
    setUpdateModal(true)
    setCurrentItem(item)
    if (item.roleId === 1) {
      setIsDisabled(true)
    } else {
      setIsDisabled(false)
    }
    updateForm.setFieldsValue(item)
  }

  useEffect(() => {
    axios.get('/users?_expand=role').then(res => {
      setDataSource(res.data)
    })

    axios.get('/regions').then((res) => {
      setRegionList(res.data)
    })

    axios.get('/roles').then((res) => {
      setRoleList(res.data)
    })
  }, [])

  return (
    <div>
      <Button type='primary' style={{ marginBottom: '10px' }} onClick={showAddModal}>添加用户</Button>
      <CollectionCreateForm
        open={addModal}
        onCreate={onCreate}
        onCancel={() => {
          setAddModal(false);
        }}
      />
      <Table dataSource={dataSource} columns={columns} rowKey={(item) => item.id} pagination={
        {
          defaultPageSize: 5,
          position: ['bottomRight']
        }
      } />;
    </div>
  )
}
