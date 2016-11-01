

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


