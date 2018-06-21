import React, { Component } from 'react'



class AddEventForm extends Component {
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
        this.props.addEvent
    }
}