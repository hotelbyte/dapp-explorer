import React, { Component } from 'react';
import ReactLoading from 'react-loading';
import BigNumber from 'bignumber.js'

import Block from './items/Block';
import {StatePromise} from "../../helpers/ComponentHelper";
import {GetWeb3Proxy} from "../../helpers/Web3Helper";

// Block list component - represents a list of blocks
export default class Blocks extends Component {

    constructor(props) {
        super(props);
        this.state = {blocks: [], blocksObj: [], gasPrice: new BigNumber(0)};
        this.handleBlock = this.handleBlock.bind(this);
        this.storeGasPrice().then();
    }

    componentDidMount() {
        // First fire execution
        return this.getBlocks().then((done) => {
            // Simulates web3 1.0 subscriptions,
            // When we will use the subscribe methods remove me
            if (this.props.enableListener === true) {
                this.timerID = setInterval(
                    () => this.getBlocks(),
                    5000
                );
            }
            return done;
        });
    }

    async storeGasPrice() {
        const gasPriceValue = await GetWeb3Proxy().eth.getGasPrice();
        await StatePromise(this, {gasPrice: gasPriceValue})
    }

    componentWillUnmount() {
        if (this.timerID) clearInterval(this.timerID);
    }

    handleBlock(newBlock) {
        let blocksObj = this.state.blocksObj;
        if (blocksObj.length === 0) {
            blocksObj.push(newBlock);
        } else {
            let found = blocksObj.filter((block) => { return block.number === newBlock.number; });
            if (found.length === 0) {
                if (blocksObj.length < 10) {
                    blocksObj.push(newBlock);
                } else {
                    // Full list max 10
                    // Remove always one to one from the end
                    blocksObj.reverse();
                    blocksObj = blocksObj.slice(1,10);
                    blocksObj.push(newBlock);
                    // Original order
                    blocksObj.reverse();
                }
            }
        }
        this.setState({blocksObj:blocksObj});
        if (this.props.onBlocks) {
            this.props.onBlocks(blocksObj);
        }
    }

	getBlocks() {
        return web3.eth.getBlockNumber().then((blockNumber)=> {
            let blockNumbers = [];
            let max = blockNumber - 10;
            for (let i = blockNumber; i>max; i--) {
                blockNumbers.push({number:i});
            }
            this.setState({blocks:blockNumbers});
            return true;
        });
	}

	renderBlocks() {
        if (this.props.blocks && this.props.blocks.length > 0) {
            return this.props.blocks.map((block) => (
                <Block key={block.number} blockNumber={block.number} extended={this.props.extended} onBlock={this.handleBlock} gasPrice={this.state.gasPrice} />
            ));
        } else if (this.state.blocks.length > 0) {
            return this.state.blocks.map((block) => (
                <Block key={block.number} blockNumber={block.number} extended={this.props.extended} onBlock={this.handleBlock} gasPrice={this.state.gasPrice} />
            ));
        }
        return <ReactLoading type="bubbles" color="#2EDDE9" height='auto' width='100%' />;
    }

    render() {
        return this.renderBlocks();
	}
}