import React from 'react';
import ReactDOM from 'react-dom';

import {RepoList} from './pulls';
import {Ledgers} from './ledger'

const {ipcRenderer} = require('electron');

class Welcome extends React.Component {
    render() {
        return <h1>Hello, {this.props.name}!</h1>;
    }
}

export function App() {
    // <Welcome name="Chris" />
    let settings = ipcRenderer.sendSync('get-settings', 'settings');

    return (
        <div>
            <Ledgers repos={settings.repos} settings={settings} />
            <RepoList repos={settings.repos} settings={settings} />
        </div>
    );
}
