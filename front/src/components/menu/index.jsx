import React, { Component } from 'react';

import Admin from '../admin'
import Patient from '../patient'
export default class MenuHeader extends Component {

  state = {
    menuOpen: false,
    is_active_admin: false,
    is_active_patient: false,
  }

  render() {
    let {loginUser} = this.props

    return (
      <div className="hero-head">
        <header className="navbar">
          <div className="container">
            <div className="navbar-brand">
              <a className="navbar-item">
                RCE-NET
              </a>
              <span className="navbar-burger burger" data-target="navApp" onClick={(e)=>{
                  this.setState({menuOpen: !this.state.menuOpen})
                }}>
                <span></span>
                <span></span>
                <span></span>
              </span>
            </div>
            <div id="navApp" className={`navbar-menu ${ this.state.menuOpen ? 'is-active' : ''}`}>
              <div className="navbar-end">
                <a className="navbar-item">
                  Home
                </a>
                <a className="navbar-item" onClick={(e)=>{
                    this.setState({is_active_admin: true})
                  }}>
                  Registro de Prestadores
                </a>
                <a className="navbar-item" onClick={(e)=>{
                    this.setState({is_active_patient: true})
                  }}>
                  Registro de Pacientes
                </a>
                { (loginUser) ?
                <span className="navbar-item">
                  <a className="button is-success is-inverted" onClick={this.props.onLogout}>
                    <span className="icon">
                      <i className="fas fa-sign-out-alt"></i>
                    </span>
                    <span>Salir</span>
                  </a>
                </span>
                :
                null
                }
              </div>
            </div>
          </div>
        </header>
        <Admin onHide={(e)=>{
            this.setState({is_active_admin: false})
          }}
          is_active={this.state.is_active_admin}
          />
        <Patient onHide={(e)=>{
            this.setState({is_active_patient: false})
          }}
          is_active={this.state.is_active_patient}
          />
      </div>
    );
  }
}
