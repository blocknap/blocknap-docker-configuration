const Web3 = require('web3');


exports.init  = function(addressIn,abi) {

    var web3 = new Web3(new Web3.providers.WebsocketProvider(global.properties.wss));

    var overrideOptions = {
        gasLimit: global.properties.gas,
        gasPrice: global.properties.gasPrice
    };

    console.log("> init logTest "+addressIn)
    var subscription2 = web3.eth.subscribe('logs',overrideOptions, {
        address: addressIn,
        topics: [null]
    }, function(error, result){

        if (!error) {
            console.log("> receive logs "+JSON.stringify(result));
        } else {
            console("> error logs "+error);
        }
    }).on("data", function(log){
        console.log("> data log "+JSON.stringify(log));
    }).on("changed", function(log){
            console.log("> change log "+JSON.stringify(log));
    });

}


