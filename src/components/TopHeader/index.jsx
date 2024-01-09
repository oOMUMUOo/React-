import React, { useState } from 'react'
import {withRouter} from 'react-router-dom'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Layout, Button, Dropdown, Space, Avatar } from 'antd';
import style from './index.module.scss'

const { Header } = Layout;



const onClick = ({ key }) => {
  // console.log(`Click on item ${key}`);
};

function TopHeader(props) {
  const [collapsed, setCollapsed] = useState(false);
  const {username, role: {roleName}} = JSON.parse(localStorage.getItem("username"))

  const items = [
    {
      key: '1',
      label: (
        <span>{roleName}</span>
      )
    },
    {
      key: '2',
      label: (
        <span onClick={()=> {
          console.log(props)
          localStorage.removeItem('username')
          props.history.replace('/login')
        }}>退出</span>
      ),
      danger: true,
    },
  ];
  
  return (
    <div>
      <Header style={{ padding: 0, background: 'white' }}>
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapsed(!collapsed)}
          style={{
            fontSize: '16px',
            width: 64,
            height: 64,
          }}
        />

        <div className={style.userBox}>
          <span className={style.userTitle}>欢迎<span className={style.username}>{username}</span>回来</span>
          <Dropdown
            menu={{
              items,
              onClick,
            }}
          >
            <Avatar icon={<UserOutlined />} />
          </Dropdown>
        </div>
      </Header>
    </div>
  )
}
export default withRouter(TopHeader)