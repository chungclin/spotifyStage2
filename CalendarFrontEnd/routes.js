import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Route, Switch, Redirect } from 'react-router-dom'
import {
    NavBar,
    AddEvent,
    Home,
    Calendar
} from './components'



class Routes extends Component {
    render() {
        return (
            <div>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/home" component={Home} />
                <Route exact path="/calendar/:id" component={Calendar} />
                <Route exact path="/calender/:id/addevent" component = {Calendar} />
            </Switch>
            </div>
        )
    }
}

export default Routes