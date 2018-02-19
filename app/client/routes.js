import React from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { mount, withOptions } from 'react-mounter';

import App from '../imports/ui/App.js';
import HomeView from '../imports/ui/views/HomeView';
import BlocksView from '../imports/ui/views/BlocksView';
import BlockView from '../imports/ui/views/BlockView';
import TransactionsView from '../imports/ui/views/TransactionsView';
import TransactionView from '../imports/ui/views/TransactionView';
import AccountsView from '../imports/ui/views/AccountsView';
import AccountView from '../imports/ui/views/AccountView';
import PoolsView from '../imports/ui/views/PoolsView';

const mountWithOpts = withOptions({ rootId: 'render-main' }, mount);

FlowRouter.route('/', {
    name: 'Home.show',
    action() {
        mountWithOpts(App, {
            main: <HomeView key="HomeView"/>,
        });
    },
});

/**
 * Blocks
 */
FlowRouter.route('/blocks', {
    name: 'Blocks.show',
    action() {
        mountWithOpts(App, {
		    main: <BlocksView key="BlocksView" />,
        });
    },
});

FlowRouter.route('/blocks/:block', {
    name: 'Block.show',
    action(params, queryParams) {
        mountWithOpts(App, {
            main: <BlockView key="BlockView" block={params.block}/>,
        });
    },
});

/**
 * Transactions
 */
FlowRouter.route('/txns', {
    name: 'Transactions.show',
    action() {
        mountWithOpts(App, {
            main: <TransactionsView key="TransactionsView" />,
        });
    },
});

FlowRouter.route('/txns/:tx', {
    name: 'Transaction.show',
    action(params, queryParams) {
        mountWithOpts(App, {
            main: <TransactionView key="TransactionView" tx={params.tx} />,
        });
    },
});

/**
 * Accounts
 */
FlowRouter.route('/accounts', {
    name: 'Accounts.show',
    action() {
        mountWithOpts(App, {
            main: <AccountsView key="AccountsView" />,
        });
    },
});

FlowRouter.route('/accounts/:address', {
    name: 'Account.show',
    action(params, queryParams) {
        mountWithOpts(App, {
            main: <AccountView key="AccountView" accountHash={params.address} />,
        });
    },
});

/**
 * Pools
 */
FlowRouter.route('/pools', {
    name: 'Pools.show',
    action() {
        mountWithOpts(App, {
            main: <PoolsView key="PoolsView" />,
        });
    },
});