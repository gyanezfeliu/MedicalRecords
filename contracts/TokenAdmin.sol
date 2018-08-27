pragma solidity ^0.4.24;

import "./Whitelist.sol";
import "./RnetToken.sol";

contract TokenAdmin is Whitelist, RnetToken{
    
    event addedNewRCE(string message, address _newRCE);
    event modifiedInitialTokenTransfer(string message, uint oldValue, uint newValue);
    event modifiedQueryPrice(string message, uint oldValue, uint newValue);
    
    uint public initialTokenTransfer = 100;
    uint public queryPrice = 1;
    string tokenName = "RceToken";
    string tokenSymbol = "RCE";
    uint8 tokenDecimals= 18;
    uint tokenInitialAmount = 1000000;
    function includeNewRCE(address _newRCE) 
        public
        onlyOwner
    {
        addAddressToWhitelist(_newRCE);
        transfer(_newRCE,initialTokenTransfer);
        emit addedNewRCE("Added new RCE",_newRCE);
        
    }
    
    function modifyInitialTokenTransfer(uint _newValue)
        public
        onlyOwner
    {
        uint oldValue = initialTokenTransfer;
        initialTokenTransfer = _newValue;
        emit modifiedInitialTokenTransfer("Modified initial token transfer", oldValue, _newValue);
    }
    
    function modifyQueryPrice(uint _newValue)
        public
        onlyOwner
    {
        uint oldValue = queryPrice;
        queryPrice = _newValue;
        emit modifiedQueryPrice("Modified query price", oldValue, _newValue);
    }
}
