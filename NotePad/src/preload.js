//预加载脚本preload.js在渲染进程main.js(render)介入之前注入程序

const { contextBridge, ipcRenderer } = require('electron')

//contextBridge -> 渲染进程与预加载脚本的连接器🔗
contextBridge.exposeInMainWorld('versions', {

    // 暴漏相应组件的版本号
    node: process.versions.node,
    chrome: process.versions.chrome
})

//将暴漏的版本号信息注入ℹ️

contextBridge.exposeInMainWorld('electron', {
    setTitle: (title) => ipcRenderer.send('set-title', title)
})




// window.addEventListener('DOMContentLoaded', () => {
//     const replaceText = (selector, text) => {
//         const element = document.getElementById(selector)
//         if (element) element.innerText = text
//     }

//     for (const type of ['chrome', 'node', 'electron']) {
//         replaceText(`${type}-version`, process.versions[type])
//     }
// })