var fs = require("fs");


var harpath = process.cwd()+"/"+process.argv[2];

fs.readFile(harpath,'utf-8',function(err,data){
	if(err){
		console.log("文件不存在或读取失败");
	}else{
		console.log("开始输出");
		putContentbyHar(data);
	}
	
});


function putContentbyHar(data){
	var json = JSON.parse(data);
	var entries = json['log']['entries'];
	var urls = [];
	
	for(var i = 0;i<entries.length;i++){
		var item = entries[i];
		urls.push(item['request']['url'].replace(/http:\/\/.*?\//,""));
		
	}
	console.log("CACHE MANIFEST");
	console.log("# 应用缓存");
	console.log("CACHE:");
	console.log(urls.join("\n\r"));
	console.log("NETWORK:");
	console.log("FALLBACK:");
}
