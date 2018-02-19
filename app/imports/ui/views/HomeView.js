import React, { Component } from 'react';

import Blocks from './../lists/Blocks.js';
import Transactions from './../lists/Transactions.js';
import News from '../singles/News.js';
import Network from '../singles/Network.js';

// HomeView view component - represents the main page of the site on /
export default class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {blocks: []};
        this.handleBlocks = this.handleBlocks.bind(this);
    }

    handleBlocks(blocks) {
        this.setState({blocks: blocks});
    }

    renderNews() {
        return (
            <News key="news" />
        );
    }

    renderNetwork() {
        return (
            <Network key="networkInfo" />
        );
    }

    renderBlocks() {
        return (
            <Blocks key="homeBlockList" onBlocks={this.handleBlocks} enableListener={true} />
        );
    }

    renderTransactions() {
        return (
            <Transactions key="homeTransactionList" blocks={this.state.blocks} />
        );
    }

    render() {
        return (
            <div key="1" className="container">
                {this.renderNews()}
                <hr />
                {this.renderNetwork()}
                <hr />
                <div className="row">
                    <div className="col-md">
                        <div className="card">
                            <div className="card-header">
                                <i className="fas fa-cubes"></i> Blocks
                            </div>
                            <div className="card-body">
                                <h5 className="card-title"></h5>
                                {this.renderBlocks()}
                            </div>
                        </div>
                    </div>
                    <div className="col-md">
                        <div className="card">
                            <div className="card-header">
                                <i className="fas fa-list-ul"></i> Transactions
                            </div>
                            <div className="card-body">
                                <h5 className="card-title"></h5>
                                {this.renderTransactions()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}