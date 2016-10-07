var call_after_completion = function(callback){
    this._callback = callback;
    this._args = [].slice.call(arguments,1);
    this._queue = {};
    this._count = 0;
    this._run = false;
}

call_after_completion.prototype.add_condition = function(str){
    if(this._queue[str] !== undefined)
        throw new TypeError("Identifier '"+str+"' used twice");
    else if(typeof str !== "String" && str.toString === undefined)
        throw new TypeError("Identifier has to be a string or needs a toString method");

    this._queue[str] = 1;
    this._count++;
    return str;
}

call_after_completion.prototype.remove_condition = function(str){
    if(this._queue[str] === undefined){
        console.log("Removal of condition '"+str+"' has no effect");
        return;
    }
    else if(typeof str !== "String" && str.toString === undefined)
        throw new TypeError("Identifier has to be a string or needs a toString method");

    delete this._queue[str];

    if(--this._count === 0 && this._run === false){
        this._run = true;
        this._callback.apply(null,this._args);
    }
}










var foo = function(){console.log("foo");}
var bar = new call_after_completion(foo);
var i;

bar.add_condition("foo:3-Second-Timer");
bar.add_condition("foo:additional function");
bar.add_condition("foo:for-loop-finished");

function additional_stuff(cond){
    console.log("additional things");
    cond.remove_condition("foo:additional function");
}

for(i = 0; i < 1000; ++i){

}
console.log("for loop finished");
bar.remove_condition("foo:for-loop-finished");
additional_stuff(bar);

setTimeout(function(){
    console.log("3 second timeout");
    bar.remove_condition("foo:3-Second-Timer");
},3000);
