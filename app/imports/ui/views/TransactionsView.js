import React, {Component} from 'react';

import Paginator from './../singles/Paginator';
import Transactions from "../lists/Transactions";

// Transactions view - represents /txns
export default class TransactionsView extends Component {

    constructor(props) {
        super(props);
        this.state = {blocks: []};
        getBlockSample(this).then();
    }

    renderPaginator() {
        return <Paginator key="txPaginator"/>;
    }

    renderTransactions() {
        return (
            <Transactions extended={true} blocks={this.state.blocks} minimal={true} txnsFilter={this.props.txnsFilter}
                          accountHistory={this.props.accountHistory}/>
        );
    }

    getBlocks() {
        return getBlockSample(this);
    }

    renderTransactionList() {
        let transactionsView = null;
        if (this.props.accountHistory) {
            transactionsView = <>
                <div className="row header">
                    <div className="col-xs col-md col-lg-3">Hash</div>
                    <div className="col-xs col-md col-lg-2">Tx type</div>
                    <div className="col-xs col-md col-lg">Value</div>
                    <div className="col-xs col-md col-lg">Fee</div>
                    <div className="col-xs col-md-4 col-lg">Block</div>
                </div>
            </>;
        } else {
            transactionsView = <>
                <h5>Use the search box in the top to find your transaction</h5>
                <div className="row header">
                    <div className="col-xs col-md col-lg-2">Hash</div>
                    <div className="col-xs col-md col-lg-2">From</div>
                    <div className="col-xs col-md col-lg">To</div>
                    <div className="col-xs col-md col-lg">Value</div>
                    <div className="col-xs col-md col-lg">Fee</div>
                    <div className="col-xs col-md-4 col-lg-2">Block</div>
                    <div className="col-xs col-md col-lg">Time</div>
                </div>
            </>;
        }
        return (
            <div key="txList" className="card">
                <div className="card-body">
                    <h3><i className="fas fa-list-ul"/> Transaction explorer</h3>
                    <hr/>
                    {transactionsView}
                    {this.renderTransactions()}
                </div>
            </div>
        );
    }

    render() {
        return (
            this.renderTransactionList()
        );
    }
}

const promisify = (inner) =>
    new Promise((resolve, reject) =>
        inner((err, res) => {
            if (err) {
                reject(err)
            }

            resolve(res);
        })
    );

// simple proxy to promisify the web3 api. It doesn't deal with edge cases like web3.eth.filter and contracts.
const proxiedWeb3Handler = {
    // override getter
    get: (target, name) => {
        const inner = target[name];
        if (inner instanceof Function) {
            // Return a function with the callback already set.
            return (...args) => promisify(cb => inner(...args, cb));
        } else if (typeof inner === 'object') {
            // wrap inner web3 stuff
            return new Proxy(inner, proxiedWeb3Handler);
        } else {
            return inner;
        }
    },
};

const proxiedWeb3 = new Proxy(web3, proxiedWeb3Handler);

async function getBlockSample(_this) {
    const lastBlock = await proxiedWeb3.eth.getBlockNumber();
    const max = lastBlock - 40;
    let txnCounter = 0;
    let blocks = [];
    for (let i = lastBlock; i > max; i--) {
        let block = await proxiedWeb3.eth.getBlock(i);
        if (block && block.transactions.length > 0 && txnCounter < 10) {
            blocks.push(block);
            txnCounter = txnCounter + block.transactions.length;
        }
    }
    _this.setState({blocks: blocks});
}
