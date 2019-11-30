'use strict'

import { app, protocol, BrowserWindow, Tray, nativeImage, Menu } from 'electron'
import {
  createProtocol,
} from 'vue-cli-plugin-electron-builder/lib'


const isDevelopment = process.env.NODE_ENV !== 'production'
const path = require('path')
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win
let tray
const image = nativeImage.createFromPath(path.join(__static, 'assets/crystal1024.png'))

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([{scheme: 'app', privileges: { secure: true, standard: true } }])

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({ width: 1200, height: 500, frame: false, title: 'Promethium Light Wallet', 
    resizable: false, webPreferences: {
    nodeIntegration: true
  } })
  

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
   
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    win.loadURL('app://./index.html')
    
  }

  win.on('closed', () => {
    win = null
  })
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    // Devtools extensions are broken in Electron 6.0.0 and greater
    // See https://github.com/nklayman/vue-cli-plugin-electron-builder/issues/378 for more info
    // Electron will not launch with Devtools extensions installed on Windows 10 with dark mode
    // If you are not using Windows 10 dark mode, you may uncomment these lines
    // In addition, if the linked issue is closed, you can upgrade electron and uncomment these lines
    // try {
    //   await installVueDevtools()
    // } catch (e) {
    //   console.error('Vue Devtools failed to install:', e.toString())
    // }

  }
  createTray()
  createWindow()
  if (process.platform === 'darwin') {
    setDockIcon()
  } else {
    win.setIcon(path.join(__static, 'assets/crystal1024.png'))
  }
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', data => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}

// let imgPath = process.env.DEV ? "assets/crystal32bw.png" : path.join(process.resourcesPath, "crystal32bw.png");
const trayIcnName = process.platform === 'win32' ? 'crystal32bw.png' : 'crystal32bw.png';
const trayIcnPath = process.env.WEBPACK_DEV_SERVER_URL
    ? path.join(__static, `assets/${trayIcnName}`)
    : path.join(__static, `assets/${trayIcnName}`);
const createTray = () => {
  tray = new Tray(trayIcnPath);
  const contextMenu = Menu.buildFromTemplate([
    { label: 'Promethium Light Wallet Menu', enabled: false },
    { label: 'show wallet window', click: () => {
      if (win === null) {
        createWindow()
      }
      let b = win.isMinimized()
      if (b === true) {
        win.show()
      }  
    } },
    { label: 'quit wallet', click: () => { app.quit() } },
  ])
  tray.setToolTip('iPromethium')
  tray.setContextMenu(contextMenu)
}

const setDockIcon = () => {
  if (process.platform === 'darwin') {
    app.dock.setIcon(image)
  }
}
