import React from 'react';
import octocat from './img/octocat.png'
import UserCard from "./components/UserCard";
import GlobalStyle from './components/GlobalStyle';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      userName: 'lccarrier',
      user: {},
      followers: []
    };
  }


  fetchUser = () => {
    fetch(`https://api.github.com/users/${this.state.userName}`)
      .then(res => res.json()) 
      .then(data => this.setState({ user: data}))
  }

  fetchFollowers = () => {
    fetch(`https://api.github.com/users/${this.state.userName}/followers`)
      .then(res => res.json())
      .then(data => this.setState({ followers: data}))
  }

  componentDidMount() {
    this.fetchUser();
    this.fetchFollowers();
  }

  componentDidUpdate (prevProps, prevState) {
    console.log(this.state); 
    if (prevState.userName !== this.state.userName) {
      this.fetchUser();
      this.fetchFollowers();
    }
  }

  render() {
    return (
      <div className="App">
        <img src={octocat} className="logo" alt="Github logo" />
        <UserCard user={this.state.user} followers={this.state.followers}/>
        <GlobalStyle />
      </div>
    )
  }
}

export default App;