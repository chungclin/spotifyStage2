import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Modal from 'react-modal'
import { postEventThunk, fetchDayEventsThunk, putEventThunk, deleteEventThunk } from '../store'
import ViewEventsModal from './ViewEventsModal'

const calendarDay = {
    display: "flex",
    border: "1px solid gray",
    padding: "20px",
    width: "10%",
    height: "100px"
}

class SingleDay extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            events: [],
            modalIsOpen: false,
            name: '',
            description: '',
            startTime: '',
            endTime: ''
        }
        this.openAddModal = this.openAddModal.bind(this);
        this.closeAddModal = this.closeAddModal.bind(this);
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

        componentDidMount(){
            axios.get(`/api/months/${this.props.month}/day/${this.props.dayId}/events`)
                .then(res => res.data)
                .then(events => this.setState({ events }))
        }

        handleChange(evt) {
            this.setState({[evt.target.name]: evt.target.value})
        }

        openAddModal() {
            this.setState({modalIsOpen: true});
        }

        closeAddModal() {
            this.setState({modalIsOpen: false});
        }

        handleSubmit(evt) {
            evt.preventDefault()
            console.log('f', this.props.month, this.state.startTime, this.state.endTime)
            const newEvent = {
                name: this.state.name,
                description: this.state.description,
                startTime: this.state.startTime,
                endTime: this.state.endTime,
                dayId: this.props.dayId
            }
            console.log('new event', newEvent)
            this.props.postEventToServer(newEvent, this.props.month, this.props.dayId)
            this.setState({modalIsOpen: false});
        }

    render(){
        let { dayId, monthAndDay, dayOfWeek } = this.props
        return (
            <div dayId={dayId} style={calendarDay}>
                {monthAndDay}
                <br />
                {dayOfWeek}
                <br />
                <ViewEventsModal events={this.state.events}
                 dayId={dayId}
                 putEvent={this.props.putEventToServer}
                 deleteEvent={this.props.deleteEventToServer}
                 />
            <div>
            <button onClick={this.openAddModal}>Add Event</button>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onAfterOpen={this.closeAndSaveModal}
                    onRequestClose={this.closeAddModal}
                    >
                    <h2 ref={subtitle => this.subtitle = subtitle}>Add Event</h2>
                    <button onClick={this.closeModal}>close</button>
                    <form onSubmit={this.handleSubmit}>
                        <fieldset>
                            <legend>Add an Event</legend>
                                <input
                                className="form-control"
                                placeholder="Enter Event Name"
                                onChange={this.handleChange}
                                name="name"
                                type="text"
                                />
                                <input
                                className="form-control"
                                name="description"
                                placeholder="Enter Event Description"
                                type="text"
                                onChange={this.handleChange}
                                />
                                    <label htmlFor="start-time">Start Time</label>
                                    <input type="time" id="start-time" name="startTime" 
                                        onChange={this.handleChange}
                                             required />
                                    <label htmlFor="start-time">End Time</label>
                                    <input type="time" id="end-time" name="endTime"
                                        onChange={this.handleChange}
                                             required />
                                </fieldset>
                                <button type="submit" value="submit">Submit Event</button>
                                </form>
                            </Modal>
                            </div>
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
