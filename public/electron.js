const electron = require('electron');

const { ipcMain } = require('electron');
const Store = require('electron-store');
const store = new Store();
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const isDev = require('electron-is-dev');
const initServer = require('./server');
const windowStateKeeper = require('electron-window-state');

let mainWindow;

app.on('ready', createWindow);
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});

async function createWindow() {
    ipcMain.handle('getStoreValue', (event, key) => {
        return store.get(key);
    });

    ipcMain.handle('setStoreValue', (event, key, value) => {
        return store.set(key, value);
    });

    let mainWindowState = windowStateKeeper({
        defaultWidth: 640,
        defaultHeight: 480,
    });

    const { PORT } = await store.get('SETTINGS');
    initServer(PORT);

    mainWindow = new BrowserWindow({
        x: mainWindowState.x,
        y: mainWindowState.y,
        width: mainWindowState.width,
        height: mainWindowState.height,
        webPreferences: {
            nodeIntegration: true,
        },
    });
    mainWindowState.manage(mainWindow);

    await mainWindow.loadURL(
        isDev ? 'http://localhost:3000' : `http://localhost:${PORT || 4000}/ui`
    );
    mainWindow.webContents.openDevTools();
    mainWindow.on('closed', () => (mainWindow = null));
}
