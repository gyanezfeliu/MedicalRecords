import React, { Component } from 'react';
import { Connect, SimpleSigner } from 'uport-connect'


import 'whatwg-fetch';
import TruffleContract from 'truffle-contract';

var Web3 = require('web3');
var web3Provider = new Web3.providers.HttpProvider('http://localhost:8545');
var web3 = new Web3(web3Provider);

const RCE_APP = 'RCE-NET'

export default class Patient extends Component {
  constructor(props){
    super(props)

    this.onPatient = this.onPatient.bind(this)
    this.onTokenPatient = this.onTokenPatient.bind(this)
  }

  state = {
    patient: '',
    withAddr: false,
    onMatch: false,
  }

  onPatient(e){
    this.setState({patient: e.target.value})
  }

  onTokenPatient(_this){
    fetch('./TokenMinter.json')
    .then(response => response.json())
    .then((data) => {
      let Minter = TruffleContract(data);
      Minter.setProvider(web3Provider);

      Minter.deployed().then(function(mint) {

        web3.eth.getAccounts(function(error, accounts) {
          if (error) {
            console.log(error);
          }

          var account = accounts[0];


          mint.includeNewUser(_this.state.patient, account, {from: account, gas: 30000000}).then((result)=>{
            console.log("Result includeNewUser", result);
            mint.rutToAdddress(_this.state.patient, {from: account, gas: 30000000}).then((result)=>{
              console.log("Result rutToAdddress", result);
              _this.setState({onMatch: result})
            })
            .catch((e)=>{
              console.log("Error rutToAdddress", e);
            })

          })
          .catch((e)=>{
            console.log("Error includeNewUser", e);
          });

        })

      })
      .catch((e)=>{
        console.log("Minter Error", e);
      })

    })
    .catch((e)=>{
      console.log("Error", e);
    })

  }

  render() {
    let _is_active = this.props.is_active

    return (
      <div className={`modal ${ _is_active ? 'is-active' : ''}`}>
        <div className="modal-background"></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Registrar Paciente</p>
            <button className="delete" aria-label="close" onClick={(e)=>{
                this.props.onHide()
              }} ></button>
            </header>
            <section className="modal-card-body">
              <div className="field">
                { this.state.onMatch ?
                  <p>Se ha registrado el paciente con el rut: {this.state.onMatch} y dirección: {this.state.withAddr}</p>
                  :
                  !this.state.withAddr ?
                  <button className="button is-primary" onClick={(e)=>{
                      const uport = new Connect(RCE_APP, {
                        clientId: '2ojz6kbAWsVfVxFPr4EQT1p4mC1LeMnkRBX',
                        network: 'rinkeby',
                        signer: SimpleSigner('006a521241810e5a2219b1388ecd4d6dfe2c0494af4846b0f316f07bfc5c7d6f')
                      })

                      uport.requestCredentials({
                        requested: ['name', 'address'],
                        notifications: true
                      })
                      .then((credentials) => {
                        console.log("cred", credentials);
                        this.setState({withAddr: credentials.address});
                      })

                    }}>
                    Acceder a Cuenta
                  </button>
                  :
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
                }
              </div>
            </section>
            {
            this.state.withAddr && <footer className="modal-card-foot">
              <button className="button" onClick={(e)=>{
                  this.onTokenPatient(this)
                }}>
                Registrar Paciente
              </button>
              <button className="button" onClick={(e)=>{
                  this.props.onHide()
                }}>
                Cerrar
              </button>
            </footer>
            }
          </div>
        </div>
      );
    }
  }
