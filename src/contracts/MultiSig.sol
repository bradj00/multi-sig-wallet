pragma solidity 0.7.6;
pragma abicoder v2;

contract MultiSig {
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
    }




    function depositEth() public payable {
        contractBalance += msg.value;
    }

    function getContractBalance() public view returns(uint){
        return contractBalance;
    }


    function approveRequest(uint _requestId, bool approval) public returns(bool succeeds) {

    }




}