import axios from 'axios'
import thunkMiddleware from 'redux-thunk'
import loggingMiddleware from 'redux-logger'
import { createStore, applyMiddleware } from 'redux'
import history from './history';

const initialState = {
    months: [],
    month: [],
    selectedDay: {},
    eventsForDay: []
}

//Action Types
const GET_ALL_MONTHS = 'GET_ALL_MONTHS'
const GET_SINGLE_MONTH = 'GET_SINGLE_MONTH'

const GET_MONTH_EVENTS = 'GET_MONTH_EVENTS'
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

export function getMonthEvents(eventsForDay) {
    const action = {
        type: GET_MONTH_EVENTS,
        eventsForDay
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

export function fetchDayEventsThunk(monthId, dayId) {
    return function(dispatch){
        return axios.get(`/api/months/${monthId}/day/${dayId}/events`)
        .then(res => res.data)
        .then(data => console.log('data', data))
        .then(events => {
            const action = getMonthEvents(events)
            dispatch(action)
        })
        .catch(err => console.error(err));
    }
}

export function putEventThunk(event, monthId, dayId, eventId) {
    return function(dispatch) {
        return axios.put(`/api/months/${monthId}/day/${dayId}/events/${eventId}`, event)
        .then(res => res.data)
        .then(eventPosted => {
            dispatch(updateEvent(eventPosted))
            history.push(`/calendar/${monthId}`);
        })
    }
}

export function postEventThunk(event, monthId, dayId) {
    return function(dispatch) {
        return axios.post(`/api/months/${monthId}/day/${dayId}/events`, event)
        .then(res => res.data)
        .then(eventAdded => {
            dispatch(addEvent(eventAdded))
            dispatch(getMonthThunk(monthId));
            history.push(`/calendar/${monthId}`);
        })

    }
}

export function deleteEventThunk(monthId, dayId, eventId) {
    return function(dispatch) {
        return axios.delete(`/api/months/${monthId}/day/${dayId}/events/${eventId}`)
        .then(res => res.data)
        .then(() => {
        dispatch(getMonthThunk(monthId));
        })
        .catch(err => console.error(err));
    }
}

//Reducer
function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_MONTHS:
            return Object.assign({}, state, { months: action.months })
        case GET_SINGLE_MONTH:
            return Object.assign({}, state, { month: action.month })
        case GET_MONTH_EVENTS:
            return Object.assign({}, state, { eventsForDay: action.eventsForDay })
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