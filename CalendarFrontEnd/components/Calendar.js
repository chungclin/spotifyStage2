import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { fetchMonth } from '../store'

class NavBar extends React.Component {
    constructor(props){
        super(props)
        // this.state = {
        //     months: []
        // }
    }


}



//Container
const mapState = state => {
    return {
        month: state.month
    }
}

const mapDispatch = dispatch => {
    return {
        fetchMonthFromServer: function(id) {
            return dispatch(fetchMonth(id))
        }
    }
}

export default connect(mapState, mapDispatch)(NavBar)