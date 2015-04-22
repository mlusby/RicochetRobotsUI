str = "node.js";
buf = new Buffer(str.length);
myArray = new Array(str.length);

for (var i = 0; i < str.length ; i++) {
  buf[i] = str.charCodeAt(i);
  myArray[i] = str.charCodeAt(i);
}

console.log(buf);
console.log(myArray);