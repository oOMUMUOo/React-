import React, { useEffect } from 'react'
import { Layout, Menu, } from 'antd';
import {
  MailOutlined,
  AppstoreOutlined,
  SettingOutlined,
  QuestionCircleOutlined,
  CheckCircleOutlined,
  CheckSquareOutlined,
  WarningOutlined,
  DiffOutlined,
  StrikethroughOutlined,
  ZoomInOutlined
} from '@ant-design/icons';
import { withRouter } from 'react-router-dom'
import './index.css'
import axios from 'axios';


const { Sider } = Layout;

const IconArrays = {
  "/home": <MailOutlined />,
  "/user-manage": <AppstoreOutlined />,
  "/user-manage/list": <AppstoreOutlined />,
  "/right-manage": <SettingOutlined />,
  "/right-manage/role/list": <SettingOutlined />,
  "/right-manage/right/list": <QuestionCircleOutlined />,
  "/news-manage": <CheckCircleOutlined />,
  "/news-manage/add": <CheckCircleOutlined />,
  "/news-manage/draft": <CheckSquareOutlined />,
  "/news-manage/category": <WarningOutlined />,
  "/audit-manage": <DiffOutlined />,
  "/audit-manage/audit": <DiffOutlined />,
  "/audit-manage/list": <StrikethroughOutlined />,
  "/publish-manage": <ZoomInOutlined />,
  "/publish-manage/unpublished": <ZoomInOutlined />,
  "/publish-manage/published": <ZoomInOutlined />,
  "/publish-manage/sunset": <ZoomInOutlined />,
}
  

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children: children || undefined,
    label,
    type,
  };
}

function menuItemChange(props, item) {
  props.history.replace(item.key)
}

function SideMenu(props) {

  const [menuItems, setMenuItems] = React.useState([]);
  const {role: {rights}} = JSON.parse(localStorage.getItem('username'))

  useEffect(() => {
    axios.get('/rights?_embed=children').then((res) => {
      // console.log(res.data, '-------res')
      const data = res.data.map(item => {
        if (item.pagepermission === 1 && rights.includes(item.key)) {
          return getItem(item.title, item.key, IconArrays[item.key], item.children?.length > 0 ? item.children?.map(ele => {
            if (ele.pagepermission === 1 && rights.includes(ele.key)) {
              return getItem(ele.title, ele.key, IconArrays[ele.key]);
            }
          }) : undefined, item.type)
        }
      });
      setMenuItems(data);
    })
  }, [])

  // console.log(props.location.pathname)
  const selectKeys = props.location.pathname
  const openKeys = ["/" + props.location.pathname.split('/')[1]]
  return (
    <div>
      <Sider trigger={null} collapsible collapsed={false}>
        <div style={{display: 'flex', height: '100%', flexDirection: 'column'}}>
          <div className="demo-logo-vertical">全球新闻发布管理系统</div>
          <div style={{flex: 1, overflow: 'auto'}}>
            <Menu
              theme="dark"
              mode="inline"
              selectedKeys={selectKeys}
              defaultOpenKeys={openKeys}
              items={menuItems}
              onClick={(item) => menuItemChange(props, item)}
            />
          </div>
        </div>
      </Sider>
    </div>
  )
}

export default withRouter(SideMenu)