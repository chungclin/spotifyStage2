import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { AddEvent, ViewEvent, SingleDay } from './index'


import { fetchMonthThunk, postEventThunk, fetchMonthEventsThunk } from '../store'

const container = {
    "display": "flex",
    "width": "100%",
    "flexWrap": "wrap"
}



class Calendar extends React.Component {
    constructor(props){
        super(props)
        this.state = {
        }
    }

    componentDidMount() {
        this.props.fetchMonthFromServer(this.props.match.params.monthid)
    }

    render () {
        const { month } = this.props
        const sortedMonth = month.sort((a, b) => {
            return (a.dayOfMonth - b.dayOfMonth)
        })
        return (
            <div>
            <div style={container}>
            {
                sortedMonth.map(day => {
                    return (
                        <SingleDay 
                        month={day.monthId}
                        key={day.id} 
                        dayId={day.id} 
                        monthAndDay={day.monthAndDay} 
                        dayOfWeek={day.dayOfWeek}/>
                
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
        month: state.month
    }
}

const mapDispatch = dispatch => {
    return {
        fetchMonthFromServer: function(id) {
            return dispatch(fetchMonthThunk(id))
        }
    }
}

export default connect(mapState, mapDispatch)(Calendar)