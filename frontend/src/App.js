import React from 'react'
import './App.css';
import axios from "axios";
import Menu from "./components/menu";
import UserList from "./components/users";
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import NotFound from "./components/notfound";
import Projects from "./components/projects";
import {UserProfile} from "./components/users";
import {Project} from "./components/projects";
import LoginForm from "./components/login";
import {Box} from "@mui/material";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'users': [],
      'projects': [],
      'token': null,
      'username': ''
    }
  }

  getToken(username, password){
        axios.post('http://127.0.0.1:8000/api-token-auth/', {username: username, password: password})
            .then(response => {
                this.setState({'username': username})
                localStorage.setItem('username', username)
                this.setToken(response.data['token'])
            })
            .catch(error => {
                console.log(error)
                alert("Wrong password or username!")
            })
    }

  getHeaders(){
      let headers = {
          'Content-type': 'application/json'
      }
      if (this.isAuthenticated()){
          headers['Authorization'] = 'Token ' + this.state.token
      }
      return headers
  }

  setToken(token){
      localStorage.setItem('token', token)
      this.setState({'token': token}, () => this.loadData())
  }
  getTokenFromStorage() {
      const token = localStorage.getItem('token')
      const username = localStorage.getItem('username')
      this.setState({'token': token, 'username': username}, () => this.loadData())
  }

  isAuthenticated() {
      return !!this.state.token
  }

  getUsername() {
      return this.state.username
  }

  logout(){
      this.setToken('')
  }

  loadData(){
      const headers = this.getHeaders()
      console.log(headers)
      axios.get('http://127.0.0.1:8000/api/users/', {headers})
        .then(data => {
            this.setState({
              'users': data.data.results,
            })
        })
        .catch(error => {
          this.setState({'users': []})
          console.log(error)
        })
     axios.get('http://127.0.0.1:8000/api/projects/', {headers})
        .then(data => {
            this.setState({
              'projects': data.data.results,
            })
        })
        .catch(error => {
            this.setState({'projects': []})
            console.log(error)
        })
  }

  componentDidMount() {
     this.getTokenFromStorage()
  }

  render() {
    return (
        <Box sx={{display: "flex", justifyContent: "center", pb: 8}}>
          <BrowserRouter>
              <Switch>
                  <Route exact path='/' render={() => (<Redirect to='/projects' />)} />
                  <Route exact path='/users' component={() => <UserList users={this.state.users} />} />
                  <Route exact path='/projects' component={() => <Projects users={this.state.users} projects={this.state.projects} getHeaders={this.getHeaders.bind(this)} />} />
                  <Route exact path='/login' component={() => <LoginForm getToken={(username, password) => {this.getToken(username, password)}} isAuthenticated={this.isAuthenticated.bind(this)} />} />
                  <Route path={'/projects/:id'} component={() => <Project users={this.state.users} getHeaders={this.getHeaders.bind(this)} /> } />
                  <Route path={'/users/:id'} component={() => <UserProfile getHeaders={this.getHeaders.bind(this)} />} />
                  <Route component={NotFound} />
              </Switch>
              <Menu isAuthenticated={this.isAuthenticated.bind(this)} logout={() => { this.logout()}} getUsername={this.getUsername.bind(this)} />
          </BrowserRouter>
        </Box>
    )
  }
}

export default App;
