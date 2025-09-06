const str = "Events: 2025-01-15, 2025-02-20, 2025-03-10";

const regex = /(\d{4})-(\d{2})-(\d{2})/g;
const matches = str.matchAll(regex);

const dates = [];
for (const match of matches) {
  console.log("match", match, match[4], match.slice(1))
  const [year, month, day] = match.slice(1); // 提取捕获组
  dates.push(`${day}/${month}/${year}`);
}

console.log(dates); // ["15/01/2025", "20/02/2025", "10/03/2025"]