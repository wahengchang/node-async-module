# node-async-module

It is a example of building and requiring an async singleton module. Before the obj is init-ed, throw error message when it is called. 


## Usage
### Singleton design pattern
```js
module.exports =  (function() {  
    // Singleton instance goes into this variable
    var instance;

    // Singleton factory method
    function factory() {
        return OBJ()
    }

    // Singleton instance getter
    function getInstance() {
        // If the instance does not exists, creates it
        if (instance === undefined) {
            instance = factory();
        }

        return instance;
    }

    // Public API definition
    return (function(){
        {
            // If the instance does not exists, creates it
            if (instance === undefined) {
                instance = factory();
            }

            return instance;
        }
    })()
})();

```



### Async initialized module  
```js
var OBJ = function() {

    console.log(' constructor OBJ')

    var x = 0;
    var isInit = false; //control init flag 

    // a function that wait until isInit finished, 
    var baseFunction = function(cb){
            if(!isInit){
                return new Error('OBJ is not init');
            }
            else {
                if(cb){
                    return cb() ;
                }
            }
    }

    var increase = function(){
        return baseFunction(function(){
            x = x + 1;
            return x;
        })
    }




    console.log('goint to init ... 3s')
    setTimeout(function() {
        console.log(' init finished .')
        isInit = true;
    }, 3000)


    return {
        increase: increase
    };
}


```




### Implementation
```js

var OBJ = require('./module.js')

// OBJ takes 3s to init, 
//so Error message is showed when below functions are called
console.log(OBJ.increase());
console.log(OBJ.increase());

//after finished init(), OBJ.increase works well
setTimeout(function() {
  console.log(OBJ.increase());
  console.log(OBJ.increase());
}, 4000);


```


## License


[MIT](http://vjpr.mit-license.org)