import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

import {App} from './js/app';
import {Clock} from './js/clock';
import {NumberList} from './js/numberlist';
import {NameForm} from './js/nameform';
import {notify} from './js/notify';

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


notify("hello world")

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
