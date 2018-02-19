import React, { Component } from 'react';
import axios from 'axios'
import {FormatNumber} from "../../../helpers/FormatHelper";

// Account component - represents a single account
export default class Account extends Component {

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
        this.getAccount(this.props.accountHash);
    }

    getAccount(account) {
        if (account) {
            axios.get(Meteor.settings.public.apiNetwork+'/accounts/' + account)
                .then(response => this.setState({account: response.data}));
        }
    }

	render() {
        let account = null;
        if (this.state.account) {
            account = <>
                <div className="row">
                    <div className="col-xs col-md col-lg-5 text-left"><a href={'/accounts/'+this.props.accountHash}>{this.props.accountHash}</a></div>
                    <div className="col-xs col-md col-lg-2">Account</div>
                    <div className="col-xs col-md col-lg text-left">
                        {FormatNumber(web3.utils.fromWei(this.state.account.amount,'ether'), '0.0[00]')} HBF
                    </div>
                </div>
                <hr />
            </>;
        }

        return (
    	    account
        );
  }
}