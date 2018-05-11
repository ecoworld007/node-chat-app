const moment =  require('moment');

let date = moment();

console.log(date.format('MMM Do, YYYY'));

date.add(2,'year').subtract(12,'months');

console.log(date.format('MMM Do, YYYY'));

console.log(date.format('h:mm a'));