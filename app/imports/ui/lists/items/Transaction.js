import React, {Component} from 'react';
import {FormatNumber} from "../../../helpers/FormatHelper";
import Timestamp from 'react-timestamp';
import Time from 'react-time-format';
import numberToBN from 'number-to-bn'

// Transaction component - represents a single tx item
export default class Transaction extends Component {

    constructor(props) {
        super(props);
        this.state = {txTo: {}};
    }

    componentDidMount() {
        // First fire execution
        return this.getTransaction().then((done) => {
            return done
        });
    }

    shouldComponentUpdate(nextProps, nextState) {
        // Don't check the networkHashRate and blockTime because it's more volatile
        if (nextState.txTo.hash === this.state.txTo.hash) {
            return false;
        }
        return true;
    }

    getTransaction() {
        return web3.eth.getTransaction(this.props.txHash).then((tx) => {
            this.setState({txTo: tx});
            return true;
        });
    }

    calculateFee(tx) {
        return numberToBN(tx.gasPrice * tx.gas);
    }

    render() {

        let tx = this.state.txTo;
        let transactionRow = <>
            <div/>
        </>;

        if (tx && tx.hash) {
            if (this.props.accountHistory) {
                let txTypeDesc = "From " + tx.from + " to " + tx.to;
                let txType = <span className="badge badge-warning">IN</span>;
                if (this.props.txType) {
                    txType = <span className="badge badge-warning">OUT</span>;
                }
                transactionRow = <>
                    <div className="row">
                        <div className="col-xs col-md col-lg-3">
                            <a href={'/txns/' + tx.hash}>{tx.hash.substr(0, 15)}...</a>
                        </div>
                        <div className="col-xs col-md col-lg">
                            <a href={'/accounts/' + tx.from} title={txTypeDesc}>{txType}</a></div>
                        <div className="col-xs col-md col-lg">
                            <span
                                className="badge badge-success">{FormatNumber(web3.utils.fromWei(tx.value), '0.0[000]')} HBF</span>
                        </div>
                        <div className="col-xs col-md col-lg">
                            <span
                                className="badge badge-info">{FormatNumber(web3.utils.fromWei(this.calculateFee(tx)), '0.0[000]')} HBF</span>
                        </div>
                        <div className="col-xs col-md col-lg">
                            <a href={'/blocks/' + tx.blockHash}>{tx.blockNumber}</a>
                        </div>
                    </div>
                    <hr/>
                </>;
            } else if (this.props.minimal) {
                transactionRow = <>
                    <div className="row">
                        <div className="col-xs col-md col-lg-2"><a
                            href={'/txns/' + tx.hash}>{tx.hash.substr(0, 15)}...</a></div>
                        <div className="col-xs col-md col-lg"><a href={'/accounts/' + tx.from}
                                                                 title={'From'}>{tx.from.substr(0, 10)}...</a></div>
                        <div className="col-xs col-md col-lg"><a href={'/accounts/' + tx.to}
                                                                 title={'To'}>{tx.to.substr(0, 10)}...</a></div>
                        <div className="col-xs col-md col-lg">
                            <span
                                className="badge badge-success">{FormatNumber(web3.utils.fromWei(tx.value), '0.0[000]')} HBF</span>
                        </div>
                        <div className="col-xs col-md col-lg">
                            <span
                                className="badge badge-info">{FormatNumber(web3.utils.fromWei(this.calculateFee(tx)), '0.0[000]')} HBF</span>
                        </div>
                        <div className="col-xs col-md col-lg">
                            <a href={'/blocks/' + tx.blockHash}>{tx.blockNumber}</a>
                        </div>
                        <div className="col-xs col-md col-lg-2">
                            <Time value={this.props.timestamp} format="YYYY-MM-DD hh:mm:ss"/>
                        </div>
                    </div>
                    <hr/>
                </>;
            } else if (this.props.extended) {
                transactionRow = <>
                    <div className="row">
                        <div className="col-xs col-md col-lg"><a
                            href={'/txns/' + tx.hash}>{tx.hash.substr(0, 25)}...</a></div>
                        <div className="col-xs col-md col-lg"><a href="/blocks/5124895">5124895</a></div>
                        <div className="col-xs col-md col-lg"><a href={'/accounts/' + tx.from}
                                                                 title={'From'}>{tx.from.substr(0, 10)}...</a></div>
                        <div className="col-xs col-md col-lg"><a href={'/accounts/' + tx.to}
                                                                 title={'To'}>{tx.to.substr(0, 10)}...</a></div>
                        <div className="col-xs col-md col-lg">
                            <span
                                className="badge badge-success">{FormatNumber(web3.utils.fromWei(tx.value), '0.0[000]')} HBF</span>
                        </div>
                        <div className="col-xs col-md col-lg">0.07901057 HBF</div>
                        <div className="col-xs col-md col-lg"><Timestamp/></div>
                    </div>
                    <hr/>
                </>;
            } else {
                transactionRow = <>
                    <div className="row fade show">
                        <div className="col-lg smallerText">
                            <div className="row">
                                <div className="col-xs"></div>
                                <div className="col-lg">Tx <a href={'/txns/' + tx.hash}>{tx.hash.substr(0, 25)}...</a>
                                </div>
                                <div className="col-sm"><Timestamp/></div>
                            </div>
                            <div className="row">
                                <div className="col-xs"></div>
                                <div className="col-lg">
                                    <a href={'/accounts/' + tx.from} title={'From'}>{tx.from.substr(0, 10)}...</a>
                                    <i className="fas fa-angle-double-right"></i><a href={'/accounts/' + tx.to}
                                                                                    title={'To'}>{tx.to.substr(0, 10)}...</a>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-xs"></div>
                                <div className="col-lg"></div>
                                <div className="col-sm">
                                    <span
                                        className="badge badge-success">{FormatNumber(web3.utils.fromWei(tx.value), '0.0[000]')} HBF</span>
                                </div>
                            </div>
                            <hr/>
                        </div>
                    </div>
                </>;
            }
        }

        return (
            transactionRow
        );
    }
}