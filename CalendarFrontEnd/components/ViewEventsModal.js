import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Modal from 'react-modal'
import ModalUpdateDelete from './ModalUpdateEvent';


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
            {
                this.props.events.map(event => {
                    return (
                        <div key={event.id}>
                        <div>
                        Name: {event.name}
                        <br />
                        Description: {event.description}
                        <br />
                        Start Time: {event.startTime}
                        <br />
                        End Time: {event.endTime}
                        </div>
                        <div>
                        <ModalUpdateDelete 
                            putEvent={this.props.putEvent} 
                            month={this.props.month} 
                            eventId={event.id} 
                            dayId={this.props.dayId}
                            deleteEvent={this.props.deleteEvent}
                            />
                        </div>
                        </div>
                    )
                })
            }
                    </Modal>
                    </div>
    )
}
}