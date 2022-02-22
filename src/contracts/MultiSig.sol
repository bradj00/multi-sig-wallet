pragma solidity 0.8.12;
pragma abicoder v2;

contract MultiSig {
    address contractOwner = 0x9A3A8Db1c09cE2771A5e170a01a2A3eFB93ADA17;
    address[] public approvers = [
        0xF9108C5B2B8Ca420326cBdC91D27c075ea60B749,
        0x7ab8a8dC4A602fAe3342697a762be22BB2e46d4d,
        0x813426c035f2658E50bFAEeBf3AAab073D956F31,
        0x90F8bf6A479f320ead074411a4B0e7944Ea8c9C1
    ];
    event Deposit(address indexed fromThisGuy, uint valueGuy);
    event alertNewApproval(address indexed fromGuy, address sendToGuy, string  reasonGuy, uint amountGuy, uint idGuy);
    event Approval(address indexed signer, uint requestId, uint approvalId);


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
   
    struct ApprovalStruct {
        uint proposalId;
        address custodianMember;
        uint status; //0 untouched. 1 approved. 2 rejected
    }
    //returns( uint[] memory)
    //approved[_requestId]
    mapping(uint => mapping(address=> uint)) public approvedStatus;
   
    function deposit() public payable {}

 
    function getApprovalStatus(uint _requestId) public view returns(ApprovalStruct [] memory)  {
        ApprovalStruct [] memory custodianApprovals = new ApprovalStruct[](approvers.length);
        for (uint i=0; i < approvers.length; i++) {
            ApprovalStruct memory newCustodianApprovals = ApprovalStruct(_requestId, approvers[i], approvedStatus[ _requestId ][ approvers[i] ]);
            custodianApprovals[i] = newCustodianApprovals;
        }
        return(custodianApprovals);
    }
 

    function withdraw(uint amount, address payable destAddr) public {
        require(msg.send == contractOwner, "Only owner can call this");
        require(amount <= balance, "Insufficient funds");

        destAddr.transfer(amount);
        balance -= amount;
        //emit TransferSent(....)
    }

 
    function getAllApprovalRequests() public view returns (Requests [] memory, ApprovalStruct[][] memory){ 
        ApprovalStruct [][] memory tempApprovalStatusArray = new ApprovalStruct[][](transferRequests.length);
        for (uint i=0; i < transferRequests.length; i++) {
            tempApprovalStatusArray[i] = getApprovalStatus(transferRequests[i].id);
        }
        return(transferRequests, tempApprovalStatusArray);
    }
//0xF9108C5B2B8Ca420326cBdC91D27c075ea60B749,0,0x7ab8a8dC4A602fAe3342697a762be22BB2e46d4d,0,0x813426c035f2658E50bFAEeBf3AAab073D956F31,0,0x90F8bf6A479f320ead074411a4B0e7944Ea8c9C1,0


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


    function approveRequest(uint _requestId, uint thisApproval) public {
        if ((thisApproval != 0) && (thisApproval != 1) && (thisApproval!=2)){return();}
        approvedStatus[_requestId][msg.sender] = thisApproval;
        emit Approval(msg.sender, _requestId, thisApproval);
    }

    function getCustodians() public view returns (Custodian [] memory){
        return(custodians);
    }
    


}