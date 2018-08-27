import React, { Component } from 'react';

import MenuHeader from '../menu';

export default class Home extends Component {

  constructor(props){
    super(props)

    this.onLogin = this.onLogin.bind(this)
    this.onUser = this.onUser.bind(this)
    this.onPass = this.onPass.bind(this)
  }

  state = {
    loginUser: "",
    loginPass: "",
  }

  onUser(e){
    this.setState({loginUser: e.target.value})
  }

  onPass(e){
    this.setState({loginPass: e.target.value})
  }

  onLogin(){
    if(this.state.loginUser === "" || this.state.loginPass === ""){
      alert("Debes ingresar con tu usuario y clave.")
    }else{
      this.props.onLogin(this.state.loginUser)
    }
  }

  render(){
    return(
      <section className="hero is-info is-fullheight">

        <MenuHeader />

        <div className="hero-body">
          <div className="container has-text-centered">
            <h1 className="title">
              Bienvenido a
              <br/>
              RCE-NET
            </h1>
            <div className="field">
              <p className="control has-icons-left has-icons-right">
                <input className="input" type="email" placeholder="Usuario" value={this.state.loginUser} onChange={this.onUser}/>
                  <span className="icon is-small is-left">
                    <i className="fas fa-envelope"></i>
                  </span>
                  <span className="icon is-small is-right">
                    <i className="fas fa-check"></i>
                  </span>
                </p>
              </div>
              <div className="field">
                <p className="control has-icons-left">
                  <input className="input" type="password" placeholder="Clave" value={this.state.loginPass} onChange={this.onPass}/>
                    <span className="icon is-small is-left">
                      <i className="fas fa-lock"></i>
                    </span>
                  </p>
                </div>
                <div className="field">
                  <p className="control">
                    <button className="button is-success" onClick={this.onLogin}>
                      Entrar
                    </button>
                  </p>
                </div>

              </div>
            </div>

          </section>
        )
      }
    }
