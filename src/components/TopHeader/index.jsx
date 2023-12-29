import React, { useState } from 'react'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Layout, Button, Dropdown, Space, Avatar } from 'antd';
import style from './index.module.scss'

const { Header } = Layout;

const items = [
  {
    key: '1',
    label: '详细信息'
  },
  {
    key: '2',
    label: '退出',
    danger: true,
  },
];

const onClick = ({ key }) => {
  // console.log(`Click on item ${key}`);
};

export default function TopHeader() {
  const [collapsed, setCollapsed] = useState(false);
  
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
          <span className={style.userTitle}>欢迎admin回来</span>
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
