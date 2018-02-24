import React, { Component } from 'react';

// DappNews component - represents the main news of the Dapp
export default class News extends Component {
  render() {
    return (
        <div className="container">
            <div className="row">
                <div className="col-md">
                    <div className="card text-center">
                        <div className="card-header">News</div>
                        <div className="card-body news-content">
                            <h5 className="card-title">Ready the first exchange!</h5>
                            <p className="card-text">We are on <a href="https://stocks.exchange/trade/HBF/LTC">stocks.exchange</a>, buy and hold, think one day you can booking a hotel suite!</p>
                            <a href="https://stocks.exchange/trade/HBF/LTC" className="btn btn-info">Buy HBF</a>
                            &nbsp; or &nbsp;
                            <a target="_blank" className="btn btn-info donate-with-crypto"
                               href="https://commerce.coinbase.com/checkout/dc7f8be4-723f-4b09-aac9-182086c0d1b8">
                                <span>Donate with Crypto</span>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="col-md">
                    <div className="card text-center">
                        <div className="card-header">Trading</div>
                        <div className="card-body news-content">
                            <div className="coinlib-widget">
                                <iframe src="https://coinlib.io/widget?type=single&coin_id=583723&pref_coin_id=1505"
                                        height="150" scrolling="auto" marginWidth="0" marginHeight="0"
                                        frameBorder="0" />powered by&nbsp;<a href="https://coinlib.io" target="_blank">CoinLib</a>&nbsp;</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
  }
}