import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

import {App} from './js/app';
import {Clock} from './js/clock';
import {NumberList} from './js/numberlist';
import {NameForm} from './js/nameform';

console.log("init");

class User extends React.Component {
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);

Notification.requestPermission();
var notify = new Notification('title', { body: 'body', icon: 'img/original.png' });

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
