const info = document.getElementById('info');
info.innerHTML = `Chrome (v${window.versions.chrome}), Node.js (v${window.versions.node})`

const btn = document.getElementById('btn')
const titleInput = document.getElementById('title')

//完成发送任务 -> 转到 main.js 完成事件的接收
btn.addEventListener('click', () => {

    const title = titleInput.value
    window.electron.setTitle(title)
})