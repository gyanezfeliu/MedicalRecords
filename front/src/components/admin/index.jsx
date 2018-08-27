import React, { Component } from 'react';

import 'whatwg-fetch';
import TruffleContract from 'truffle-contract';

var Web3 = require('web3');
var web3Provider = new Web3.providers.HttpProvider('http://localhost:8545');
var web3 = new Web3(web3Provider);

export default class Admin extends Component {
  constructor(props){
    super(props)
    this.onProvider = this.onProvider.bind(this)
    this.onRequest = this.onRequest.bind(this)
  }

  state = {
    provider: '',
    withRegister: false,
  }

  onProvider(e){
    this.setState({provider: e.target.value})
  }

  onRequest(_this){
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

          // var addr_rce = "0x2BFa558A179A29a9C95E37fca1B2ad5226A53A8c";

          mint.includeNewRCE(_this.state.provider, {from: account, gas: 30000000}).then((result)=>{
            console.log("Result includeNewRCE", result);
            _this.setState({withRegister: result});
          })
          .catch((e)=>{
            console.log("Error includeNewRCE", e);
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
            <p className="modal-card-title">Registrar Prestador</p>
            <button className="delete" aria-label="close" onClick={(e)=>{
                this.props.onHide()
              }} ></button>
            </header>
            <section className="modal-card-body">
              { (!this.state.withRegister) ?
                <div className="field">
                  <p className="control has-icons-left has-icons-right">
                    <input className="input" type="email" placeholder="Prestador"
                      value={this.state.provider} onChange={this.onProvider}/>
                    <span className="icon is-small is-left">
                      <i className="far fa-id-card"></i>
                    </span>
                    <span className="icon is-small is-right">
                      <i className="fas fa-check"></i>
                    </span>
                  </p>
                </div>
                :
                <p>Se ha registrado al Prestador</p>
              }
            </section>
            <footer className="modal-card-foot">
              { !this.state.withRegister &&  <button className="button" onClick={(e)=>{
                this.onRequest(this)
              }}>Registrar Prestador</button>
            }
            <button className="button" onClick={(e)=>{
                this.props.onHide()
              }}>Cerrar</button>
            </footer>
          </div>
        </div>
      );
    }
  }
