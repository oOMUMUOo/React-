import React, { useEffect, useState } from 'react'
import { Table, Button, Tag, Modal, Tree, message  } from 'antd'
import axios from 'axios';
import { DeleteOutlined, UnorderedListOutlined } from '@ant-design/icons'

export default function RightManageRole() {
  const [dataSource, setDataSource] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [treeData, setTreeData] = useState([])
  const [defaultCheck, setDefaultCheck] = useState([])
  const [checkId, setCheckId] = useState(0)

  const colorList = {
    '超级管理员': "red",
    "区域管理员": "blue",
    "区域编辑": "pink"
  }

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      render: (id) => {
        return <span style={{fontWeight: 'bold'}}>{id}</span>
      }
    },
    {
      title: '角色名称',
      dataIndex: 'roleName',
      key: 'roleName',
      render: (roleName) => {
        return <Tag color={colorList[roleName]} style={{fontSize: '14px'}}>{roleName}</Tag>
      }
    },
    {
      title: '操作',
      render: (item) => {
        return <div>
          
          <Button danger shape='circle' icon={<DeleteOutlined />} onClick={() => handleDelete(item)}></Button>
          <Button type='primary' shape='circle' icon={<UnorderedListOutlined />} style={{ marginLeft: '10px' }} onClick={()=>{
            showModal(item)
          }}></Button>
          <Modal title="权限分配" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <Tree
              checkable
              checkedKeys={defaultCheck}
              onCheck={onCheck}
              checkStrictly={true}
              treeData={treeData}
            />
          </Modal>
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
          <span style={{ color: 'orange' }}>{item.roleName}</span>
          吗？
        </div>
      ),
      onOk() {
        setDataSource(dataSource.filter(ele => {
          return ele.id != item.id
        }))
        axios.delete(`/roles/${item.id}`).then(res => {
          if (res.status === 200) {
            message.success('删除成功!', 1)
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

  const showModal = (item) => {
    setIsModalOpen(true)
    setDefaultCheck(item.rights)
    setCheckId(item.id)
  }

  const handleOk = () => {
    setIsModalOpen(false)
    setDataSource(dataSource.map(item => {
      if(item.id === checkId) {
        return {
          ...item,
          rights: defaultCheck,
        }
      }
      return item
    }))
    axios.patch(`/roles/${checkId}`, {
      rights: defaultCheck
    }).then(res => {
      if(res.status === 200) {
        message.success('修改成功！')
      } else {
        message.error("修改失败！")
      }
    })
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  const onCheck = (checkedKeys) => {
    setDefaultCheck(checkedKeys.checked)
  }

  useEffect(() => {
    axios.get('/roles').then(res => {
      setDataSource(res.data)
    })

    axios.get('/rights?_embed=children').then(res => {
      setTreeData(res.data)
    })
  }, [])

  return (
    <div>
      <Table dataSource={dataSource} columns={columns} rowKey="id" />;
    </div>
  )
}
