import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { AddEvent, ViewEvent } from './index'

import { fetchMonthThunk } from '../store'

const container = {
    "display": "flex",
    "width": "100%",
    "flexWrap": "wrap"
}

const calendarDay = {
        display: "flex",
        border: "1px solid gray",
        padding: "20px",
        width: "calc(100% / 7)",
        height: "100px"
}

class Calendar extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            isHidden: true
        }

        this.toggleViewEvent = this.toggleViewEvent.bind(this)
    }

    componentDidMount() {
        this.props.fetchMonthFromServer(this.props.match.params.monthid)
    }

    toggleViewEvent () {
        this.setState({
          isHidden: !this.state.isHidden
        })
      }

    render () {
        const { month } = this.props
        const sorted = month.sort((a, b) => {
            return (a.dayOfMonth - b.dayOfMonth)
        })
        return (
            <div>
            <div style={container}>
            {
                sorted.map(day => {
                    return (
                        <div style={calendarDay} key={day.id} dayId={day.id} onClick={this.toggleViewEvent}>
                        {day.monthAndDay}
                        <br />
                        {day.dayOfWeek}
                        <br />
                        <button onClick={this.toggleViewEvent.bind(this)}>Add an Event</button>
                        </div>
                    )
                    {!this.state.isHidden && <AddEvent />}
                })          
            }
            </div>
            </div>
        )
    }

}

// <Link to={`/months/${day.dayAndMonth.slice(1)}/day/${day.id}/addevent`}><AddEvent /></Link>


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