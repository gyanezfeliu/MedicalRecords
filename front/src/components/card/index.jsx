import React, { Component } from 'react';

import 'whatwg-fetch';
import TruffleContract from 'truffle-contract';

var Web3 = require('web3');
var web3Provider = new Web3.providers.HttpProvider('http://localhost:8545');
var web3 = new Web3(web3Provider);

export default class Card extends Component {

  constructor(props){
    super(props)

    this.onPatient = this.onPatient.bind(this)
  }

  state = {
    patient: "",
  }

  onPatient(e){
    this.setState({patient: e.target.value})
  }

  onToken(){
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

          mint.StandardToken('RCEToken', 'RCE', 8, 10000, {from: account, gas: 30000000}).then((result)=>{
            console.log("Result StandardToken", result);
          })
          .catch((e)=>{
            console.log("Error StandardToken", e);
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

  render(){
    return(
      <div className="hero-body">
        <div className="container has-text-centered">
          <div className="columns">
            <div className="column">
              <h1 className="title">
                Ficha Clínica
              </h1>
            </div>
          </div>
          <div className="columns">
            <div className="column is-6">

              <div className="card">
                <div className="card-image">
                  <figure className="image is-4by3">
                    <img src="https://bulma.io/images/placeholders/128x128.png" alt="Imagen Principal" />
                  </figure>
                </div>
                <div className="card-content">
                  <div className="media">
                    <div className="media-left">
                      <figure className="image is-48x48">
                        <img src="https://bulma.io/images/placeholders/96x96.png" alt="Imagen Secundaria" />
                      </figure>
                    </div>
                    <div className="media-content">
                      <p className="title is-4">John Smith</p>
                      <p className="subtitle is-6">@johnsmith</p>
                    </div>
                  </div>

                  <div className="content">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Phasellus nec iaculis mauris. <a>@bulmaio</a>.
                    <a href="#data">#css</a> <a href="#accion">#responsive</a>
                    <br/>
                    <span>11:09 PM - 1 Jan 2016</span>
                  </div>
                </div>

                <footer className="card-footer">
                  <button className="button is-primary" onClick={this.onToken}>Generar Token</button>
                </footer>

              </div>

            </div>
          </div>

        </div>
      </div>
    )
  }
}
