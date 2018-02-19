
import Web3 from 'web3';

if(typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
} else {
    if (typeof dhi !== 'undefined') {
        web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:30199"));
    } else {
        web3 = new Web3(new Web3.providers.HttpProvider(Meteor.settings.public.apiExplorer));
    }
}