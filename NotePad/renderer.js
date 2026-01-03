//require
const fs = window.require('fs')

const info = document.getElementById('info');
info.innerHTML = `Chrome (v${window.versions.chrome}), Node.js (v${window.versions.node})`

//Change Window Title
const btn = document.getElementById('btn')
const titleInput = document.getElementById('title')

//Read the File's size
const btn2 = document.getElementById("btn2")
const contentInput = document.getElementById("content")

//处理主进程分秒计算问题SetInterval
const counter = document.getElementById('counter')

//导入require模块
const { dialog } = window.require('@electron/remote')   //启动 remote 上的对话框 dialog 模块

//Change the Window Title
//完成发送任务 -> 转到 main.js 完成事件的接收
btn.addEventListener('click', () => {

    const title = titleInput.value
    window.electron.setTitle(title)

    dialog.showOpenDialog({ properties: ['openFile', 'multiSelections'] })        //添加打开对话框的属性
})

//Reading the File's Size
btn2.addEventListener('click', async () => {

    const content = contentInput.value
    const len = await window.electron.writeFile(content)
    console.log(len)
    info.innerHTML = `File Size: ${len} \n`

    // const c = await window.electron.readFile('test.md', { encoding: 'utf-8' })

    const c = await fs.promises.readFile('test.md', { encoding: 'utf-8' })
    info.innerHTML += `File Content: ${c}`
})

window.electron.onUpdateCounter((value) => {
    counter.innerText = value.toString()
})

//Happy 2026! 考研一定要上岸！

/*
wangyukun@wangyukundeMacBook-Pro-3 NotePad % npm install --save @electron/remote                                            [127]

added 2 packages, and audited 101 packages in 3s

21 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
*/