require('../css/styles.less')

import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

import {App} from './app';
import {Clock} from './clock';
import {NumberList} from './numberlist';
import {NameForm} from './nameform';


console.log("init");

class User extends React.Component {
}

const shell = require('electron').shell;

// override external links to open in browser
$(document).on('click', 'a[href^="http"]', function(event) {
    event.preventDefault();
    shell.openExternal(this.href);
});

ReactDOM.render(
    <App />,
    document.getElementById('root')
);

//
// const numbers = [1, 2, 3, 4, 5];
// ReactDOM.render(
//     <NumberList numbers={numbers} />,
//     document.getElementById('numbers')
// );
//
// ReactDOM.render(
//     <Clock />,
//     document.getElementById('root')
// );
//
// ReactDOM.render(
//     <NameForm />,
//     document.getElementById('whatever')
// );
