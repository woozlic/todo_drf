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
import ProjectForm from "./components/projectForm";
import TodosForm from "./components/todosForm";


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

  createProject(title, repositoryUrl, users) {
      console.log(title, repositoryUrl, users)
      const sendData = {
          title: title,
          repositoryUrl: repositoryUrl,
          users: users,
          todos: []
      }
      let headers = this.getHeaders()
      axios.post('http://127.0.0.1:8000/api/projects/', sendData, {headers})
          .then(data => {
              if (data.status === 201){
                  alert('Project successfully created!')
              }
          })
          .catch(error => {
              if (error.response.data){
                  console.log(error.response.data)
                  const msgTitle = error.response.data.title && 'Title: ' + error.response.data.title.join('\n')
                  const msgRepositoryUrl = error.response.data.repositoryUrl && 'Repository Url: ' + error.response.data.repositoryUrl.join('\n')
                  const msgUsers = error.response.data.users && 'Users: ' + error.response.data.users.join('\n')
                  msgTitle && alert(msgTitle)
                  msgRepositoryUrl && alert(msgRepositoryUrl)
                  msgUsers && alert(msgUsers)
              }
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
                  <Route path={'/projects/create'} component={() => <ProjectForm createProject={(title, repositoryUrl, users) => this.createProject(title, repositoryUrl, users)} users={this.state.users}/>} />
                  <Route path={'/todos/create'} component={() => <TodosForm />} />
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
