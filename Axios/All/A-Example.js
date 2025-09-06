function One() {
  // 向给定ID的用户发起请求
  axios
    .get("/user?ID=12345")
    .then(function (response) {
      // 处理成功情况
      console.log(response);
    })
    .catch(function (error) {
      // 处理错误情况
      console.log(error);
    })
    .finally(function () {
      // 总是会执行
    });
}

function Two() {
  axios.get('/user', {
    params: {
      ID: 12345
    }
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  })
  .finally(function () {
    // 总是会执行
  });  
}


const containerEle = document.getElementById("buttonContainer")

const titleEle = document.createElement("h2")
titleEle.innerText = "Example"

containerEle.appendChild(titleEle)

const arrayAll = [
  {
    id: 'One',
    func: One
  },
  {
    id: 'Two',
    func: Two
  },
]

for(let i = 0; i < arrayAll.length; i++) {
  const buttonItem = document.createElement("button");
  buttonItem.innerText = arrayAll[i].id
  buttonItem.id = arrayAll[i].id
  buttonItem.className = "buttonClass"
  buttonItem.onclick = function() {
    arrayAll[i].func()
  }

  containerEle.appendChild(buttonItem)
}

export {
  One
}