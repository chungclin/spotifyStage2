import axios from 'axios'
import thunkMiddleware from 'redux-thunk'
import loggingMiddleware from 'redux-logger'
import { createStore, applyMiddleware } from 'redux'
import history from './history';

const initialState = {
    months: [],
    month: [],
    selectedDay: {},
    events: []
}

//Action Types
const GET_ALL_MONTHS = 'GET_ALL_MONTHS'
const GET_SINGLE_MONTH = 'GET_SINGLE_MONTH'

const GET_ALL_EVENTS = 'GET_ALL_EVENTS'
const GET_SINGLE_EVENT = 'GET_SINGLE_EVENT'

const POST_EVENT = 'POST_EVENT'
const PUT_EVENT = 'PUT_EVENT'
const DELETE_EVENT = 'DELETE_EVENT'


//Action Creators
export function getMonths(months) {
    const action = {
        type: GET_ALL_MONTHS,
        months
    }
    return action
}

export function getMonth(month) {
    const action = {
        type: GET_SINGLE_MONTH,
        month
    }
    return action
}

export function getEvents(events) {
    const action = {
        type: GET_ALL_EVENTS,
        events
    }
    return action
}

export function addEvent(event) {
    const action = {
        type: POST_EVENT,
        event
    }
    return action
}

export function updateEvent(event) {
    const action = {
        type: PUT_EVENT,
        event
    }
    return action
}

//Thunk Creators

export function fetchMonthsThunk() {
    return function(dispatch){
        return axios.get('/api/months')
        .then(res => res.data)
        .then(gotTheMonths => {
            const action = getMonths(gotTheMonths)
            dispatch(action)
        })
        .catch(err => console.error(err));
    }
}

export function fetchMonthThunk(id) {
    console.log('id', id)
    return function(dispatch){
        return axios.get(`/api/months/${id}`)
        .then(res => res.data)
        .then(months => {
            const action = getMonth(months)
            dispatch(action)
        })
        .catch(err => console.error(err));
    }
}

export function fetchEventsThunk(monthId, dayId) {
    return function(dispatch){
        return axios.get(`/api/months/${monthId}/day/${dayId}/events`)
        .then(res => res.data)
        .then(events => {
            const action = getEvents(events)
            dispatch(action)
        })
        .catch(err => console.error(err));
    }
}
export function postEventThunk(event, monthId, dayId) {
    return function(dispatch) {
        return axios.post(`/api/months/${monthId}/day/${dayId}/events`, event)
        .then(res => res.data)
        .then(eventAdded => {
            dispatch(addEvent(eventAdded))
            history.push(`/calendar/${monthId}`);
        })

    }
}

//Reducer
function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_MONTHS:
            return Object.assign({}, state, { months: action.months })
        case GET_SINGLE_MONTH:
            return Object.assign({}, state, { month: action.month })
        case GET_ALL_EVENTS:
            return Object.assign({}, state, { events: action.events })
        case GET_SINGLE_EVENT:
        case POST_EVENT:
            return Object.assign({}, state, { events: [...state.events, action.events] });
        case PUT_EVENT:
            return Object.assign({}, state, { event: action.event });
        default:
            return state
    }
}

export default createStore(reducer, applyMiddleware(thunkMiddleware, loggingMiddleware))