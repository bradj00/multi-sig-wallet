pragma solidity 0.7.6;
pragma abicoder v2;

contract MultiSig {
    event Deposit(address indexed fromThisGuy, uint valueGuy);
    event alertNewApproval(address indexed fromGuy, address sendToGuy, string  reasonGuy, uint amountGuy);
    
    
    uint256 contractBalance = address(this).balance;
    address[] public approvers;
    uint thresholdForApprovalToPass;

  //mapping(address => mapping(uint => bool) ) approvals;


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
        emit alertNewApproval(msg.sender, _sendTo, _reason, _amount);
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




}