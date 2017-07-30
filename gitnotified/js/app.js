import React from 'react';
import ReactDOM from 'react-dom';

import {RepoList} from './pulls';
import {Ledgers} from './ledger'

const {ipcRenderer} = require('electron');


export function App(props) {
    let settings = ipcRenderer.sendSync('get-settings', 'settings');

    return (
        <div>
            <Ledgers repos={settings.repos} settings={settings} />
            <RepoList repos={settings.repos} settings={settings} />
        </div>
    );
}
