pragma solidity ^0.4.23;

contract ProofOfExistence {
    
   struct hashData{
       uint timestamp;
       uint blocknumber;
       
      
   }

    address public owner;
  
    mapping (bytes32 => hashData) hashes;

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    modifier noHashExistsYet(bytes32 documentHash) {
        
       require(hashes[documentHash].timestamp==0 );
        _;
    }

    constructor() public {
        owner = msg.sender;
    }
  
    
    function notarizeHash( bytes32 documentHash) onlyOwner noHashExistsYet(documentHash)  public {
        
        hashes[documentHash].timestamp = now  ;
        hashes[documentHash].blocknumber = block.number ;
        

       
    }

    function doesProofExist(bytes32 documentHash) public view returns (bool) {
     return hashes[documentHash].timestamp!=0;
    }
    function returnData(bytes32 documentHash) public view returns(uint256,uint256){
        if (doesProofExist(documentHash)==true){
            return( hashes[documentHash].timestamp,
        hashes[documentHash].blocknumber );
        }
    }
}
