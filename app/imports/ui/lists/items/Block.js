import React, { Component } from 'react';
import Timestamp from 'react-timestamp';
import BigNumber from 'bignumber.js'

import {GetTxFees} from '../../../helpers/TransactionHelper';
import {CalculateRewards} from "../../../helpers/BlockHelper";
import {FormatNumber} from "../../../helpers/FormatHelper";

// Block component of a list of blocks this isn't a single block view
export default class Block extends Component {
    constructor(props) {
        super(props);
        this.state = {blockTo: {}, gasPrice: props.gasPrice, txGas: new BigNumber(0)};
    }

    componentDidMount() {
        // First fire execution
        return this.getBlock().then((done) => {return done});
    }

    getBlock() {
        return web3.eth.getBlock(this.props.blockNumber).then((block) => {
            this.setState({blockTo:block});
            this.props.onBlock(block);
            GetTxFees(this, block.transactions).then();
            return true;
        });
    }

    shouldComponentUpdate(nextProps, nextState) {
        // Don't check the networkHashRate and blockTime because it's more volatile
        if (nextState.blockTo.number === this.state.blockTo.number) {
            return false;
        }
        return true;
    }

	render() {
		let block = this.state.blockTo;
        let blockRow = <><div></div></>;
        if (block && block.miner) {
            if (this.props.extended) {
                blockRow = <>
                        <div className="row">
                            <div className="col-xs col-md col-lg-1"><a href={'/blocks/' + block.number}>{block.number}</a></div>
                            <div className="col-xs col-md col-lg"><a href={'/blocks/' + block.hash}>{block.hash.substr(0,15)}...</a></div>
                            <div className="col-xs col-md col-lg"><a href={'/accounts/' + block.miner}>{block.miner.substr(0,15)}...</a></div>
                            <div className="col-xs col-md col-lg"><Timestamp time={block.timestamp} autoUpdate /></div>
                            <div className="col-xs col-md col-lg">{block.transactions.length}</div>
                            <div className="col-xs col-md col-lg">{block.uncles.length}</div>
                            <div className="col-xs col-md col-lg">{block.gasUsed}</div>
                        </div>
                        <hr />
                    </>;
            } else {
                    blockRow = <>
                        <div className="row fade show">
                            <div className="col-lg smallerText">
                                <div className="row">
                                    <div className="col-xs"></div>
                                    <div className="col-lg">Block <a href={'/blocks/' + block.hash}>{block.number}</a></div>
                                    <div className="col-sm"><Timestamp time={block.timestamp} /></div>
                                </div>
                                <div className="row">
                                    <div className="col-xs"></div>
                                    <div className="col-lg">Mined by <a href={'/accounts/' + block.miner}>{block.miner.substr(0,15)}</a></div>
                                </div>
                                <div className="row">
                                    <div className="col-xs"></div>
                                    <div className="col-lg">{block.transactions.length} transactions and {block.uncles.length} Uncles</div>
                                    <div className="col-sm"><span className="badge badge-success">{FormatNumber(CalculateRewards(this, block), '0.0[000]')} HBF</span>
                                    </div>
                                </div>
                                <hr/>
                            </div>
                        </div>
                    </>;
            }
		}
    return (
        blockRow
    );
  }
}