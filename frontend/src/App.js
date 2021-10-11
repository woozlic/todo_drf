import React from 'react'
import './App.css';
import axios from "axios";
import Menu from "./components/menu";
import Footer from "./components/footer";
import UserList from "./components/users";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import NotFound from "./components/notfound";
import Projects from "./components/projects";
import {UserProfile} from "./components/users";
import {Project} from "./components/projects";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'users': [],
      'projects': [],
    }
  }

  componentDidMount() {
     axios.get('http://127.0.0.1:8000/api/users/')
        .then(data => {
            this.setState({
              'users': data.data.results,
            })
        })
        .catch(error => {
          console.log(error)
        })
     axios.get('http://127.0.0.1:8000/api/projects/')
        .then(data => {
            this.setState({
              'projects': data.data.results,
            })
        })
        .catch(error => {
          console.log(error)
        })
  }

  render() {
    return (
        <div>
          <BrowserRouter>
              <Menu />
              <Switch>
                  <Route exact path='/users' component={() => <UserList users={this.state.users}/>} />
                  <Route exact path='/projects' component={() => <Projects projects={this.state.projects}/>} />
                  <Route path={'/projects/:id'} component={() => <Project /> } />
                  <Route path={'/users/:id'} component={() => <UserProfile />} />
                  <Route component={NotFound} />
              </Switch>
              <Footer />
          </BrowserRouter>
        </div>
    )
  }
}

export default App;
