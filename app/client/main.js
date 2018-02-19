import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

// Styles
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import 'bootstrap';
 
import App from '../imports/ui/App.js';
import Header from '../imports/ui/singles/Header.js';
import Footer from "../imports/ui/singles/Footer";

Meteor.startup(() => {
    render(<Header />, document.getElementById('render-header'));
    render(<App />, document.getElementById('render-main'));
    render(<Footer />, document.getElementById('render-footer'));
});
