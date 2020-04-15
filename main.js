const { app, BrowserWindow, Menu } = require('electron')
const shell = require('electron').shell
const ipc = require('electron').ipcMain

function createWindow () {
  if (process.platform === 'win32') {
    app.setAppUserModelId("com.ikobit.desktop-notifications");
  }
  
  // 브라우저 창을 생성합니다.
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // and load the index.html of the app.
  win.loadFile('src/index.html');

  // 개발자 도구를 엽니다.
  win.webContents.openDevTools();

  var menu = Menu.buildFromTemplate([
    {
      label: 'Menu',
      submenu: [
        {label: 'Adjust Notification Value'},
        {
          label: 'CoinMarketCap',
          click() {
            shell.openExternal('http://coinmarketcap.com');
          }
        },
        {type: 'separator'},
        {
          label: 'Exit',
          click() {
            app.quit();
          }
        }
      ]
    },
    {
      label: 'Info'
    }
  ]);
  
  Menu.setApplicationMenu(menu);

  ipc.on('update-notify-value', function(event, arg) {
    win.webContents.send('targetPriceVal', arg)
  })
}


// 이 메소드는 Electron의 초기화가 완료되고
// 브라우저 윈도우가 생성될 준비가 되었을때 호출된다.
// 어떤 API는 이 이벤트가 나타난 이후에만 사용할 수 있습니다.
app.whenReady().then(createWindow)

// 모든 윈도우가 닫히면 종료된다.
app.on('window-all-closed', () => {
  // macOS에서는 사용자가 명확하게 Cmd + Q를 누르기 전까지는
  // 애플리케이션이나 메뉴 바가 활성화된 상태로 머물러 있는 것이 일반적입니다.
  if (process.platform !== 'darwin') {
    app.quit()
  }
})


app.on('activate', () => {
  // macOS에서는 dock 아이콘이 클릭되고 다른 윈도우가 열려있지 않았다면
  // 앱에서 새로운 창을 다시 여는 것이 일반적입니다.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

