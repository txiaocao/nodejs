// var data='(function(){alert(1);})();';
// 
// var format = require("js-beautify");
// data = format(data,{ indent_size: 2 });
// console.log(data);

var exec = require('child_process').exec, 
last = exec('dir'); 

last.stdout.on('data', function (data) { 
console.log('标准输出：' + data); 
}); 