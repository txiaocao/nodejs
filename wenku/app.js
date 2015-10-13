var fs = require("fs");
var request = require("request");
var jsdom = require("jsdom").jsdom;
var document = jsdom("");
var async = require("async");
var url = "http://wenku.baidu.com/content/38e0ca2aa76e58fafab00349?m=15efee3edc71cebcc995c56d44af9d21&type=json&cn=page&_=0&t=1442473800&callback=wenku1";
url = "http://wenku.baidu.com/content/2a2bf16d964bcf84b9d57bde?m=e7341f1da5bb95e95c94cc97c8ddb5d0&type=json&cn=page&_=0&t=1442541300&callback=wenku1";
var maxnumber = 26;
var task = [];
for (var x = 0; x <= maxnumber; x++) {
	var realUrl;
	realUrl = url.replace(/page/, x);
	task.push(realUrl);
}

function func(callback) {
	callback();
}

async.eachSeries(task, function (item, callback) {
	//console.log(item);
	request(item,function(error, response, body){
		getContent(body);
		callback();
	});
}, function (err) {
	console.log("err: " + err);
});



function getContent(body) {
	var text = "";
	body = body.replace("wenku1(", "");

	body = body.replace(")", "");
	body = JSON.parse(body);
	console.log(body.blockNum);

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
	html = el.outerHTML;

	return html + "\n\r";

}