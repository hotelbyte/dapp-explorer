import React, { Component } from 'react';

// DappNews component - represents the main news of the Dapp
export default class News extends Component {
  render() {
    return (
		<div className="card text-center">
		  <div className="card-header">
		    News
		  </div>
		  <div className="card-body">
		    <h5 className="card-title">Expecting the First Exchange!</h5>
		    <p className="card-text">We are on <a href="https://stocks.exchange/trade/HBF/LTC">stocks.exchange</a>, buy hold, think one day you can booking a hotel suite!</p>
		    <a href="https://stocks.exchange/trade/HBF/LTC" className="btn btn-primary">Buy HBF</a>
		  </div>
		</div>
    );
  }
}