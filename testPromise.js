let MyPromise = require('./Promise.js');

let p = new MyPromise((resolve,reject)=>{
 setTimeout(_=>{
    let num = Math.random();
    if(num<.5){
        resolve(num);
    }else{
        reject('失败');
    }
 })
});

p.then(data=>console.log(data),err=>console.error(err));
