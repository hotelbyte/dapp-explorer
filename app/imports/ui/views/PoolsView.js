import React, { Component } from 'react';

// Pools view - represents /pools
export default class PoolsView extends Component {

    render() {
        return (
            <div className="list-group">

                <p>Why keep mining with us? because your HBF rewards will be used to booking hotels, suites <i className="fas fa-bed" /> and more!</p>

                <a href="https://hbc.openminingpool.org" target="__blank" className="list-group-item list-group-item-action flex-column align-items-start">
                    <div className="d-flex w-100 justify-content-between">
                        <h5 className="mb-1">Official Hotelbyte Pool</h5>
                        <small></small>
                    </div>
                    <p className="mb-1"></p>
                    <small className="text-muted">This is our official pool :)</small>
                </a>
                <a href="http://hotelbyte.minerpool.net" target="__blank" className="list-group-item list-group-item-action flex-column align-items-start">
                    <div className="d-flex w-100 justify-content-between">
                        <h5 className="mb-1">MinerPool.net</h5>
                        <small className="text-muted"></small>
                    </div>
                    <small className="text-muted">Great pool and great community!</small>
                </a>
                <a href="http://hbc.luckypool.io" target="__blank" className="list-group-item list-group-item-action flex-column align-items-start">
                    <div className="d-flex w-100 justify-content-between">
                        <h5 className="mb-1">Luckypool.io</h5>
                        <small className="text-muted"></small>
                    </div>
                    <small className="text-muted">The first follower to us</small>
                </a>
                <a href="http://comining.io" target="__blank" className="list-group-item list-group-item-action flex-column align-items-start">
                    <div className="d-flex w-100 justify-content-between">
                        <h5 className="mb-1">Comining.io</h5>
                        <small className="text-muted"></small>
                    </div>
                    <small className="text-muted">Interesting pool with a combined mining</small>
                </a>
                <a href="http://solo-hbc.2zo.pw" target="__blank" className="list-group-item list-group-item-action flex-column align-items-start">
                    <div className="d-flex w-100 justify-content-between">
                        <h5 className="mb-1">Solo 2zo.pw</h5>
                        <small className="text-muted"></small>
                    </div>
                    <small className="text-muted">New!</small>
                </a>
            </div>
        );
    }
}