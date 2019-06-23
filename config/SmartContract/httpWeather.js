const request = require('request');
const ethers = require('ethers');
var utils = require('ethers').utils;

var oracle = null;

exports.setOracleV =  function(oracleS) {
    oracle = oracleS;
}


exports.callCron = function () {
    //add logical oracle here
    try {
        //oracle to call http
        request(oracle.api, function (error, response, body) {
            var infoWeather = JSON.parse(body);
            if(executeSmartContract(infoWeather,oracle)) {
                if (global.allAddress.length != undefined && (global.allAddress.length != null && global.allAddress.length > 0)) {
                    for(i=0;i<global.allAddress.length;i++) {
                        var address = global.allAddress[i]
                        if(checkAddress(address)) {
                            callSmartContract(address.address,address.abi);
                        }
                    }
                }
            }
            console.log('> error request ', error); // Print the error if one occurred
            console.log('> statusCode request ', response && response.statusCode); // Print the response status code if a response was received
            console.log('> body request:', body); // Print the HTML for the Google homepage.
        });
    }
    catch(err) {
        console.log("> error call request "+err);
    }
}

//condition when execute smart contract
function executeSmartContract(infoWeather,api) {
    if (infoWeather.main !== undefined) {
        if (infoWeather.main.temp > api.temp) {
            console.log("> execute sm true");
            return true;
        } else {
            console.log("> execute sm false");
            return false;
        }
    } else {
        return false
    }

}

//Check if address can use this oracle
function checkAddress(address) {
    if (address.oracle==oracle.name) {
        return true;
    } else {
        return false;
    }
}

//call smart contract
function callSmartContract(address, abi)  {

    console.log("> call address:"+address+" abi:"+abi);
    var overrideOptions = {
        gasLimit: global.properties.gas,
        gasPrice: global.properties.gasPrice,
        nonce: 0,
        value: ethers.utils.parseEther('1.0')
    };

    var abi2 = JSON.parse(abi);
    var contract = new ethers.Contract(address,abi2.abi.abi , global.wallet);

    //var callPromise = contract.getFecha(overrideOptions);
    var callPromise = contract.getFecha();
    callPromise.then(function(value) {
        console.log("> call "+address+' Single Return Value :' + JSON.stringify(value));
        console.log("> info "+address+" - "+utils.toUtf8String(value.data));
    });

}