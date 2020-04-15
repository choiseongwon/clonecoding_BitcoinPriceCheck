const electron = require('electron')
const remote = electron.remote
const ipc = electron.ipcRenderer

const closeBtn = document.getElementById('closeBtn');

console.log(closeBtn)
closeBtn.addEventListener('click', function(event) {
    console.log('closeBtn')
    var window = remote.getCurrentWindow();
    window.close();
});

const updateBtn = document.getElementById('updateBtn');

updateBtn.addEventListener('click', function() {
    console.log('updateBtn');
    ipc.send('update-notify-value', document.getElementById('notifyVal').value);

    var window = remote.getCurrentWindow();
    window.close();
});