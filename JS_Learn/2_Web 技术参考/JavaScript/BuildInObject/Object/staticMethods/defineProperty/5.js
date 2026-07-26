function Archiver() {
  let temperature = null;
  const archive = [1];

  Object.defineProperty(this, "temperature", {
    get() {
      console.log("get!");
      return temperature;
    },
    set(value) {
      temperature = value;
      archive.push({ val: temperature });
    },
  });

  this.getArchive = () => {
    console.log('执行了 getArchive 函数', archive)
    return archive
  };
}

const arc = new Archiver();
console.log('打印arc', arc)
console.log('打印arc的archive属性', arc.archive)    // 执行了 getArchive 函数 [ 1, { val: 11 }, { val: 13 } ]

arc.temperature; // 'get!'

arc.temperature = 11;
arc.temperature = 13;

arc.getArchive();
