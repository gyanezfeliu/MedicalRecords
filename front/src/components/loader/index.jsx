import React, { Component } from 'react';

export default class Loader extends Component {

  render() {
    return (
      <section className="hero is-info is-fullheight">

        <div className="hero-body">
          <div className="container has-text-centered">

            <i className="fas fa-spinner"></i>


          </div>
        </div>

      </section>
    );
  }
}
