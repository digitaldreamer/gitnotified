const {app, ipcMain, globalShortcut, BrowserWindow} = require('electron');
const path = require('path')
const url = require('url')
const FULLSCREEN = false;

let fs = require('fs');
let settings = {};  // settings file
let configs = {'settings': {}};  // window-specific configs
let windows = [];

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

function createWindow () {
    // Create the browser window.
    win = new BrowserWindow({
        title: 'Git Notified',
        width: 800,
        height: 600,
        transparent: false,
        frame: true,
        toolbar: false,
        fullscreen: FULLSCREEN,
        kiosk: FULLSCREEN,
        'web-preferences': {
            webgl: true
        }
    });
    win.setAlwaysOnTop(true);

    // and load the index.html of the app.
    var index = settings.index || path.join(__dirname, 'index.html');
    console.log(index);
    win.loadURL(url.format({
        pathname: index,
        protocol: 'file:',
        slashes: true
    }));

    // Emitted when the window is closed.
    win.on('closed', () => {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        win = null
    })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
    // settings = getSettings();

    globalShortcut.register('CommandOrControl+X', () => {
        app.quit()
    });

    globalShortcut.register('CommandOrControl+I', () => {
        // Open the DevTools.
        win.webContents.openDevTools()
    });

    createWindow()
})

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }

    app.quit();
})

app.on('will-quit', () => {
    globalShortcut.unregister('CommandOrControl+X');
    globalShortcut.unregisterAll();
})

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
        createWindow()
    }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
function getSettings() {
    let filepath = app.getPath('home') + '/gitnotified/settings.json';
    let settings = fs.readFileSync(filepath, 'utf-8');

    console.log("settings: " + settings);
    return JSON.parse(settings);
}

ipcMain.on("getsettings", (event, arg) => {
    event.returnValue = settings;
})

ipcMain.on('asynchronous-message', (event, arg) => {
    console.log(arg);
    event.sender.send('asynchronous-reply', 'async pong');
});

ipcMain.on('quit', (event) => {
    app.quit();
});
