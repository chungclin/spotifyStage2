import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { postEventThunk } from '../store'


export default class AddEvent extends Component {
    constructor(props){
        super(props)
        this.state = {
            name: '',
            description: '',
            startTime: '',
            endTime: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(evt) {
        this.setState({[evt.target.name]: evt.target.value})
    }

    handleSubmit(evt) {
        evt.preventDefault()
        const newEvent = {
            name: this.state.name,
            description: this.state.description,
            startTime: this.state.startTime,
            endTime: this.state.endTime,
            dayId: this.props.dayId
        }
        postEventThunk(newEvent);
        this.setState({startTime: '', endTime: '', description: '', name: ''});
    }

    render() {
        return (
            <div>
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
                    <div className="control">
                        <label for="start-time">Start Time</label>
                        <input type="time" id="start-time" name="startTime"
                            min="01:00" max="12:00" required />
                    </div>
                    <div className="control">
                        <label for="start-time">End Time</label>
                        <input type="time" id="end-time" name="endTime"
                            min="01:00" max="12:00" required />
                    </div>
                </fieldset>
            </form>
            </div>
        )
    }
}