import React, { Component } from 'react';

// Block details component
export default class BlockDetails extends Component {

    constructor(props) {
        super(props);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return !(nextProps.block.hash === this.props.block.hash);
    }

    render() {
        let block = this.props.block;
        let blockDetails = null;
        if (block && block.mixHash) {
            blockDetails =<>
                <div className="row fade show">
                    <div className="col-lg smallerText">
                        <div className="row">
                            <div className="col-xs col-md col-lg">Uncles Hash</div>
                            <div className="col-xs col-md col-lg">{block.sha3Uncles}</div>
                        </div>
                        <hr />
                        <div className="row">
                            <div className="col-xs col-md col-lg">Receipts Root Hash</div>
                            <div className="col-xs col-md col-lg">{block.receiptRoot}</div>
                        </div>
                        <hr />
                        <div className="row">
                            <div className="col-xs col-md col-lg">State Root Hash</div>
                            <div className="col-xs col-md col-lg">{block.stateRoot}</div>
                        </div>
                        <hr />
                        <div className="row">
                            <div className="col-xs col-md col-lg">Transactions Root</div>
                            <div className="col-xs col-md col-lg">{block.transactionsRoot}</div>
                        </div>
                        <hr />
                        <div className="row">
                            <div className="col-xs col-md col-lg">PoW Hash</div>
                            <div className="col-xs col-md col-lg">{block.mixHash}</div>
                        </div>
                        <hr />
                        <div className="row">
                            <div className="col-xs col-md col-lg">Bloom Data</div>
                            <div className="col-xs col-md col-lg">{block.logsBloom}</div>
                        </div>
                        <hr />
                    </div>
                </div>
            </>;
        }
        return (
            blockDetails
        );
    }
}