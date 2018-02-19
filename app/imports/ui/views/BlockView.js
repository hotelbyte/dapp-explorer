import React, {Component} from 'react';
import Time from 'react-time-format';
import BigNumber from 'bignumber.js'

import Transactions from '../lists/Transactions';
import BlockDetails from '../singles/BlockDetails';

import {GetWeb3Proxy} from '../../helpers/Web3Helper';
import {FormatNumber} from '../../helpers/FormatHelper';
import {StatePromise} from '../../helpers/ComponentHelper';
import {GetTxFees} from '../../helpers/TransactionHelper';
import {CalculateFees, CalculateRewards} from '../../helpers/BlockHelper';

// Block view - represents /block/:block
export default class BlockView extends Component {

    constructor(props) {
        super(props);
        this.state = {blockTo: {}, gasPrice: "0", txGas: new BigNumber(0)};
        this.getBlock();
    }

    async componentDidMount() {
        const gasPriceValue = await GetWeb3Proxy().eth.getGasPrice();
        await StatePromise(this, {gasPrice: gasPriceValue})
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (!this.state.blockTo.number || nextProps.block !== this.state.blockTo.number.toString()) {
            if (nextProps.block !== this.state.blockTo.hash) {
                this.getBlock();
                return true;
            }
        }
        return false;
    }

    getBlock() {
        return web3.eth.getBlock(this.props.block).then((block) => {
            this.setState({blockTo: block});
            GetTxFees(this, block.transactions).then();
            return true;
        });
    }

    /**
     * Prepare transaction list and add the block timestamp
     * @param txns
     * @param blockTimestamp
     * @returns {*}
     */
    renderTransactions(txns, blockTimestamp) {
        let txnsWithDate = [];
        _.each(txns, (tx) => {
            txnsWithDate.push({hash: tx, timestamp: new Date(blockTimestamp * 1000)})
        });

        let transactionView = null;
        if (txns && txns.length > 0) {
            transactionView = <Transactions txnsFilter={txnsWithDate} minimal={true}/>;
        }
        return (
            transactionView
        );
    }

    /**
     * Block details like bloom data
     * @param block
     * @returns {*}
     */
    renderBlockDetails(block) {
        return (
            <BlockDetails block={block}/>
        );
    }

    render() {
        let block = this.state.blockTo;
        let blockView = null;
        if (block && block.number) {
            blockView = <div className="card">
                <div className="card-header">
                    <h4>Block view - {block.number}</h4>
                </div>
                <div className="card-body">
                    <h5 className="card-title"/>
                    <div className="row">
                        <div className="col-xs-2 col-md-2 col-lg-2"><b>Hash</b></div>
                        <div className="col-xs col-md col-lg">{block.hash}</div>
                    </div>
                    <hr/>
                    <div className="row">
                        <div className="col-xs-2 col-md-2 col-lg-2"><b>Difficulty</b></div>
                        <div className="col-xs col-md col-lg">{block.difficulty}</div>
                    </div>
                    <hr/>
                    <div className="row">
                        <div className="col-xs-2 col-md-2 col-lg-2"><b>Miner</b></div>
                        <div className="col-xs col-md col-lg">{block.miner}</div>
                    </div>
                    <hr/>
                    <div className="row">
                        <div className="col-xs-2 col-md-2 col-lg-2"><b>Reward</b></div>
                        <div
                            className="col-xs col-md col-lg">{FormatNumber(CalculateRewards(this, block), '0.0[000]')} HBF
                            (9 HBF reward per block + Fee reward + Uncle inclusion reward)
                        </div>
                    </div>
                    <hr/>
                    <div className="row">
                        <div className="col-xs-2 col-md-2 col-lg-2"><b>Fees</b></div>
                        <div
                            className="col-xs col-md col-lg">{FormatNumber(CalculateFees(this, block.gasUsed), '0.00000[000]')} HBF
                        </div>
                    </div>
                    <hr/>
                    <div className="row">
                        <div className="col-xs-2 col-md-2 col-lg-2"><b>Tx / Uncles</b></div>
                        <div className="col-xs col-md col-lg">{block.transactions.length} transactions
                            / {block.uncles.length} uncles
                        </div>
                    </div>
                    <hr/>
                    <div className="row">
                        <div className="col-xs-2 col-md-2 col-lg-2"><b>Gas Limit</b></div>
                        <div className="col-xs col-md col-lg">{block.gasLimit}</div>
                    </div>
                    <hr/>
                    <div className="row">
                        <div className="col-xs-2 col-md-2 col-lg-2"><b>Gas Usage</b></div>
                        <div className="col-xs col-md col-lg">{block.gasUsed}</div>
                    </div>
                    <hr/>
                    <div className="row">
                        <div className="col-xs-2 col-md-2 col-lg-2"><b>Time</b></div>
                        <div className="col-xs col-md col-lg">
                            <Time value={new Date(block.timestamp * 1000)} format="YYYY-MM-DD hh:mm:ss"/>
                        </div>
                    </div>
                    <hr/>
                    <div className="row">
                        <div className="col-xs-2 col-md-2 col-lg-2"><b>Size</b></div>
                        <div className="col-xs col-md col-lg">{block.size}</div>
                    </div>
                    <hr/>
                    <div className="row">
                        <div className="col-xs-2 col-md-2 col-lg-2"><b>Extra</b></div>
                        <div className="col-xs col-md col-lg">{block.extraData}</div>
                    </div>
                    <hr/>
                    <ul className="nav nav-tabs" id="blockTab" role="tablist">
                        <li className="nav-item">
                            <a className="nav-link active" id="txns-tab" data-toggle="tab" href="#txns" role="tab"
                               aria-controls="txns" aria-selected="true">
                                {block.transactions.length + ' Transactions'}
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" id="details-tab" data-toggle="tab" href="#details" role="tab"
                               aria-controls="details" aria-selected="false">
                                Details
                            </a>
                        </li>
                    </ul>
                    <div className="tab-content" id="blockTabContent">
                        <div className="tab-pane fade show active" id="txns" role="tabpanel" aria-labelledby="txns-tab">
                            <div className="container top-margin">
                                <div className="row header">
                                    <div className="col-xs col-md col-lg-2">Hash</div>
                                    <div className="col-xs col-md col-lg-2">From</div>
                                    <div className="col-xs col-md col-lg">To</div>
                                    <div className="col-xs col-md col-lg">Value</div>
                                    <div className="col-xs col-md col-lg">Fee</div>
                                    <div className="col-xs col-md-4 col-lg-2">Block</div>
                                    <div className="col-xs col-md col-lg">Time</div>
                                </div>
                                {this.renderTransactions(block.transactions, block.timestamp)}
                            </div>
                        </div>
                        <div className="tab-pane fade" id="details" role="tabpanel" aria-labelledby="details-tab">
                            <div className="container top-margin">
                                {this.renderBlockDetails(block)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>;
        }
        return (
            blockView
        );
    }
}