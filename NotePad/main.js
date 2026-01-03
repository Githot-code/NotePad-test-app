const { app, BrowserWindow, ipcMain, webContents } = require("electron");

//使用 electron remote模块
const remote = require('@electron/remote/main')

const path = require("node:path");

// 写入文件 Node.js fs文件写入模块
const fs = require("fs");

remote.initialize() //初始化remote方法
function createWindow() {
  const win = new BrowserWindow({
    width: 850,
    height: 600,
    webPreferences: {
      // __dirname 生成绝对路径
      nodeIntegration: true,  //禁用沙盒模块，可以用预加载脚本使用更多的Electron API
      preload: path.join(__dirname, "preload.js"), //__dirname -> 当前目录的位置

    }
  })

  // 一般主进程为相对路径这里可以用绝对
  win.loadFile("index.html");
  win.webContents.openDevTools();

  return win;
}

function createAnotherWindow(parent) {
  // Main Windows Instance 主窗口
  const win = new BrowserWindow({
    width: 600,
    height: 300,
    parent,
  });
  win.loadFile("second.html");
}

//创建一个回调函数更新窗体title
//event -> 时间对象
// 自己写的title 动作
function handleSetTitle(event, title) {
  console.log("the event from ipcRenderer", event);
  const webContents = event.sender;
  const win = BrowserWindow.fromWebContents(webContents);
  win.setTitle(title);
}

async function handleWriteFile(event, content) {
  console.log("The content", content);
  await fs.promises.writeFile("test.md", content);
  const stats = await fs.promises.stat("test.md"); //stats获取文件属性
  return stats.size;
}

app.on('ready', () => {
  ipcMain.on("set-title", handleSetTitle);
  //write-read file
  ipcMain.handle("write-file", handleWriteFile);

  // const parent = createWindow()
  // createAnotherWindow(parent)

  let counter = 1;
  const win = createWindow()
  //在主窗口进程上激活remote模块
  // 尽量不要🫸使用 remote 沙盒化，可能会产生安全问题
  remote.enable(win.webContents)
  win.webContents.send('update-counter', counter)
  setInterval(() => {
    counter += 3
    win.webContents.send('update-counter', counter)
  }, 3000)  //3s 发送一次
  //
});

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
