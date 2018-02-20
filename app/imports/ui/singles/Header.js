import React, { Component } from 'react';
import axios from 'axios'


// Header component - represents the main header of the Dapp
export default class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {value: ''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();

        try {
            web3.eth.getTransaction(this.state.value).then((tx) => {
                if (tx && tx.hash) FlowRouter.go('/txns/'+tx.hash);
                return true;
            }).catch((err) => {}).then();

            web3.eth.getBlock(this.state.value).then((block) => {
                if (block && block.number) FlowRouter.go('/blocks/'+block.number);
                return true;
            }).catch((err) => {}).then();

            axios.get(Meteor.settings.public.apiNetwork+'/accounts/' + this.state.value)
                .then(response => {
                    if (response && response.data && response.data.address) {
                        FlowRouter.go('/accounts/' + this.state.value)
                    }
                });
        } catch (e) {
            // We don't want this exception
        }

    }

    render() {
        return (
            <div className="container">
                <a className="navbar-brand" href="/">
                    <img src="/img/brand/logo.png" width="30" height="30" className="d-inline-block align-top" alt="Hotelbyte Explorer" />
                    Hotelbyte Explorer
                </a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                              <i className="fas fa-link" /> Blockchain
                            </a>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                              <a className="dropdown-item" href="/blocks"><i className="fas fa-cubes" /> Blocks</a>
                              <div className="dropdown-divider" />
                              <a className="dropdown-item" href="/txns"><i className="fas fa-list-ul" /> Transactions</a>
                            </div>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/accounts"><i className="fas fa-users" /> Accounts</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/pools"><i className="fab fa-superpowers" /> Pools</a>
                        </li>
                    </ul>
                    <form className="form-inline my-2 my-lg-2" onSubmit={this.handleSubmit}>
                        <input style={{width: 250+'px'}} value={this.state.value} onChange={this.handleChange} className="form-control mr-sm-2" type="search" placeholder="Account / Block hash / TX ID" aria-label="Search" />
                        <button className="btn btn-outline-info my-2 my-sm-0" type="submit">Search</button>
                    </form>
                    <a target="_blank" href="https://discord.gg/C2NxaJV" style={{marginLeft: 10+'px', color:"#17A2B8"}}><i className="fab fa-discord" />Community Support</a>
                </div>
            </div>
        );
      }
}

let pathFor = ( path, params ) => {
    let query = params && params.query ? FlowRouter._qs.parse( params.query ) : {};
    return FlowRouter.path( path, params, query );
};

let urlFor = ( path, params ) => {
    return Meteor.absoluteUrl( pathFor( path, params ) );
};

let currentRoute = ( route ) => {
    FlowRouter.watchPathChange();
    return FlowRouter.current().route.name === route ? 'active' : '';
};

FlowHelpers = {
    pathFor: pathFor,
    urlFor: urlFor,
    currentRoute: currentRoute
};