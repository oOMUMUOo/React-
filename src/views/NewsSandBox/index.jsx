import React, { useState } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom'
import SideMenu from '../../components/SideMenu'
import TopHeader from '../../components/TopHeader'
import Home from '../../pages/Home'
import User from '../../pages/User'
import NoPermission from '../../pages/NoPermission'
import RightManageRole from '../../pages/RightManage/RoleList/index.jsx';
import RightManageRight from '../../pages/RightManage/RightList/index.jsx'
import { Layout, theme } from 'antd';
const { Content } = Layout;
const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout>
      <SideMenu></SideMenu>
      <Layout>
      <TopHeader></TopHeader>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 180,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            overflow: "auto"
          }}
        >
        <Switch>
            <Route path="/home" component={Home}></Route>
            <Route path="/user-manage/list" component={User}></Route>
            <Route path="/right-manage/right/list" component={RightManageRight}></Route>
            <Route path="/right-manage/role/list" component={RightManageRole}></Route>
            <Redirect from='/' to="home" exact />
            {/* <Route path="*" component={NoPermission}></Route> */}
        </Switch>
        </Content>
      </Layout>
    </Layout>
  );
};
export default App;