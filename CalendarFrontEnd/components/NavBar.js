import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { fetchMonths } from '../store'

class NavBar extends React.Component {
    constructor(props){
        super(props)
        // this.state = {
        //     months: []
        // }
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
                            <li>
                            <Link to={`/calendar/${month.id}`}>{month.month}</Link>
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
        months: state.months
    }
}

const mapDispatch = dispatch => {
    return {
        fetchMonthsFromServer: function() {
            return dispatch(fetchMonths())
        }
    }
}

export default connect(mapState, mapDispatch)(NavBar)