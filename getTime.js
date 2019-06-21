'use strict'

let date = new Date();
let minute = date.getMinutes();
let hour = date.getHours();
let day = date.getDay();
let month = date.getMonth();
let year = date.getFullYear();

let getTime = ( 'Date ' + day + '-' + month + '-' + year + ' - Time ' + hour + '.' + minute );
let getTimeUpdate = ( 'Date Update ' + day + '-' + month + '-' + year + ' - Time ' + hour + '.' + minute );

exports.getTime = getTime
exports.getTimeUpdate = getTimeUpdate
// console.log(getTimeUpdate)