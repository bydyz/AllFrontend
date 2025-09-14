// Depending on timezone, your results will vary
const dateItem = new Date("August 19, 1975 23:15:30 GMT+00:00");

console.log(dateItem.toLocaleTimeString("en-US"));
// Expected output: "1:15:30 AM"

console.log(dateItem.toLocaleTimeString("it-IT"));
// Expected output: "01:15:30"

console.log(dateItem.toLocaleTimeString("ar-EG"));
// Expected output: "١٢:١٥:٣٠ ص"