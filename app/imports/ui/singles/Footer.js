import React, { Component } from 'react';

// Footer component - represents the footer of the Dapp
export default class Footer extends Component {
  render() {
    return (
        <p>© <a target="_blank" href="https://hotelbyte.org">Hotelbyte Foundation</a> 2018 All rights reserved. |
            Powered by <a target="_blank" href="https://github.com/hotelbyte/network-api">Hotelbyte Network API</a> | <a target="_blank" href="https://twitter.com/hotelbyte"><i className="fab fa-twitter" />Follow us on Twitter!</a>
        </p>
    );
  }
}