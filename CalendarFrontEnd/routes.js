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
                <Route exact path="/months/:monthid" component={Calendar} />
                <Route exact path="/months/:monthid/day/:dayid/addevent" component={Calendar} />
                <Route exact path="/months/:monthid/day/:dayid" component={Calendar} />
                <Route exact path="/months/:monthid/day/:dayid/events/:eventid" component={Calendar} />
                <Route path="/months" component={Home} />
            </Switch>
            </div>
        )
    }
}

export default Routes