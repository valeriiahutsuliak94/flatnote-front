import React from 'react'
import { connect } from 'react-redux'
import { Redirect, Link } from 'react-router-dom'


const NOTES = 'http://localhost:3000/notes/'

class NoteBox extends React.Component {
    state = {
        toggleChosen: false
    }
    handleSubmit = (event) => {
        event.preventDefault()
        const title = event.target.querySelector('input').value
        const content = event.target.querySelector('textarea').value
        this.postFetch(title, content)
        this.setState({redirectToggle: true})
    }
    
    pickNote = () => {
        fetch(NOTES + this.props.note.id)
        .then(resp => resp.json())
        .then(note => this.props.setNote(note))
        this.setState({toggleChosen: true})
    }

    
    noteLink = () => {
        return `/note/${this.props.note.id}`
    }
    
    render() {
        return (
            <div onClick={this.pickNote} className="list-group">
                <Link  to={`/note/${this.props.note.id}`}>{this.props.note.title}</Link>
            </div>
            

        )
    }
}

const mapDispatchToProps = dispatch => {
    return { 
      setNote: (note) => dispatch({type: 'SET_NOTE', note: note}),
   }
  }
  
  export default connect(null, mapDispatchToProps)(NoteBox)