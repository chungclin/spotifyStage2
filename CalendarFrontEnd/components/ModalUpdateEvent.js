import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Modal from 'react-modal';
import { putEventThunk } from '../store'


export default class ModalUpdateDelete extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            modalIsOpen: false,
            name: '',
            description: '',
            startTime: '',
            endTime: ''
        }
        this.handleUpdate = this.handleUpdate.bind(this)
        this.openUpdateModal = this.openUpdateModal.bind(this);
        this.closeUpdateModal = this.closeUpdateModal.bind(this);
        this.handleChange = this.handleChange.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
    }

    handleChange(evt) {
        this.setState({[evt.target.name]: evt.target.value})
    }

    openUpdateModal() {
        this.setState({modalIsOpen: true});
    }

    closeUpdateModal() {
        this.setState({modalIsOpen: false});
    }

    handleUpdate(evt) {
        evt.preventDefault()
        const updateEvent = {
            name: this.state.name,
            description: this.state.description,
            startTime: this.state.startTime,
            endTime: this.state.endTime,
            dayId: this.props.dayId
        }
        this.props.putEvent(updateEvent, this.props.month, this.props.dayId, this.props.eventId)
        this.setState({modalIsOpen: false});
    }

    handleDelete(evt){
        evt.preventDefault()
        this.props.deleteEvent(this.props.month, this.props.dayId, this.props.eventId)
    }

    render(){
        return (
            <div>
            <button onClick={this.handleDelete}>Delete Event</button>
            <button onClick={this.openUpdateModal}>Update Event</button>
            <Modal
            isOpen={this.state.modalIsOpen}
            onAfterOpen={this.closeAndSaveModal}
            onRequestClose={this.closeUpdateModal}
            >
            <h2 ref={subtitle => this.subtitle = subtitle}>Update Event</h2>
            <button onClick={this.closeUpdateModal}>close</button>
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
    )
}
}


