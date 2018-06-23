import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'


export default class ViewEventsModal extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            modalIsOpen: false,
        }
        this.openUpdateModal = this.openUpdateModal.bind(this);
        this.closeUpdateModal = this.closeUpdateModal.bind(this);

    }

    openUpdateModal() {
        this.setState({modalIsOpen: true});
    }

    closeUpdateModal() {
        this.setState({modalIsOpen: false});
    }


    render(){
        return (
            <div>
            <button onClick={this.openUpdateModal}>View Events</button>
            <Modal
            isOpen={this.state.modalIsOpen}
            onAfterOpen={this.closeAndSaveModal}
            onRequestClose={this.closeUpdateModal}
            >
            <h2 ref={subtitle => this.subtitle = subtitle}>Events</h2>
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