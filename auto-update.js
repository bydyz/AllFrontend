let lastSrc //上一次获取到的script地址

const scriptReg = /\<script.*src=["'](?<src>[^"']+)/gm

// 获取最新页面的script链接
async function extractNewScripts() {
  const html = await fetch('/?_timestamp=' + Date.now()).then(resp => resp.text())
  scriptReg.lastIndex = 0;
  let result = []
  let match
  while(match = scriptReg.exec(html)) {
    result.push(match.groups.src)
  }
  return result
}

async function needUpdate() {
  const newScripts = await extractNewScripts()
  if(!lastSrc) {
    lastSrc = newScripts
    return false
  }
  let result = false
  if(lastSrc.length !== newScripts.length) {
    result = true
  }
  for(let i = 0; i < lastSrc.length; i++) {
    if(lastSrc[i] !== newScripts[i]) {
      result = true
      break
    }
    lastSrc = newScripts
    return result
  }
}

const DURATION = 2000
function autoRefresh() {
  setTimeout(async () => {
    const willUpdate = await needUpdate()
    if(willUpdate) {
      const result = confirm('页面有更新，点击确定刷新页面')
      if(result) {
        location.reload()
      }
    }
    autoRefresh()
  }, DURATION)
}

autoRefresh()