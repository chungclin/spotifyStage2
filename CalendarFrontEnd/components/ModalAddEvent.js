import React from 'react'
import Modal from 'react-modal'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'


export default class AddEventModal extends React.Component {
    constructor(props){
        super(props)
        this.state = {
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
        this.props.postEvent(newEvent, this.props.month, this.props.dayId)
        this.setState({modalIsOpen: false});
    }


    render(){
        return (
            <div>
            <button onClick={this.openAddModal}>Add Event</button>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onAfterOpen={this.closeAndSaveModal}
                    onRequestClose={this.closeAddModal}
                    onClick={()=>this.props.getEventsForThatDay(this.props.month, this.props.dayId)
                    }
                    >
                    <h2 ref={subtitle => this.subtitle = subtitle}>Add Event</h2>
                    <form onSubmit={this.handleSubmit}>
                        <fieldset>
                            <legend>Add an Event</legend>
                                <input
                                className="form-control"
                                placeholder="Enter Event Name"
                                onChange={this.handleChange}
                                name="name"
                                type="text"
                                required
                                />
                                <input
                                className="form-control"
                                name="description"
                                placeholder="Enter Event Description"
                                type="text"
                                onChange={this.handleChange}
                                required
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
                                <button onClick={this.closeAddModal}>close</button>

                            </Modal>
                            </div>
                )
        }
}