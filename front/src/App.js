import React, { Component } from 'react';
import Cookies from 'js-cookie';

import Loader from './components/loader';
import Home from './components/home';
import Panel from './components/panel';

export default class App extends Component {
  constructor(props){
    super(props)

    this.onLogin = this.onLogin.bind(this)
    this.onLogout = this.onLogout.bind(this)
  }

  state = {
    onLoading: true,
    onLogin: null,
    loginUser: null,
  }

  onLogin(username){
    Cookies.set('rce-session', username)
    this.setState({loginUser: username, onLogin: true})
  }

  onLogout(){
    Cookies.remove('rce-session')
    Cookies.remove('rce-session-addr')
    Cookies.remove('rce-session-creds')
    this.setState({loginUser: null, onLogin: null})
  }

  render() {
    if(this.state.onLoading){
      setTimeout( ()=>{
        let loginUser = Cookies.get('rce-session')
        let onLogin = (loginUser)

        this.setState({onLoading: false, loginUser, onLogin})
      },
      3000)
    }

    return (
      (this.state.onLoading) ?
      <div>
        <Loader />
      </div>
      :
      (this.state.onLogin && this.state.loginUser) ?
      <Panel
        onLogout={this.onLogout}
        loginUser={this.state.loginUser}
        />
      :
      <Home
        onLogin={this.onLogin}
        />
    )
  }
}
