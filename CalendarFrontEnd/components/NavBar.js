import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { fetchMonthsThunk, fetchMonthThunk } from '../store'


const nav = {
    "display": "inline",
    "width": "100%",
    "flexWrap": "wrap"
}


class NavBar extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            months: []
        
        }
    }

    componentDidMount() {
        this.props.fetchMonthsFromServer()
    }

    render() {
        return (
            <div className="container">
                <div>
                <ul>
                {
                this.props.months.map(month => {
                    return (
                        <div key={month.id}>
                            <li style={nav}>
                            <Link to={`/months/${month.id}`}>{month.month}</Link>
                            </li>
                        </div>
                    )
                })
                }
                </ul>
                </div>
            </div>
        )
    }
}


//Container
const mapState = state => {
    return {
        months: state.months    }
}

const mapDispatch = dispatch => {
    return {
        fetchMonthsFromServer: function() {
            return dispatch(fetchMonthsThunk())
        }
    }
}

export default connect(mapState, mapDispatch)(NavBar)