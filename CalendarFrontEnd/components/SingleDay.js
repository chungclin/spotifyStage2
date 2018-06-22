import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Modal from 'react-modal';
import axios from 'axios'
import { postEventThunk, fetchDayEventsThunk, putEventThunk } from '../store'

const calendarDay = {
    display: "flex",
    border: "1px solid gray",
    padding: "20px",
    width: "calc(100%/7)",
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
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleUpdate = this.handleUpdate.bind(this)
    }

        componentDidMount(){
            axios.get(`/api/months/${this.props.month}/day/${this.props.dayId}/events`)
                .then(res => res.data)
                .then(events => this.setState({ events }))
        }

        handleChange(evt) {
            this.setState({[evt.target.name]: evt.target.value})
        }

        openModal() {
            this.setState({modalIsOpen: true});
        }

        closeModal() {
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
            this.props.postEventToServer(newEvent, this.props.month, this.props.dayId)
            this.setState({modalIsOpen: false});
        }

        handleUpdate(evt) {
            evt.preventDefault()
            console.log('WWWW', this.props, this.state.events)
            const updateEvent = {
                name: this.state.name,
                description: this.state.description,
                startTime: this.state.startTime,
                endTime: this.state.endTime,
                dayId: this.props.dayId
            }
            this.props.putEventToServer(updateEvent, this.props.month, this.props.dayId, this.state.events.id)
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
            {
                this.state.events.map(event => {
                    return (
                        <div>
                        <div>
                        Name: {event.name}
                        <br />
                        Description: {event.description}
                        <br />
                        Start Time: {event.startTime}
                        <br />
                        End Time: {event.endTime}
                        </div>
                        <div eventId={event.id}>
            <button onClick={this.openModal}>Update Event</button>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onAfterOpen={this.closeAndSaveModal}
                    onRequestClose={this.closeModal}
                    >
                    <h2 ref={subtitle => this.subtitle = subtitle}>Update Event</h2>
                    <button onClick={this.closeModal}>close</button>
                    <form onSubmit={this.handleUpdate}>
                        <fieldset>
                            <legend>Update this Event</legend>
                                <input
                                className="form-control"
                                placeholder="Event Name"
                                onChange={this.handleChange}
                                name="name"
                                type="text"
                                />
                                <input
                                className="form-control"
                                name="description"
                                placeholder="Event Description"
                                type="text"
                                onChange={this.handleChange}
                                />
                                    <label for="start-time">Start Time</label>
                                    <input type="time" id="start-time" name="startTime" 
                                        onChange={this.handleChange}
                                             required />
                                    <label for="start-time">End Time</label>
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
                })
            }
            <div>
            <button onClick={this.openModal}>Add Event</button>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onAfterOpen={this.closeAndSaveModal}
                    onRequestClose={this.closeModal}
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
                                    <label for="start-time">Start Time</label>
                                    <input type="time" id="start-time" name="startTime" 
                                        onChange={this.handleChange}
                                             required />
                                    <label for="start-time">End Time</label>
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
        }
    }
}


export default connect(mapState, mapDispatch)(SingleDay)
