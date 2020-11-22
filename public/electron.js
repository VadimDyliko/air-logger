const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require("path");
const isDev = require("electron-is-dev");
require("./server")
let mainWindow;
function createWindow() {
    mainWindow = new BrowserWindow({ width: 400, height: 1000 });

    mainWindow.loadURL(
        isDev
            ? "http://localhost:3000"
            : `http://localhost:4000/ui`
    );
    mainWindow.webContents.openDevTools()
    mainWindow.on("closed", () => (mainWindow = null));
}
app.on("ready", createWindow);
app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});
app.on("activate", () => {
    if (mainWindow === null) {
        createWindow();
    }
});
