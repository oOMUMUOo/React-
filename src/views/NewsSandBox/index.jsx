import React, { useState } from 'react';
import SideMenu from '../../components/SideMenu'
import TopHeader from '../../components/TopHeader'
import NewRouter from '../../router/NewRouter.js'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { Layout, theme } from 'antd';
import { useEffect } from 'react';
const { Content } = Layout;


const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  NProgress.start();
  useEffect(()=> {
    NProgress.done()
  })
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
        <NewRouter></NewRouter>
        </Content>
      </Layout>
    </Layout>
  );
};
export default App;