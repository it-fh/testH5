 const PENDING = 'pending';
 const FULFILLED = 'fulfilled';
 const REJECTED = 'rejected';
 function Promise(executor){
     let self = this;
     self.status = PENDING;
     self.onResolvedCallbacks = [];
     self.onRejectedCallbacks = [];
     function resolve(value){
        if(self.status == PENDING){
            self.status = FULFILLED;
            self.value = value;
            self.onResolvedCallbacks.forEach(cb=>cb(self.value));
        }
     }
     function reject(reason){
        if(self.status == PENDING){
            self.status = REJECTED;   
            self.value = reason;
            self.onRejectedCallbacks.forEach(cb=>cb(self.value));
        }
     }
     
     try{
        executor(resolve,reject);
     }catch(e){
         reject(e);
     }
 }

 Promise.prototype.then = function(onFulfilled,onRejected){
     onFulfilled = typeof onFulfilled =='function'?onFulfilled:value=>value;
     onRejected = typeof onRejected == 'function'?onRejected:reason=>{throw reason}; 
     let self = this;
     let promise2;
     if(self.status == FULFILLED){
        return promise2 = new Promise(function(resolve,reject){
            let x = onFulfilled(self.value);
            resolvePromise(promise2,x,resolve,reject);
        }) 
     }
     if(self.status == REJECTED){
         let x = onRejected(self.value);
         resolvePromise(promise2,x,resolve,reject);
     }
     if(self.status == PENDING){
         self.onResolvedCallbacks.push(function(){
            let x = onFulfilled(self.value);
            resolvePromise(promise2,x,resolve,reject);
        });
         self.onRejectedCallbacks.push(function(){
            let x = onRejected(self.value);
            resolvePromise(promise2,x,resolve,reject);
         });
     }
 }

 module.exports = Promise;