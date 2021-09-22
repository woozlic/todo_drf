import React from 'react'
import './App.css';
import axios from "axios";
import Menu from "./components/menu";
import Footer from "./components/footer";
import UserList from "./components/users";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'users': []
    }
  }

  componentDidMount() {
     axios.get('http://127.0.0.1:8000/api/users/')
        .then(data => {
            this.setState({
              'users': data.data,
            })
        })
        .catch(error => {
          console.log(error)
        })

  }

  render() {
    return (
        <div>
          <Menu />
          <UserList users={this.state.users}/>
          <Footer />
        </div>
    )
  }
}

export default App;
