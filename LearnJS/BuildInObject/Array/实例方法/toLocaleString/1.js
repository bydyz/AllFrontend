// toLocaleString()
// toLocaleString(locales)
// toLocaleString(locales, options)

// locales 可选
//   带有 BCP 47 语言标签的字符串，或者此类字符串的数组。对于 locales 参数的一般形式和说明，可以参见 Intl 主页面的参数说明。

// options 可选
//   一个具有配置属性的对象。对于数字，请参见 Number.prototype.toLocaleString()；对于日期，
//   请参见 Date.prototype.toLocaleString()。

// 返回值
//   一个字符串，表示数组中的所有元素。



// toLocaleString() 方法返回一个字符串，表示数组中的所有元素。每个元素通过调用它们自己的 toLocaleString 方法转换为字符串，
// 并且使用特定于语言环境的字符串（例如逗号“,”）分隔开。


const array1 = [1, "a", new Date("21 Dec 1997 14:12:00 UTC")];
const localeString = array1.toLocaleString("en", { timeZone: "UTC" });

console.log(localeString);
// Expected output: "1,a,12/21/1997, 2:12:00 PM",
// This assumes "en" locale and UTC timezone - your results may vary