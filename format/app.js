var express = require('express')
var path = require('path')
var ejs = require('ejs')
var app = express()
var server = require('http').createServer(app);
var url = require("url");
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('port', process.env.PORT || 3000);
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
    res.sendfile('public/index.html');
});
app.post("/format", upload.array(),function(req,res){
    var params = req.body;
    var data = params.data;
    var response = {};
    response.status = 0;
    response.data = "";
    response.type = params.type;
    switch(params.type){
        case "css":
            var css = require("css");
            response.data = css.stringify(css.parse(data));
            break;
            
        case "json":
        case "html":
        case "js":
            var beautify = require("js-beautify").js_beautify;
            response.data = beautify(data);
            console.log(response.data);
            break;
    }
    
    res.send(JSON.stringify(response));
});

server.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});