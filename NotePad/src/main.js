const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('node:path')

// 写入文件 Node.js fs文件写入模块
const fs = require('fs')



function createWindow() {

    const win = new BrowserWindow({
        width: 850,
        height: 600,
        webPreferences: {

            // __dirname 生成绝对路径
            preload: path.join(__dirname, 'preload.js')   //__dirname -> 当前目录的位置
        }
    })

    // 一般主进程为相对路径这里可以用绝对
    win.loadFile('src/index.html')
    win.webContents.openDevTools();
}

function createAnotherWindow(parent) {

    // Main Windows Instance 主窗口
    const win = new BrowserWindow({
        width: 600,
        height: 300,
        parent
    })
    win.loadFile('src/second.html')
}

//创建一个回调函数更新窗体title
//event -> 时间对象
// 自己写的title 动作
function handleSetTitle(event, title) {

    console.log('the event from ipcRenderer', event)
    const webContents = event.sender
    const win = BrowserWindow.fromWebContents(webContents)
    win.setTitle(title)
}

async function handleWriteFile(event, content) {

    console.log('The content', content);
    await fs.promises.writeFile('test.md', content)
    const stats = await fs.promises.stat('test.md') //stats获取文件属性
    return stats.size
}

app.on('ready', () => {

    ipcMain.on('set-title', handleSetTitle)
    //write-read file
    ipcMain.handle('write-file', handleWriteFile)

    // const parent = createWindow()
    // createAnotherWindow(parent)
    createWindow();
})

//

// const win = new BrowserWindow({
//         width: 850,
//         height: 600,
//         webPreferences: {
//             preload: path.join(__dirname, 'preload.js')
//         }
//     })


// app.whenReady().then(() => {
//     createWindow()

//     app.on('activate', () => {
//         if (BrowserWindow.getAllWindows().length === 0) {
//             createWindow()
//         }
//     })
// })

// app.on('window-all-closed', () => {
//     if (process.platform !== 'darwin') {
//         app.quit()
//     }
// })