import React, { Component } from 'react';

import {StatePromise} from "../../helpers/ComponentHelper";
import {GetWeb3Proxy} from "../../helpers/Web3Helper";
import Paginator from './../singles/Paginator';
import Blocks from './../lists/Blocks';

// Blocks view - represents /blocks
export default class BlocksView extends Component {

    constructor(props) {
        super(props);
        this.state = {blocks: [], block: 0, next: false, prev: false, nextData: 0, prevData: 0};
    }

    componentDidMount() {
        this.lastBlock().then();
    }

    async lastBlock() {
        const lastBlock = await GetWeb3Proxy().eth.getBlockNumber();
        await StatePromise(this, {blocks: [], block: lastBlock, next: lastBlock > 10, nextData: lastBlock-10, prevData: lastBlock});
    }

    renderPaginator() {
        return this.state.block > 10 ? <Paginator key="blockPaginator" _this={this}
                                                  next={this.next} prev={this.prev}
                                                  nextEnabled={this.state.next}
                                                  prevEnabled={this.state.prev} /> : null;
    }

    renderBlocks() {
        return (
            <Blocks extended={true} enableListener={false} blocks={this.state.blocks}/>
        );
    }

    next(e, _this) {
        if (e) e.preventDefault();
        let prevData = _this.state.nextData;
        if (prevData > _this.state.block) {
            prevData = _this.state.block;
        }
        let nextData = prevData - 10;
        let next = nextData > 10;
        let prev = prevData > nextData;
        _this.setState({next:next, nextData:nextData, prev:prev, prevData:prevData});
        _this.updateBlockList(prevData, nextData);
    }

    prev(e, _this) {
        if (e) e.preventDefault();
        let nextData = _this.state.prevData;
        let prevData = _this.state.prevData+10;
        if (prevData > _this.state.block) {
            prevData = _this.state.block;
        }
        let next = nextData > 10;
        let prev = prevData < _this.state.block;
        _this.setState({next:next, nextData:nextData, prev:prev, prevData:prevData});
        _this.updateBlockList(prevData, nextData);

    }

    updateBlockList(blockNumber, max) {
        let blockNumbers = [];
        for (let i = blockNumber; i>max; i--) {
            blockNumbers.push({number:i});
        }
        this.setState({blocks:blockNumbers});
    }

    renderBlockList() {
        return (
            <div key="blockList" className="card">
                <div className="card-body">
                    <h3><i className="fas fa-cubes" />  Block explorer</h3>
                    <hr />
                    {this.renderPaginator()}
                    <div className="row header">
                        <div className="col-xs col-md col-lg-1">Block</div>
                        <div className="col-xs col-md-4 col-lg-2">Hash</div>
                        <div className="col-xs col-md col-lg">Miner</div>
                        <div className="col-xs col-md col-lg">Time</div>
                        <div className="col-xs col-md col-lg">#Tx</div>
                        <div className="col-xs col-md col-lg">#Uncles</div>
                        <div className="col-xs col-md col-lg">Gas Used</div>
                    </div>
                    {this.renderBlocks()}
                </div>
            </div>
        );
    }

    render() {
        return (
            this.renderBlockList()
        );
    }
}