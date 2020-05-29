import React, { Component } from 'react';
import { connect } from 'react-redux'
import Dashboard from '../containers/Dashboard'
import { withRouter } from 'react-router'



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

 
    
    deleteNote = () => {
        const fetchObj = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
             // body: JSON.stringify(this.props.note)
        }
        
            fetch(NOTES + this.props.note.id, fetchObj)
            .then(resp => resp.json())
            .then(note => {
                    this.props.setNote(note)
                    this.props.addNote(note)
                    this.setState({note: note})
            })
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
        event.preventDefault()
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
        .then(note => {
            this.props.setNote(note)
            this.props.addNote(note)
        
        })
    

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



    
    
    render = () => {
        // console.log(this.props.note)
        return (
            <div>
                {this.state.editToggle ?  this.renderEdit() : this.renderShow() }
            </div>
        )
    }
}


const mapStateToProps = state => {
    return { 
      note: state.note
      

    }
}

const mapDispatchToProps = dispatch => {
    return { 
        setNote: () => dispatch({type: 'SET_NOTE', note: undefined}),
        addNote: (note) => dispatch({type: 'SET_NOTES', note: note})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NoteDetails)