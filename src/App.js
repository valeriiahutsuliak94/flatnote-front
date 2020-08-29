import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom'
import './App.css';
import Login from './components/Login'
import Navbar from './components/Navbar'
import { connect } from 'react-redux'
import NavbarLogin from './components/NavbarLogin'
import Dashboard from './containers/Dashboard'
// import { render } from '@testing-library/react';
import { Redirect } from 'react-router-dom'
import NewNoteForm from './components/NewNoteForm'

const BASE = 'http://localhost:3000'
const USERS = `${BASE}/users`
const TAGS = `${BASE}/tags`

class App extends React.Component {
  
  renderRedirect = () => {
    if (this.props.username) {
      return <Redirect to="/dashboard"/>
    } else {
      return <Redirect to="/login"/> 
    }
  }

  componentDidMount() {
    fetch(USERS)
    .then(resp => resp.json())
    .then(users => this.props.setUserList(users))
    fetch(TAGS)
    .then(resp => resp.json())
    .then(tags => this.props.setTags(tags))
  }

  render() {
    return (
      <Router>
        <div>
          {/* {this.setOrCreateUser()} */}
          {this.renderRedirect()}
          <Switch>
            <Route path="/login">
              <NavbarLogin />
              <Login />
            </Route>
            <Route path="/dashboard">
              <Navbar />
              <Dashboard />
            </Route>
            <Route path="/note/new">
              <Navbar />
              <NewNoteForm />
            </Route>
            <Route path="/note/:id">
              <Navbar />
              <Dashboard />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = state => {
  return { 
    username: state.username, 
    users: state.users,
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return { 
    setUserList: (userData) => dispatch({type: 'SET_USERS', users: userData}),
    setTags: (tags) => dispatch({type: 'SET_TAGS', tags: tags}),
 }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)