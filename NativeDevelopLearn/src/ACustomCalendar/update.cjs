const fs = require('fs');

const data = JSON.parse(fs.readFileSync('./dates.json', 'utf8'));

data.dates = data.dates.map((d, i) => {
  const tasks = [];
  if (i % 3 === 0) tasks.push({ text: '学习 Vue', done: i % 2 === 0 });
  if (i % 5 === 0) tasks.push({ text: '学习 React', done: i % 4 === 0 });
  if (i % 7 === 0) tasks.push({ text: '学习 TypeScript', done: i % 6 === 0 });
  
  return {
    ...d,
    tasks: tasks.length > 0 ? tasks : [],
    completed: false
  };
});

fs.writeFileSync('./dates.json', JSON.stringify(data, null, 2));
console.log('Done');
