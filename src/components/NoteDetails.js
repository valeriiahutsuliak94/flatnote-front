import React from 'react'
import { connect } from 'react-redux'

const URL= 'http://localhost:3000'
const NOTES = `${URL}/notes/`
const NOTE_TAGS =`${URL}/note_tags`

class NoteDetails extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            editToggle: false,
            title: this.props.note.title,
            content: this.props.note.content
        }
    }


    handleClick = () => {
        this.props.resetUsername()
        this.props.resetNote()
        this.props.resetUser()
        this.props.resetNote()
    }
    
    deleteNote = () => {
        const fetchObj = {
            method: 'DELETE',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify(this.props.note)
        }
        fetch(NOTES + this.props.note.id, fetchObj)
        .then(resp => resp.json())
        .then(data => this.props.resetNote())

    }



    showEdit = () => {
        this.setState({
            editToggle: true,
            title: this.props.note.title,
            content: this.props.note.content
        })
    }


    
    renderShow = () => {
      
        return (
            <div>
                <h2>{this.props.note.title}</h2>
                <p>{this.props.note.content}</p>
               
                <br/>
                <button onClick={this.deleteNote}>Delete</button>
                <button onClick={this.showEdit}>Edit</button>
                
                              
            </div>
        )
    }


    
    handleSave = (event) => {
       
        const noteUpdate = {
            title: this.state.title,
            content: this.state.content
        }
        
        const fetchObj = {
            method: 'PUT',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify(noteUpdate)
        }

        fetch(NOTES + this.props.note.id, fetchObj)
        .then(resp => resp.json())
        .then(note => console.log(note))

        
        this.setState({editToggle: false})

    }

    handleTitleChange = (event) => {
        this.setState({title: event.target.value})
    }

    handleContentChange = (event) => {
        this.setState({content: event.target.value})
    }
    
    renderEdit = () => {
        return (
            <div>
                <form onSubmit={this.handleSave}>
                    Title: <input onChange={this.handleTitleChange} type="text"  value={this.state.title}/>
                    Content: <input onChange={this.handleContentChange} type="text"  value={this.state.content}/>
                    <button type="submit">Save</button>
                </form>
            </div>
        )
    }

    handleCheck = (event) => {
        event.target.checked = !event.target.checked
    }

    
    
    render = () => {
        console.log(this.props.note)
        return (
            <div>
                {this.state.editToggle ? this.renderEdit() : this.renderShow()}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return { 
      note: state.note,
      tags: state.tags
    }
}

const mapDispatchToProps = dispatch => {
    return { 
        resetNote: () => dispatch({type: 'SET_NOTE', note: undefined}),
        setNote: (note) => dispatch({type: 'SET_NOTE', note: note})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NoteDetails)