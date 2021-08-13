import React from 'react'
import { Switch, Route, Redirect} from 'react-router'

import Home from '../componentes/home/Home'
import UserCrud from '../componentes/users/UserCrud'
import TableCrud from '../componentes/table/TableCrud'
import EditCrud from '../componentes/edit/EditCrud'
import DeleteCrud from '../componentes/delete/DeleteCrud'

// eslint-disable-next-line import/no-anonymous-default-export
export default props => 
    <Switch>
        <Route exact path='/' component = {Home}/>
        <Route path='/users' component = {UserCrud}/>
        <Route path='/table' component = {TableCrud}/>
        <Route path='/edit' component = {EditCrud}/>
        <Route path='/delete' component = {DeleteCrud}/>
        <Redirect from = '*' to = '/' />
    </Switch>