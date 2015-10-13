class task{
	flag:number = 0;
	callback;
	public constructor(callback){
		this.callback = callback;
	}
	public start(){
		
	}
}


class promise{
	
	callbackArray;
	
	public constructor(){
		this.callbackArray = [];
	}
	
	public push(callback){
		this.callbackArray.push(callback);
	}
	
	public start(){
		// for(var key in this.callbackArray){
		// 	this.callbackArray[key](this,key);
		// }
		this.run(0);
	}
	
	public run(serial){
		this.callbackArray[serial](this,serial);
	}
	
}

