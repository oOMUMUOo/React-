import React, { useEffect, useState } from 'react'
import { Button, Table, Tag, Modal, message, Popover, Switch } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import axios from 'axios';





export default function RightManageRight() {
  const [data, setData] = useState([])

  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
      render: (id) => <span style={{ fontWeight: 'bold' }}>{id}</span>
    },
    {
      title: '权限名称',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: '权限路径',
      dataIndex: 'key',
      key: 'key',
      render: (key) => {
        return <Tag color='orange'>
          <span style={{ fontSize: "16px" }}>{key}</span>
        </Tag>
      }
    },
    {
      title: '操作',
      render: (item) => {
        return <div>
          <Button danger shape='circle' icon={<DeleteOutlined />} onClick={() => confirm(item)}></Button>
          <Popover content={<div style={{ textAlign: 'center' }}>
            <Switch checked={item.pagepermission} onChange={() => switchOnchange(item)} />
          </div>} title='配置项' trigger="click">
            <Button style={{ marginLeft: '10px' }} type='primary' shape='circle' icon={<EditOutlined />} disabled={item.pagepermission == undefined}></Button>
          </Popover>
        </div>
      }
    },
  ];

  const confirm = (item) => {
    Modal.confirm({
      title: '删除',
      content: (
        <div>
          确定删除
          <span style={{ color: 'orange' }}>{item.title}</span>
          吗？
        </div>
      ),
      onOk() {
        if (item.grade === 1) {
          setData(data.filter(ele => {
            return ele.id !== item.id
          }))
          axios.delete(`http://localhost:9000/rights/${item.id}`)
        } else if (item.grade === 2) {
          let list = data.filter(ele => ele.id === item.rightId)
          list[0].children = list[0].children.filter(data => data.id !== item.id)
          setData([...data])
          axios.delete(`http://localhost:9000/children/${item.id}`)
        }
      },
      footer: (_, { OkBtn, CancelBtn }) => (
        <>
          <CancelBtn />
          <OkBtn />
        </>
      ),
    })
  }

  const switchOnchange = (item) => {
    item.pagepermission = item.pagepermission === 1 ? 0: 1
    setData([...data])
    if(item.grade === 1) {
      axios.patch(`http://localhost:9000/rights/${item.id}`, {
        pagepermission: item.pagepermission
      })
    } else {
      axios.patch(`http://localhost:9000/children/${item.id}`, {
        pagepermission: item.pagepermission
      })
    }
  }

  useEffect(() => {
    axios.get('http://localhost:9000/rights?_embed=children').then((res) => {
      const list = res.data
      list.map((item) => {
        return item.children.length == 0 ? item.children = "" : item.children
      })
      setData(list)
    })
  }, [])

  return (
    <div>
      <Table columns={columns} dataSource={data} pagination={
        {
          defaultPageSize: 5,
          position: ['bottomRight']
        }
      } />;
    </div>
  )
}
