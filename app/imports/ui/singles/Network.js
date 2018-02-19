import React, { Component } from 'react';
import {FormatNumber} from "../../helpers/FormatHelper";
import BigNumber from 'bignumber.js'


// Network component - represents network main stats
export default class Network extends Component {

    constructor(props) {
        super(props);
        this.state = {networkDifficulty: "", blockTime: '', networkHashRate: ''};
    }

    componentDidMount() {
        // First fire execution
        this.calculateMainStats();
        // Simulates web3 1.0 subscriptions,
        // When we will use the subscribe methods remove me
        this.timerID = setInterval(
            () => this.calculateMainStats(),
            20000
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    shouldComponentUpdate(nextProps, nextState) {
        // Don't check the networkHashRate and blockTime because it's more volatile
        if (nextState.networkDifficulty === this.state.networkDifficulty) {
            return false;
        }
        return true;
    }

    calculateMainStats() {
        // TODO change with web3.eth.subscribe('newBlockHeaders' when we have websocket open
        web3.eth.getBlock('latest').then((lastBlock) => {
            if (lastBlock) {
                // TODO check uncle rewards, and commissions, add master node rewards in the future
                // 9 per block, 1 master node and 1 dev rewards = 11
                var totalSupplyApprox = 11 * lastBlock.number;
                let sampleBlockNumber = 10;
                let gDivisor = 1000000000;

                return web3.eth.getBlock(lastBlock.number-sampleBlockNumber).then((sampleBlock) => {
                    // No unit, we use G to show less numbers TODO create function to put G, T or P dynamically
                    var difficulty = new BigNumber(lastBlock.difficulty).plus(new BigNumber(sampleBlock.difficulty));
                    var networkDifficulty = difficulty.div(new BigNumber(2)).div(new BigNumber(gDivisor));
                    var blockTime = (lastBlock.timestamp - sampleBlock.timestamp) / sampleBlockNumber;

                    // Update main network stats
                    this.setState({
                        networkDifficulty: FormatNumber(networkDifficulty, '0.0[000]'),
                        blockTime: blockTime,
                        networkHashRate: FormatNumber(networkDifficulty.div(blockTime), '0.0[000]'),
                        totalSupply: FormatNumber(totalSupplyApprox, '0[000]')
                        //gasPrice: FormatNumber(web3.utils.fromWei('18000000000', 'gwei'), '0[000]')
                    });
                });
            }
        });
    }

    render() {
        return (
            <div className="card-group">
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">Difficulty</h5>
                        <p className="card-text">{this.state.networkDifficulty} G</p>
                        <p className="card-text"><small className="text-muted">Update each 20 seconds</small></p>
                    </div>
                </div>
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">Hashrate</h5>
                        <p className="card-text">{this.state.networkHashRate} GH/s</p>
                        <p className="card-text"><small className="text-muted">Difficulty divided by block time</small></p>
                    </div>
                </div>
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">Block time</h5>
                        <p className="card-text">{this.state.blockTime}s</p>
                        <p className="card-text"><small className="text-muted">Average between the last block and the last block minus 10</small></p>
                    </div>
                </div>
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">Total supply</h5>
                        <p className="card-text">{this.state.totalSupply} HBF</p>
                        <p className="card-text"><small className="text-muted">Approx. value without fees and uncles</small></p>
                    </div>
                </div>
            </div>
        );
    }
}