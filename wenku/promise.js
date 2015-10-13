var task = (function () {
    function task(callback) {
        this.flag = 0;
        this.callback = callback;
    }
    task.prototype.start = function () {
    };
    return task;
})();
var promise = (function () {
    function promise() {
        this.callbackArray = [];
    }
    promise.prototype.push = function (callback) {
        this.callbackArray.push(callback);
    };
    promise.prototype.start = function () {
        // for(var key in this.callbackArray){
        // 	this.callbackArray[key](this,key);
        // }
        this.run(0);
    };
    promise.prototype.run = function (serial) {
        console.log(this.callbackArray);
        this.callbackArray[serial](this, serial);
    };
    return promise;
})();