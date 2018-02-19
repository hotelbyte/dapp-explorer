import React, { Component } from 'react';
 
import Account from './items/Account';
import ReactLoading from 'react-loading';


// Account list component
export default class Accounts extends Component {

    renderAccounts() {
        if (this.props.accounts && this.props.accounts.length > 0) {
            return this.props.accounts.map((account) => (
                <Account key={account} accountHash={account} />
            ));
        }
        return <ReactLoading type="bubbles" color="#2EDDE9" height='auto' width='100%' />;
    }

    render() {
        return(
            this.renderAccounts()
        )
    }
}