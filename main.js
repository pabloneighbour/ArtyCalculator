const { app, BrowserWindow } = require('electron')

const createWindow = () => {
  const window = new BrowserWindow({
    width: 400,
    height: 600,
    resizable: false,
    fullscreenable: false,
    icon: './page/source/icon128.png'
  })
  window.setMenuBarVisibility(false)
  window.setAlwaysOnTop(true, 'screen')
  window.setPosition(0, 300)

  window.on('blur', () => {
    window.setOpacity(0.5)
  })

  window.on('focus', () => {
    window.setOpacity(1)
  })

  window.loadFile('./page/index.html')
}

app.whenReady().then(() => {
  createWindow()
})
