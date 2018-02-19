import React, { Component } from 'react';

// Info view - represents /info
export default class InfoView extends Component {

    render() {
        return (
            <div className="list-group">
                Time per block: 13s
                Algorithm: Dagger (Ethash)
                Max Supply: Not max supply for now like Ethereum.
            </div>
        );
    }
}