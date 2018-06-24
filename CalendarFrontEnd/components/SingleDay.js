import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Modal from 'react-modal'
import { postEventThunk, fetchDayEventsThunk, putEventThunk, deleteEventThunk } from '../store'
import ViewEventsModal from './ViewEventsModal'
import AddEventModal from './ModalAddEvent'

const calendarDay = {
    display: "flex",
    border: "1px solid gray",
    padding: "20px",
    width: "11%",
    height: "100px"
}

class SingleDay extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            events: []
        }
    }

    componentDidMount(){
            axios.get(`/api/months/${this.props.month}/day/${this.props.dayId}/events`)
                .then(res => res.data)
                .then(events => this.setState({ events }))
    }


    render(){
        let { dayId, monthAndDay, dayOfWeek } = this.props
        return (
            <div dayId={dayId} style={calendarDay}>
                {monthAndDay}
                <br />
                {dayOfWeek}
                <br />
                {   !this.state.events.length ? 
                    'No events'
                    :
                    <ViewEventsModal 
                     month={this.props.month}
                     events={this.state.events}
                     dayId={dayId}
                     putEvent={this.props.putEventToServer}
                     deleteEvent={this.props.deleteEventToServer}
                     />
                }
                <br />
                <AddEventModal
                    month={this.props.month}
                    dayId={this.props.dayId}
                    postEvent={this.props.postEventToServer}
                />
            </div>
                    )
            }
}

const mapState = state => {
    return {
        events: state.eventsForDay
    }
}

const mapDispatch = dispatch => {
    return {
        postEventToServer: function(event, monthId, dayId) {
            return dispatch(postEventThunk(event, monthId, dayId))
        },
        getEventsForThatDay: function(monthId, dayId){
            return dispatch(fetchDayEventsThunk(monthId, dayId))
        },
        putEventToServer: function(event, monthId, dayId, eventId) {
            return dispatch(putEventThunk(event, monthId, dayId, eventId))
        },
        deleteEventToServer: function(monthId, dayId, eventId) {
            return dispatch(deleteEventThunk(monthId, dayId, eventId))
        }
    }
}

export default connect(mapState, mapDispatch)(SingleDay)
