import React, { Component } from 'react';
import BigNumber from "bignumber.js/bignumber";

import {GetWeb3Proxy} from "../../helpers/Web3Helper";
import {FormatNumber} from "../../helpers/FormatHelper";
import {StatePromise} from "../../helpers/ComponentHelper";
import {CalculateFees} from "../../helpers/BlockHelper";
import {GetTxFees} from "../../helpers/TransactionHelper";


// Transaction view - represents /txns/:tx
export default class TransactionView extends Component {

    constructor(props) {
        super(props);
        this.state = {txTo: {}, gasPrice: "0", txGas: new BigNumber(0), receipt: {}, lastBlockNumber: 0};
        this.getTransaction();
    }

    async componentDidMount() {
        const gasPriceValue = await GetWeb3Proxy().eth.getGasPrice();
        await StatePromise(this, {gasPrice: gasPriceValue});

        // First fire execution
        return this.isPending().then((done) => {
            // Simulates web3 1.0 subscriptions,
            // When we will use the subscribe methods remove me
            this.timerID = setInterval(
                () => this.isPending(),
                5000
            );
            return done;
        });

    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    getTransaction() {
        return web3.eth.getTransaction(this.props.tx).then((tx) => {
            this.setState({txTo:tx});
            // Array of one element only to keep reusable the GetTxFees function
            let txArr = [];
            txArr.push(tx.hash);
            GetTxFees(this, txArr).then();
            return true;
        });
    }

    async isPending() {

        const lastBlock = await GetWeb3Proxy().eth.getBlockNumber();
        await StatePromise(this, {lastBlockNumber:lastBlock});

        if (this.state.txTo && this.state.txTo.hash) {
            const txReceipt = await GetWeb3Proxy().eth.getTransactionReceipt(this.state.txTo.hash);
            await StatePromise(this, {receipt: txReceipt});
        }
        return true;
    }

    renderPending(tx) {
        let receiptData = <>
            <div className="row">
                <div className="col-xs-2 col-md-2 col-lg-2"><b>Block</b></div>
                <div className="col-xs col-md col-lg"><span className="badge badge-warning">Pending transaction...</span></div>
            </div>
        </>;

        if (this.state.receipt && this.state.receipt.transactionHash) {
            // Transaction confirmed
            let receipt = this.state.receipt;
            let success = receipt.status === "0x1" ? 'Success' : 'With errors';
            let contract = receipt.contractAddress === null ? 'Transaction' : 'Contract';
            let confirmations = this.state.lastBlockNumber - this.state.txTo.blockNumber;
            receiptData = <>
                <div className="row">
                    <div className="col-xs-2 col-md-2 col-lg-2"><b>Block</b></div>
                    <div className="col-xs col-md col-lg">
                        <a href={'/blocks/' + tx.blockNumber} title={tx.blockHash}>{tx.blockNumber} / {confirmations} Confirmations</a>
                    </div>
                </div>
                <hr />
                <div className="row">
                    <div className="col-xs-2 col-md-2 col-lg-2"><b>Status</b></div>
                    <div className="col-xs col-md col-lg"><span className={receipt.status === '0x1' ? 'badge badge-success' : 'badge badge-danger'}><i className="fas fa-check" /> Confirmed & {success}</span></div>
                </div>
                <hr />
                <div className="row">
                    <div className="col-xs-2 col-md-2 col-lg-2"><b>Type</b></div>
                    <div className="col-xs col-md col-lg">{contract}</div>
                </div>
                <hr />
            </>;
        }
        return receiptData;
    }

    render() {
        let tx = this.state.txTo;
        let transactionView = null;
        if (tx && tx.hash) {
            transactionView = <div className="card">
                <div className="card-header">
                    <h4>Transaction view - {tx.hash}</h4>
                </div>
                <div className="card-body">
                    <h5 className="card-title" />
                    {this.renderPending(tx)}
                    <div className="row">
                        <div className="col-xs-2 col-md-2 col-lg-2"><b>Amount</b></div>
                        <div className="col-xs col-md col-lg">{FormatNumber(web3.utils.fromWei(tx.value,'ether'), '0.0[000]')} HBF</div>
                    </div>
                    <hr />
                    <div className="row">
                        <div className="col-xs-2 col-md-2 col-lg-2"><b>From</b></div>
                        <div className="col-xs col-md col-lg"><a href={'/accounts/' + tx.from} title={'From'}>{tx.from}</a></div>
                    </div>
                    <hr />
                    <div className="row">
                        <div className="col-xs-2 col-md-2 col-lg-2"><b>To</b></div>
                        <div className="col-xs col-md col-lg"><a href={'/accounts/' + tx.to} title={'To'}>{tx.to}</a></div>
                    </div>
                    <hr />
                    <div className="row">
                        <div className="col-xs-2 col-md-2 col-lg-2"><b>Fees</b></div>
                        <div className="col-xs col-md col-lg">{FormatNumber(CalculateFees(this, tx.gas), '0.00000[000]')} HBF</div>
                    </div>
                    <hr />
                    <div className="row">
                        <div className="col-xs-2 col-md-2 col-lg-2"><b>Gas Used</b></div>
                        <div className="col-xs col-md col-lg">{tx.gas}</div>
                    </div>
                    <hr />
                    <div className="row">
                        <div className="col-xs-2 col-md-2 col-lg-2"><b>Gas Price</b></div>
                        <div className="col-xs col-md col-lg">{FormatNumber(web3.utils.fromWei(this.state.gasPrice,'gwei'), '0.00[000]')} GWEI</div>
                    </div>
                    <hr />
                    <div className="row">
                        <div className="col-xs-2 col-md-2 col-lg-2"><b>Input</b></div>
                        <div className="col-xs col-md col-lg">{tx.input}</div>
                    </div>
                </div>
            </div>;
        }
        return (
            transactionView
        );
    }
}