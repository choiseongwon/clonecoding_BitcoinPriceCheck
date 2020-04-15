const electron = require('electron')
const path = require('path')
const BrowserWindow = electron.remote.BrowserWindow
const axios = require('axios')
const ipc = electron.ipcRenderer

const notifyBtn = document.getElementById('notifyBtn')
var price = document.querySelector('h1')
var targetPrice = document.getElementById('targetPrice')
var targetPriceVal

function spawnNotification(theBody,theIcon,theTitle) {
    var options = {
        body: theBody,
        icon: theIcon
    }
    var n = new Notification(theTitle,options);
  }

function getBTC() {
    axios.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC&tsyms=USD')
    .then(res => {
        const cryptos = res.data.BTC.USD
        price.innerHTML = '$'+cryptos.toLocaleString('en')
        console.log(cryptos)
        if(targetPrice.innerHTML != '' && targetPriceVal < cryptos) {
            console.log('success');
            spawnNotification('BTC just beat your target price!', '../assets/images/dollar.svg', 'BTC ALERT')
            
        }
    })
}
getBTC();
setInterval(getBTC, 3000);
notifyBtn.addEventListener('click', function(event) {
    const modalpath = path.join('file://', __dirname, 'add.html')
    let win = new BrowserWindow( {
        webPreferences: {
            nodeIntegration: true
        },
        frame: false, 
        transparent: true, 
        width: 400, 
        height: 200, 
    });
    // win.on('close', function() {
    //     win = null
    // });
    
    win.loadFile('src/add.html');
    win.show();
})

ipc.on('targetPriceVal', function(event, arg) {
    targetPriceVal = Number(arg);
    targetPrice.innerHTML = '$'+targetPriceVal.toLocaleString('en');
})