import React from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom' 
import Login from '../views/Login/index.jsx'
import NewsSandBox from '../views/NewsSandBox/index.jsx'

export default function IndexRouter() {
  return (
        <HashRouter>
            <Switch>
                <Route path="/login" component={Login} />
                <Route path="/" component={NewsSandBox} />
            </Switch>
        </HashRouter>
  )
}
