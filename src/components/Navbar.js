import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

class Navbar extends React.Component {

    handleClick = () => {
        this.props.resetUsername()
        this.props.resetNote()
        this.props.resetUser()
        this.props.resetNote()
    }

    render(){
        return (
            <nav class="navbar  navbar-light bg-light">
                <Link to="/dashboard" className="navbar-brand mb-0 h1">Dashbord</Link>
                <Link to="/note/new" className="navbar-brand mb-0 h1">New Note</Link>                        
                <Link onClick={this.handleClick} to="/login" className="navbar-brand mb-0 h1">LogOut</Link>                    
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