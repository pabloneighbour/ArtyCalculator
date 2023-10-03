const { app, BrowserWindow } = require('electron')

const createWindow = () => {
  const window = new BrowserWindow({
    width: 400,
    height: 600,
    resizable: false,
    icon: './page/source/7hp3.png',
    fullscreenable: false
  })
  window.setMenuBarVisibility(false)
  window.setAlwaysOnTop(true, 'screen')
  window.setPosition(0, 300)

  window.on('blur', () => {
    window.setOpacity(0.5)
    console.log('blur')
  })

  window.on('focus', () => {
    window.setOpacity(1)
    console.log('focus')
  })

  window.loadFile('./page/index.html')
}

app.whenReady().then(() => {
  createWindow()
})
