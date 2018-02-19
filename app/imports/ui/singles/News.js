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
		    <p className="card-text">The last week stocks.exchange was contact to us to start the testing phase,
				for now we are waiting to they team to fix some issues.
				We will provide to you more information asap when we have news about that.</p>
		    <a href="#" className="btn btn-primary">Coming soon trade HBF</a>
		  </div>
		</div>
    );
  }
}