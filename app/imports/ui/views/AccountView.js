import React, { Component } from 'react';
import TransactionsView from "./TransactionsView";
import axios from "axios/index";
import ReactLoading from 'react-loading';
import Time from 'react-time-format';
import {FormatNumber} from "../../helpers/FormatHelper";


// Account view - represents /accounts/:account
export default class AccountView extends Component {

    // TODO unify the logic
    constructor(props) {
        super(props);
        this.state = {account: undefined};
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.state.account) {
            return !(nextProps.accountHash === this.props.accountHash);
        }
        return true;
    }

    componentDidMount() {
        let account = web3.utils.toHex(this.props.accountHash)
        this.getAccount(account);
    }

    getAccount(account) {
        if (account) {
            axios.get(Meteor.settings.public.apiNetwork+'/accounts/' + account)
                .then(response => this.setState({account: response.data}));
        }
    }

    render() {
        let accountView = <ReactLoading type="bubbles" color="#2EDDE9" height='auto' width='100%' />;
        if (this.state.account && this.state.account.address) {
            let account = this.state.account;
            accountView = <>
                <div className="container">
                    <div className="row">
                        <div className="col-xs">
                            <div className="card" style={{}}>
                                <img className="card-img-top" src="/img/account.svg" alt="Account" />
                                <div className="card-body">
                                    <h5 className="card-title">{account.address.substr(0, 20)}...</h5>
                                    <p className="card-text">
                                        <span className="badge badge-primary">{FormatNumber(web3.utils.fromWei(account.amount, 'ether'), '0.0[00]')} HBF</span>
                                    </p>
                                    <p className="card-text">Blocks mined {account.blocksMined.length}</p>
                                    <p className="card-text">Transactions {account.transactions.length}</p>
                                    <p className="card-text">Type {account.type}</p>
                                    <p className="card-text">First seen <Time value={new Date(account.firstSeen*1000)} format="YYYY-MM-DD hh:mm:ss" /></p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg">
                            <TransactionsView txnsFilter={account.transactions} accountHistory={true} />
                        </div>
                    </div>
                </div>
            </>;
        }

        return (
            accountView
        );
    }
}