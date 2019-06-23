pragma solidity ^0.4.0;

contract BlockNap {

    string public fecha;
    string public emisor;
    string public receptor;
    string public asunto;


    event logEvent(
        address _from,
        string  typeM,
        string value
    );

    /**
     * Constructor
     */
    function BlockNap(string _fecha, string _emisor, string _receptor, string _asunto){
        fecha = _fecha;
        emisor = _emisor;
        receptor = _receptor;
        asunto = _asunto;
    }

    function getFecha() payable public  returns (string)  {
        emit logEvent(msg.sender,"fecha",fecha);
        return fecha;
    }

    function getEmisor() payable public returns (string) {
        emit logEvent(msg.sender,"emisor",emisor);
        return emisor;
    }

    function getReceptor() payable public  returns (string) {
        return receptor;
    }

    function getAsunto() payable public  returns (string) {
        return asunto;
    }

    function setAsunto(string newAsunto) payable public  returns (string) {
        asunto = newAsunto;
        return asunto;
    }

}
