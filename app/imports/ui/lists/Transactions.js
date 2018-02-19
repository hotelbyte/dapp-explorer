import React, {Component} from 'react';
import ReactLoading from 'react-loading';

import Transaction from './items/Transaction';

// Transactions component - represents a list of tx
export default class Transactions extends Component {

    constructor(props) {
        super(props);
        if (this.props.txnsFilter) {
            this.state = {txns: this.props.txnsFilter};
        } else {
            this.state = {txns: []};
        }
    }

    componentDidMount() {
        // Simulate web3 1.0 subscriptions TODO use websocket
        if (!this.props.txnsFilter) {
            // First fire execution
            this.getTransactions();
            this.timerID = setInterval(
                () => this.getTransactions(),
                2500
            );
        }
    }

    componentWillUnmount() {
        if (this.timerID) {
            clearInterval(this.timerID);
        }
    }

    // Get latest transactions from the latest 10 blocks
    getTransactions() {

        let blocks = this.props.blocks;

        if (blocks && blocks.length > 0) {
            let txns = this.state.txns;
            let txnsNew = [];

            _.each(blocks, (block) => {
                _.each(block.transactions, (txHash) => {
                    if (txnsNew.length <= 10) {
                        // Unique push avoid duplication
                        let found = txns.filter((tx) => {
                            return tx.hash === txHash
                        });
                        if (found.length === 0) {
                            let tx = {hash: txHash, timestamp: new Date(block.timestamp * 1000)};
                            txnsNew.push(tx);
                        }
                    }
                });
            });

            if (txnsNew.length > 0) {
                txns = addToArray(txnsNew, txns);
                this.setState({txns: txns});
            }
        }
    }

    renderTransactions() {
        if (this.state.txns.length > 0) {
            return this.state.txns.map((tx) => (
                <Transaction key={tx.hash} txHash={tx.hash} timestamp={tx.timestamp} extended={this.props.extended}
                             minimal={this.props.minimal} txType={tx.sender} accountHistory={this.props.accountHistory}/>
            ))
        }

        if (this.props.txnsFilter && this.props.txnsFilter.length === 0) {
            return null;
        }
        return <ReactLoading type="bubbles" color="#2EDDE9" height='auto' width='100%'/>;
    }

    render() {
        return this.renderTransactions();
    }
}

addToArray = function (sourceArr, targetArr) {
    if (sourceArr.length === 10) {
        // new tx has 10
        return sourceArr;
    }

    targetArr.reverse();
    if (targetArr.length >= 10) {
        // Old tx has 10 so delete the old with the length of the new
        targetArr = targetArr.slice(sourceArr.length, 10);
    }

    // Original order
    targetArr.reverse();
    return sourceArr.concat(targetArr);
};