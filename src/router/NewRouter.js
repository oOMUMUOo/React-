import React, { useEffect } from 'react'
import Home from '../pages/Home'
import User from '../pages/User'
import NoPermission from '../pages/NoPermission'
import RightManageRole from '../pages/RightManage/RoleList/index.jsx';
import RightManageRight from '../pages/RightManage/RightList/index.jsx'
import CreateNew from '../pages/News/Create';
import { Route, Switch, Redirect } from 'react-router-dom'
import DraftNew from '../pages/News/Draft';
import CategoryNew from '../pages/News/Category';
import ExamineNews from '../pages/Examine/News';
import ExamineList from '../pages/Examine/List';
import WaitPublish from '../pages/Publish/Wait';
import DonePublish from '../pages/Publish/Done';
import OfflinePublish from '../pages/Publish/Offline';
import { useState } from 'react';
import axios from 'axios';

const LoacalRouterMap = {
  '/home': Home,
  "/user-manage/list": User,
  "/right-manage/right/list": RightManageRight,
  "/right-manage/role/list": RightManageRole,
  "/news-manage/add": CreateNew,
  "/news-manage/draft": DraftNew,
  "/news-manage/category": CategoryNew,
  "/audit-manage/audit": ExamineNews,
  "/audit-manage/list": ExamineList,
  "/publish-manage/unpublished": WaitPublish,
  "/publish-manage/published": DonePublish,
  "/publish-manage/sunset": OfflinePublish
}


export default function NewRouter() {

  const [RouteList, setRouteList] = useState([])
  const {role: {rights}} = JSON.parse(localStorage.getItem('username'))

  useEffect(() => {
    Promise.all(
      [
        axios.get('/rights'),
        axios.get('/children')
      ]
    ).then(res => {
      setRouteList([...res[0].data, ...res[1].data])
    })
  }, [])

  const  checkRoute = (item)=> {
    // 判断路由
    return LoacalRouterMap[item.key] && item.pagepermission
  }

  const  checkUserPermission = (item) => {
    return rights.includes(item.key)
  }



  return (
    <Switch>
      {
        RouteList.map(item => {
          if(checkRoute(item) && checkUserPermission(item)) {
          return <Route path={item.key} key={item.key} component={LoacalRouterMap[item.key]} exact></Route>

          } else {
            return null
          }
        })
      }
      {/* <Route path="/user-manage/list" component={User}></Route>
            <Route path="/right-manage/right/list" component={RightManageRight}></Route>
            <Route path="/right-manage/role/list" component={RightManageRole}></Route> */}
      <Redirect from='/' to="home" exact />
      {
        RouteList.length > 0 && <Route path="*" component={NoPermission}></Route>
      }
    </Switch>
  )
}
