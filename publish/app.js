var config = {};
config.curDir = __dirname+"\\";
config.miniifier = config.curDir+"node_modules\\MicrosoftAjaxMinifier\\AjaxMin.exe";
config.php_strip_whitespace =config.curDir+"php_strip_whitespace.php";


var fs = require("fs");
var exec = require('child_process').exec;
var jso = require('js-obfuscator');
var miniCSS = require('mini-css');

function shell(cmd,callback,callbackend){
	var child = exec(cmd);
	var tmp = "";
	child.stdout.on('data', function (data) { 
		tmp+=data;
		if(typeof(callback)==="function"){
			callback(data); 
			return;
		}
		console.log(data);
	}); 
	child.stdout.on("end",function(callback){
		if(typeof(callbackend)==="function"){
			callbackend(tmp);
			return;
		}
		
	})
}

//shell("dir",exec);

// 分文件处理模块
function js(filePath){
	var cmd = config.miniifier+" ':file' -o ':file'";
	cmd = cmd.replace(/:file/g,filePath);
	//console.log(cmd);
	shell(cmd,null,function(){
		fs.readFile(filePath,"utf-8",function(err,data){
			
			if(err){
				console.log(err);
			}else{
				jso(data).then(function(obfuscated){
					fs.writeFile(filePath,obfuscated);
				});
			}
		});
	});
}


function html(filePath){
	
}
function css(filePath){
	miniCSS(null,filePath,true);
	// fs.readFile(filePath,"utf8",function(err,data){
	// 	if(err){
	// 		
	// 	}else{
	// 	console.log(data);
	// 	var tmp = miniCSS(data, { sourcemap: false });
	// 	console.log(tmp.code );
	// 	//file.writeFile(filePath,tmp);
	// 	}
	// });
}
function ts(filePath){
	var cmd = "tsc '"+filePath+"'";
	shell(cmd,null,function(){
		fs.unlink(filePath,function(){
			console.log("ts源文件已清除："+filePath);
			js(filePath.replace(/.ts/,".js"));
		});
	});
}
function php(filePath){
	var cmd = "php "+config.php_strip_whitespace+" "+filePath+"";
	// console.log(cmd);
	shell(cmd);
}
// 文件处理模块 识别文件后缀进行处理
function file(filePath){
	var tmp = filePath.split(".");
	var ext = tmp[tmp.length-1];
	console.log(filePath);
	switch(ext){
		case "js":
			js(filePath);
			break;
		case "ts":
			ts(filePath);
			break;
		case "html":
			html(filePath);
			break;
		case "css":
			css(filePath);
			break;
		case "php":
			php(filePath);
			break;
	}
}

// 文件扫描
function scan(path){
	var sf = require("scan-fs").create();
	sf.listeners({
		"file":function(filePath){
			file(filePath);
		}
	}).setRecursive(true).scan(path);
}

// 主进程
// 主进程，识别当前路径，扫描当前路径下文件，识别文件后缀分别处理，处理过程，处理结束
(function main(){
	//console.log(process.cwd() );
	//console.log(__dirname);
	
	scan(process.cwd());
})();