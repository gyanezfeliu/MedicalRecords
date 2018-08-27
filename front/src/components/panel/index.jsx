import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Cookies from 'js-cookie';
import { Connect, SimpleSigner } from 'uport-connect'

import MenuHeader from '../menu'
import Card from '../card'

const RCE_APP = 'RCE-NET'

export default class Panel extends Component {

  constructor(props){
    super(props)

    this.onPatient = this.onPatient.bind(this)
  }

  state = {
    patient: "",
    addr: ""
  }

  onPatient(e){
    this.setState({patient: e.target.value})
  }

  render(){
    let _addr = this.state.addr || Cookies.get('rce-session-addr')
    return(
      <section className="hero is-info is-fullheight">

        <Router>
          <div>
            <MenuHeader onLogout={this.props.onLogout} loginUser={this.props.loginUser}/>
            <Route exact path="/" component={(props)=>{
                return (
                  (_addr) ?
                  <Card />
                  :
                  <div className="hero-body">
                    <div className="container has-text-centered">
                      <h1 className="title">
                        Acceso Ficha Médica
                      </h1>
                      <div className="field">
                        <p className="control has-icons-left has-icons-right">
                          <input className="input" type="email" placeholder="Paciente"
                            value={this.state.patient} onChange={this.onPatient}/>
                          <span className="icon is-small is-left">
                            <i className="far fa-id-card"></i>
                          </span>
                          <span className="icon is-small is-right">
                            <i className="fas fa-check"></i>
                          </span>
                        </p>
                      </div>
                      <div className="field">
                        <p className="control">
                          <button className="button is-success" onClick={(e)=>{
                              const uport = new Connect(RCE_APP, {
                                clientId: '2ojz6kbAWsVfVxFPr4EQT1p4mC1LeMnkRBX',
                                network: 'rinkeby',
                                signer: SimpleSigner('006a521241810e5a2219b1388ecd4d6dfe2c0494af4846b0f316f07bfc5c7d6f')
                              })

                              uport.requestCredentials({
                                requested: ['name'],
                                notifications: true
                              })
                              .then((credentials) => {
                                console.log("cred", credentials);
                                Cookies.set('rce-session-addr', credentials.address);
                                Cookies.set('rce-session-creds', credentials);
                                this.setState({addr: credentials.address});
                              })

                            }}>
                            Acceso seguro
                          </button>
                        </p>
                      </div>

                    </div>
                  </div>
                )
              }} />

            </div>
          </Router>

        </section>
      )
    }
  }
