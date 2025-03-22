const { app } = require('electron')
const WindowManager = require('./Scripts/WindowManager.js');

//Main Object responsible for managing the electron windows is created
windowManager = new WindowManager();

//Called when Electron is ready
//This creates the browser windows and tray in the menu bar
app.on('ready', windowManager.createUI.bind(windowManager));

//When all windows are closed
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.whenReady().then(() => {

  // Disable certificate verification (DEVELOPMENT ONLY)
  app.on('certificate-error', (event, webContents, url, error, certificate, callback) => {
    // Only if the URL is your WSL development API 
    if (url.includes('localhost')) {
      event.preventDefault();
      callback(true);
    }
  });

});
