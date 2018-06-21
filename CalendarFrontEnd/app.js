import React from 'react'
import { Route, Switch, Link } from 'react-router-dom'
import Routes from './routes'

import { NavBar, Calendar, Home, AddEvent } from './components'

const App = () => {
    return (
        <div className="container">
        <NavBar />
        <Routes />
        </div>
    )
}

export default App


 