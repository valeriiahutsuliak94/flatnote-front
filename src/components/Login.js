import React from 'react'
import { connect } from 'react-redux'


const URL = 'http://localhost:3000'
const USERS = `${URL}/users`

class Login extends React.Component {
    state = {
        input: ""
    
    }
    

    handleChange = event => {
        console.log(event)
        this.setState({input: event.target.value})
    }
    handleSubmit = () => {
        this.props.chooseUser(this.state.input)
    }
    

    // handleSubmit = () => {
    
    //     fetch(USERS,{ 
            
    //     method: 'POST', 
    //     headers:
    //      {
    //       'Content-Type': 'application/json',
    //     },
        
    //     body: JSON.stringify({"user":{"username": this.state.input}}),
    //   })
    //     .then(resp => resp.json())
    //     .then(user => 
    //         { console.log(user)
    //         this.props.chooseUser(user)
    //         this.props.history.push('/dashboard')
    //         })
        
    // }
    
    render() {
        console.log(this.props)
        return (
            <div>
                <input value={this.state.input} type="text" onChange={this.handleChange}/>
                <button onClick={this.handleSubmit}>Login</button>
            </div>
        )
    } 
}

const mapDispatchToProps = dispatch => {
    return { chooseUser: (input) => dispatch({type: 'CHOOSE_USER', username: input}) }
}

export default connect(null, mapDispatchToProps)(Login)