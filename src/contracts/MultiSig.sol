pragma solidity 0.7.6;
pragma abicoder v2;

contract MultiSig {
    address contractOwner = 0x9A3A8Db1c09cE2771A5e170a01a2A3eFB93ADA17;
    address[] public approvers = [
        0xF9108C5B2B8Ca420326cBdC91D27c075ea60B749,
        0x7ab8a8dC4A602fAe3342697a762be22BB2e46d4d,
        0x9A3A8Db1c09cE2771A5e170a01a2A3eFB93ADA17
    ];

    event Deposit(address indexed fromThisGuy, uint valueGuy);
    event alertNewApproval(address indexed fromGuy, address sendToGuy, string  reasonGuy, uint amountGuy, uint idGuy);
    
    uint thresholdForApprovalToPass;
    uint256 contractBalance = address(this).balance;
    
 
    struct Custodian {
        address thisAddress;
        uint voteWeight;
    }
    Custodian[] custodians;

    function getContractOwner() public view returns (address) {
        return(contractOwner);
    }
    
    function firstRun() public returns(string memory){
        if (msg.sender != contractOwner){
            return('only contract owner can run this function.');
        }else {
        for (uint256 i = 0; i < approvers.length; i++) {
            Custodian memory newRequest = Custodian(approvers[i], 1);
            custodians.push(newRequest);
        }
        return('succeeded in setting approvers and vote weight!');
        }
    }

    struct Requests {
        address receipient;
        uint id;
        uint amount;
        string _reason;
        
    }
    Requests[] transferRequests;
   
    
    function getAllApprovalRequests() public view returns (Requests[] memory){
        return(transferRequests);
    }

    function newApproval(address _sendTo, string memory _reason, uint _amount) public {
        Requests memory newRequest = Requests(_sendTo, transferRequests.length, _amount, _reason);
        transferRequests.push(newRequest);
        emit alertNewApproval(msg.sender, _sendTo, _reason, _amount, transferRequests.length);
    }




    function depositEth() public payable {
        contractBalance += msg.value;
        emit Deposit(msg.sender, msg.value);
    }

    function getContractBalance() public view returns(uint){
        return contractBalance;
    }


    function approveRequest(uint _requestId, bool approval) public returns(bool succeeds) {

    }

    function getCustodians() public view returns (Custodian [] memory){
        return(custodians);
    }
    


}