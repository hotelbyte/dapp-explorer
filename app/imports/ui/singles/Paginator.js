import React, { Component } from 'react';
import BigNumber from "bignumber.js/bignumber";

// Paginator component - represents a single paginator
export default class Paginator extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <nav aria-label="Page navigation example">
                <ul className="pagination justify-content-end">
                    <li className={this.props.prevEnabled ? 'page-item' : 'page-item disabled'}>
                        <a className="page-link" href="#" tabIndex="-1" onClick={(e) => this.props.prev(e, this.props._this)}>Previous</a>
                    </li>
                    <li className={this.props.nextEnabled ? 'page-item' : 'page-item disabled'}>
                        <a className="page-link" href="#" onClick={(e) => this.props.next(e, this.props._this)}>Next</a>
                    </li>
                </ul>
            </nav>
        );
    }
}