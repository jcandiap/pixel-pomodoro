const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');

function createMainWindow() {
    const mainWindow = new BrowserWindow({
        title: "Pixel Pomodoro",
        width: 400,
        height: 400,
    });

    const startUrl = url.format({
        pathname: path.join(__dirname, '../dist/index.html'),
        protocol: 'file:',
        slashes: true
    });

    mainWindow.loadURL(startUrl);
}

app.whenReady().then(createMainWindow);