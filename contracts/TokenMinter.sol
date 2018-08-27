pragma solidity ^0.4.24;

import "./TokenAdmin.sol";

contract TokenMinter is TokenAdmin{
    
    event PatientApprovedInformationTransfer(string message, address patient);
    
    function test() public {
        StandardToken(tokenName,tokenSymbol,tokenDecimals,tokenInitialAmount);
        includeNewRCE(address(0x23Bfee8371c3F79453F5eD6f29CEAD2464B2eE26));
        includeNewRCE(address(0xb1300De1DE0251C9388d66947d93A594Ec2d1fD5));
        includeNewRCE(address(0x028bbe9ac64bc5f4d60c7db381b65fcc138a9d06));
        includeNewRCE(address(0xcdb98f2187bc6b4e0dabfb48b7636af444c6ea59));
        includeNewRCE(address(0x6a6e29d8c315f957f74a9ded3c63e4b0ad9ef55a));
    }
    
    function transferTokenToOthersRCE()
        public
        onlyIfWhitelisted(msg.sender)
    {
        for(uint i =0;i<amountOfBearers; i++){
            if(bearerAddresses[i]!=msg.sender){
                transfer(bearerAddresses[i],queryPrice);
                emit Transfer(msg.sender,bearerAddresses[i],queryPrice);
            }
        }
    }
    
    function payInformationTransfer(address _patient)
        public
        onlyIfWhitelisted(msg.sender)
    {
        transfer(_patient,queryPrice);
        emit Transfer(msg.sender,_patient,queryPrice);
        emit PatientApprovedInformationTransfer("Patient approved information transfer", _patient);
        transferTokenToOthersRCE();
    }
    
}
