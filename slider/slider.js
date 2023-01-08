var licznik = 1;

document.onload


document.getElementById("slajder") = document.write("<img src='img/slide_"+licznik+".jpg' width='1080px'>");

const fs = require('fs')
const length = fs.readdirSync('img').length
console.log(length);

function next(){
    licznik++;
    document.getElementById("slajder") = document.write("<img src='img/slide_"+licznik+".jpg' width='1080px'>");
}