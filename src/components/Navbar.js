import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'






class Navbar extends React.Component {

    handleClick = () => {
        this.props.resetUsername()
        this.props.resetNote()
        this.props.resetUser()
        this.props.resetNotes()
    }

    render(){
        return (
            <nav class="navbar navbar-dark bg-dark">
                <Link  to="/dashboard" >Dashbord</Link>
                <Link  to="/note/new" >New Note</Link>                        
                <Link onClick={this.handleClick} to="/login" >LogOut</Link>            
            </nav>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        resetUsername: () => dispatch({type: 'CHOOSE_USER', username: undefined}),
        resetUser: () => dispatch({ type: 'SET_USER', user:undefined}),
        resetNotes: () => dispatch({type: 'SET_NOTES', user: undefined }),
        resetNote: () => dispatch({type: 'SET_NOTE', notes: undefined})
    }
}

export default connect(null, mapDispatchToProps)(Navbar)