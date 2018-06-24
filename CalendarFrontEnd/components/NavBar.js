import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { fetchMonthsThunk, fetchMonthThunk } from '../store'


const nav = {
    display: "flex",
    padding: "20px",
    width: "11%",
    height: "100px"
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
            <div>
                <div style={nav}>
                {
                this.props.months.map(month => {
                    return (
                        <div>
                            <div 
                            key={month.id} 
                            style={nav}
                            onClick={()=> this.props.fetchMonthFromServer(month.id)}>
                                <Link to={`/months/${month.id}`}>{month.month}</Link>
                            </div>
                        </div>
                    )
                })
                }
                </div>
            </div>
        )
    }
}

//Container
const mapState = state => {
    return {
        months: state.months,
        month: state.month
        }
}

const mapDispatch = dispatch => {
    return {
        fetchMonthsFromServer: function() {
            return dispatch(fetchMonthsThunk())
        },
        fetchMonthFromServer: function(monthId) {
            return dispatch(fetchMonthThunk(monthId))
        }
    }
}

export default connect(mapState, mapDispatch)(NavBar)