var async_function = function(val, callback){
    process.nextTick(function(){
        callback(val);
    });
};

//The above function when called as will return, 43 first then 42
async_function(42, function(val) {
  console.log(val)
});
console.log(43);
