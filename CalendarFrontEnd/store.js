import axios from 'axios'
import thunkMiddleware from 'redux-thunk'
import loggingMiddleware from 'redux-logger'
import { createStore, applyMiddleware } from 'redux'

const initialState = {
    months: [],
    month: [],
    selectedDay: {},
    events: []
}

//Action Types
const GET_ALL_MONTHS = 'GET_ALL_MONTHS'
const GET_SINGLE_MONTH = 'GET_SINGLE_MONTH'

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
}

//Thunk Creators

export function fetchMonths() {
    return function(dispatch){
        return axios.get('./api/months')
        .then(res => res.data)
        .then(gotTheMonths => {
            const action = getMonths(gotTheMonths)
            dispatch(action)
        })
    }
}

export function fetchMonth() {
    return function(dispatch){
        return axios.get('./api/month')
        .then(res => res.data)
        .then(months => {
            const action = getMonth(months)
            dispatch(action)
        })
    }
}

//Reducer
function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_MONTHS:
            console.log('stateeee', state)
            return Object.assign({}, state, { months: action.months})
        case GET_SINGLE_MONTH:
            return Object.assign({}, state, { month: action.month})
        default:
            return state
    }
}

export default createStore(reducer, applyMiddleware(thunkMiddleware, loggingMiddleware))