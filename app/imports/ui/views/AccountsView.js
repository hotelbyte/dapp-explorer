import React, { Component } from 'react';

import Paginator from './../singles/Paginator';
import Accounts from "../lists/Accounts";
import axios from 'axios'

// Accounts view - represents /txns
export default class AccountsView extends Component {

    constructor(props) {
        super(props);
        // Assumption that we have already more than 10 accounts
        this.state = {total: 0, accounts: [], prevEnabled: false, nextEnabled: true, pageNumber:1};
        this.prev = this.prev.bind(this);
        this.next = this.next.bind(this);
    }

    componentDidMount() {
        this.getAccounts();
        this.getTotalAccounts();
    }

    getAccounts() {
        axios.get(Meteor.settings.public.apiNetwork+'/accounts/?page='+this.state.pageNumber+'&size=10')
            .then(response => this.setState({accounts: response.data.list}));
    }

    prev(e, _this) {
        if (e) e.preventDefault();
        let pageNumber = --_this.state.pageNumber;
        let prevEnabled = pageNumber > 1;
        _this.setState({pageNumber: pageNumber, prevEnabled: prevEnabled})
        _this.getAccounts(pageNumber)
    }

    next(e, _this) {
        if (e) e.preventDefault();
        let totalPages = _this.state.total / 10;
        let pageNumber = ++_this.state.pageNumber;
        let nextEnabled = totalPages > pageNumber;
        _this.setState({pageNumber: pageNumber, nextEnabled:nextEnabled, prevEnabled:true});
        _this.getAccounts(pageNumber)
    }

    renderPaginator() {
        return <Paginator key="addressPaginator" _this={this}
                          next={this.next} prev={this.prev}
                          nextEnabled={this.state.nextEnabled}
                          prevEnabled={this.state.prevEnabled} />;
    }

    getTotalAccounts() {
        axios.get(Meteor.settings.public.apiNetwork+'/accounts/total')
            .then(response => this.setState({total: response.data}));
    }

    renderAccounts() {
        return (
            <Accounts accounts={this.state.accounts}/>
        );
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextState.total !== this.state.total) {
            return true;
        }
        if (nextState.accounts.length === this.state.accounts.length) {
            let change = false;
            nextState.accounts.forEach(account => {
               this.state.accounts.forEach(accountO => {
                   change = account === accountO
               });
            });
            return !change;
        }
        return true;
    }

    renderAccountList() {
        return (
            <div key="accountList" className="card">
                <div className="card-body">
                    <h3>
                        <i className="fa fa-users" />  Accounts explorer
                    </h3>
                    <hr />
                    <small className="smallFloat">
                        <b>Total</b> <span className="badge badge-primary">{this.state.total}</span>
                    </small>
                    {this.renderPaginator()}
                    <div className="row header">
                        <div className="col-xs col-md col-lg-5 text-left">Address</div>
                        <div className="col-xs col-md col-lg-2">Type</div>
                        <div className="col-xs col-md col-lg text-left">Balance</div>
                    </div>
                    {this.renderAccounts()}
                </div>
            </div>
        );
    }

    render() {
        return (
            this.renderAccountList()
        );
    }
}