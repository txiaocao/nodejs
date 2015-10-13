// var rp = require('request-promise');
// var url = "http://www.baidu.com/";
// var x = 0;
// 
// 
// rp(url).then(function(body){
// 	x++;
// 	console.log(x)
// });
// rp(url).then(function(body){
// 	x++;
// 	console.log(x)
// });
// rp(url).then(function(body){
// 	x++;
// 	console.log(x)
// });




// var task = (function () {
//     function task(callback) {
//         this.flag = 0;
//         this.callback = callback;
//     }
//     task.prototype.start = function () {
//     };
//     return task;
// })();
// var promise = (function () {
//     function promise() {
//         this.callbackArray = [];
//     }
//     promise.prototype.push = function (callback) {
//         this.callbackArray.push(callback);
//     };
//     promise.prototype.start = function () {
//         this.next(-1);
//     };
//     promise.prototype.next = function (serial) {
// 		serial += 1;
// 		if(serial<this.callbackArray.length){
//         	this.callbackArray[serial](this, serial);
// 		}
//     };
//     return promise;
// })();


// var request = require("request");
// var url = "http://www.baidu.com/";
// var p = new promise();
// p.push(function(e,key){
// 	request(url,function(error, response, body){
// 		console.log("1 ok");
// 		e.next(key);
// 	})
// });
// p.push(function(e,key){
// 	request(url,function(error, response, body){
// 		console.log("2 ok");
// 		e.next(key);
// 	})
// });
// p.push(function(e,key){
// 	request(url,function(error, response, body){
// 		console.log("3 ok");
// 		e.next(key);
// 	})
// });
// p.push(function(e,key){
// 	request(url,function(error, response, body){
// 		console.log("4 ok");
// 		e.next(key);
// 	})
// });
// p.start();



// var when = require("when");
// var promise = when.promise(function(resolve, reject, notify) {
//     // Do some work, possibly asynchronously, and then
//     // resolve or reject.
// 
//     // DEPRECATED: You can notify of progress events
//     // along the way if you want/need.
// 
//     resolve();
//     // or resolve(anotherPromise);
//     // or reject(nastyError);
// });
// 
// var url = "http://www.baidu.com/";
// 
// promise.then(function(){
// 	console.log(1);
// 	request(url,function(){
// 		console.log("1 ok");
// 	})
// }).then(function(){
// 	console.log(2);
// 	request(url,function(){
// 		console.log("2 ok");
// 	})
// }).then(function(){
// 	console.log(3);
// 	request(url,function(){
// 		console.log("3 ok");
// 	})
// }).then(function(){
// 	console.log(4);
// 	request(url,function(){
// 		console.log("4 ok");
// 	})
// });


// 
// 
// 
// 
// 
var fs = require("fs");
var request = require("request");
var jsdom = require("jsdom").jsdom;
var document = jsdom("");
// 
// var url = "http://wenku.baidu.com/content/38e0ca2aa76e58fafab00349?m=15efee3edc71cebcc995c56d44af9d21&type=json&cn=1&_=0&t=1442473800&callback=wenku1";
// request(url, function (error, response, body) {
// 	console.log(getContent(body));
// });


// var Promise = require('promise');
// var p1 = new Promise(function (resolve, reject) {
// 	console.log(1);
// 	resolve();
// });
// p1.then(function(resolve, reject){
// 	console.log(2);
// 	resolve();
// 	return new Promise();
// }).then(function(resolve, reject){
// 	console.log(3);
// 	  resolve();
// });
// 
// var p = new promise();
var maxnumber = 26;
var rp = require('request-promise');
var url = "http://wenku.baidu.com/content/38e0ca2aa76e58fafab00349?m=15efee3edc71cebcc995c56d44af9d21&type=json&cn=page&_=0&t=1442473800&callback=wenku1";
// 
for (var x = 0; x <= maxnumber; x++) {
	var realUrl;
	realUrl = url.replace("page", x);

	console.log(realUrl);
	// rp(realUrl).then(function(body){
	// 	getContent(body);
	// });
	// p.push(function(e,key){
	// 	var q = i;
	// 	// console.log("正在下载第"+q+"页");
	// 	request(url,function(error, response, body){
	// 		
	// 		e.next(key);
	// 	})
	// });
}

// p.push(function(e,key){
// 	
// 	request(url,function(error, response, body){
// 		getContent(body)
// 		e.next(key);
// // 	})
// // });
// p.start();

function getContent(body) {
	var text = "";
	body = body.replace("wenku1(", "");

	body = body.replace(")", "");
	body = JSON.parse(body);

	for (var item in body.c) {
		text += getHtmlContent(body.c[item]);
	}
	fs.writeFile("data" + "\\" + body.blockNum + ".html", text);
}

function getHtmlContent(node) {
	if (typeof (node.c) !== "string") {
		return "";
	}

	var html = "";
	var el = document.createElement(node.t);
	if (typeof (node.r) !== "undefined") {
		el.classList.add(node.r[0]);
	}

	el.innerHTML = node.c;
	
	// var tpl = "<:a class=':style'>:text</:a>";
	// var html = "";
	// var el = tpl.replace(":a", node.t);
	// el = el.replace(":text", node.c);
	// el = el.replace(":style", node.r[0]);
	//  
	// el = $(el);
	// el.text(node.c);
	// el.addClass(node.r[0]);
	html = el.outerHTML;

	return html + "\n\r";

}