import React, { useEffect, useState, Component } from 'react'
import { useMoralis, useERC20Balances, useWeb3ExecuteFunction, useWeb3Contract, useWeb3Transfer, useMoralisSubscription, useChain } from 'react-moralis';
import { contractABI, contractAddress, nativeToken } from '../contractVars/bankABI';
import { getEllipsisTxt } from "../helpers/formatters";
import ContractOwnerSendButton from './ContractOwnerSendButton';
import ExecuteLink from './subComponents/ExecuteLink';

  



var Styles= { 
  container: {
    display:'flex',
    justifyContent:'center',
    width: '100%',
  },
  table: {
    
    marginTop:'0%',
    // border:'1px solid #ddd',
    width: '75%',
    tableLayout: 'auto'
  },
  th: {
    paddingLeft:'10px',
    paddingRight:'10px',
    border:'2px solid #444'
  },

  tdId: {
    color:"#ddd",
    fontSize:'20px',
    // paddingLeft:'10px',
    // paddingRight:'10px',
    
  },
  tdReason: {
    color:"#eee",
    fontSize:'18px',
    // border:'0.5px dashed #444',
    paddingLeft:'2px',
    paddingRight:'2px'
  },
  td: {
    paddingLeft:'5px',
    paddingRight:'5px'
    // border:'1px solid #ddd',
    // borderLeft:'1px solid black',
    // borderRight:'1px solid black'
  },
  tdRed: {
    paddingLeft:'5px',
    paddingRight:'5px',
    border:'1px solid #ff0000',
  },
  
  table2:{
    position:'absolute',
    top: '0%',
    border:'1px solid #ddd',
    width: '100%',
    tableLayout: 'auto',
    marginTop:'3%',
  },
  newProposalDiv: {
    position:'absolute',
    width: '23%',
    paddingBottom:'2%',
    right:'0.5%',
    top:'17%',
    border:'1px solid #ddd',
    // backgroundColor:'#3B3E44',
    backgroundColor:'rgba(55,55,55,0.3)',
    color:'#fff',
    
    
  }
}

const Proposals = () => { 

  
  const [voteThresholdValue, setVoteThresholdValue] = useState(-1);
  const [failedVoteThresholdArray, setFailedVoteThresholdArray] = useState([]);
  
  
  const [isErc20Selected, setIsErc20Selected] = useState(false);
  const [selectedAssetContractAddress, setSelectedAssetContractAddress] = useState();
  const [selectedAssetTokenSymbol, setSelectedAssetTokenSymbol] = useState();
////////////////
////////////////
////////////////

  const [totalVotes, setTotalVotes] = useState(-1);
  const [treasuryTokenSymbols, setTreasuryTokenSymbols] = useState([]);
  const {Moralis} = useMoralis();
  const [propsalInfoDivDisplay, setPropsalInfoDivDisplay] = useState('0%');
  const [voteCount, setVoteCount] = useState([]);
  const [contractOwner, setContractOwner] = useState();
  const [isAccountContractOwner, setIsAccountContractOwner] = useState(false); 


  const [sendAmountInWei, setSendAmountInWei] = useState('');
  const [sendAmount, setSendAmount] = useState('');
  const [receipient, setReceipient] = useState('');
  const [textArea, setTextArea] = useState('');

  const [updatedProposalsState, setUpdatedProposalsState] = useState(['0xF9108C5B2B8Ca420326cBdC91D27c075ea60B749',false,'0x7ab8a8dC4A602fAe3342697a762be22BB2e46d4d',false,'0x9A3A8Db1c09cE2771A5e170a01a2A3eFB93ADA17',false]);
  const [selectedRequestId, setSelectedRequestId] = useState(-1); 

  const [updatedProposals, setUpdatedProposals] = useState([]);
  
  ////////
  const [selectedItemState, setSelectedItemState] = useState();
  const [selectedItemStateId, setSelectedItemStateId] = useState();
  ////////
  
  useMoralisSubscription("MultiSigAlertNewApprovalBBB", q => q, [], { 
    onUpdate: data => updateProposalTable(data),
  });
  useMoralisSubscription("NewApprovalSignatureBBB", q => q, [], { 
    onUpdate: data => updateApprovalSignature(data),
  });

  function updateApprovalSignature(){
    getProposalApprovals.fetch();
  }

  function updateProposalTable(data){
    // console.log('adding new proposal:');
    // console.log(data);
    // console.log(Object.keys(data));
    // console.log(data.attributes);
    // console.log(data.attributes.amountGuy);
    let newProposalsArr = [...updatedProposals];
    newProposalsArr.reverse();
    newProposalsArr.push(data);
    newProposalsArr.reverse();
    setUpdatedProposals(newProposalsArr);
  }

    //getAllApprovalRequests
  const { data, error, fetch, isFetching, isLoading } = useWeb3ExecuteFunction({
    chain:'mumbai',
    abi: contractABI,
    contractAddress: contractAddress,
    functionName: "getAllApprovalRequests",

  });  

  const getContractERC20BalanceMoralis = useERC20Balances( 
    {
      address: contractAddress,
      chain:'mumbai',
    }
  );

  
///////////////////////
///////////////////////
  const getVoteThreshold = useWeb3ExecuteFunction({ 
    chain:'mumbai',
    abi: contractABI, 
    contractAddress: contractAddress,
    functionName: "getVoteThreshold",
  }); 
  const calculateRejectCount = useWeb3ExecuteFunction({ 
    chain:'mumbai',
    abi: contractABI,
    contractAddress: contractAddress,
    functionName: "calculateRejectCount",
  }); 
///////////////////////
///////////////////////



  const getContractOwner = useWeb3ExecuteFunction({ 
    chain:'mumbai',
    abi: contractABI,
    contractAddress: contractAddress,
    functionName: "getContractOwner",
  }); 

  const submitNewProposal = useWeb3ExecuteFunction({ 
    chain:'mumbai',
    abi: contractABI,
    contractAddress: contractAddress,
    functionName: "newApproval",
    params: {
      _sendTo: receipient,
      _reason: textArea,
      _amount: sendAmountInWei,
      isErc20: isErc20Selected,
      contractAddress: selectedAssetContractAddress,
      tokenSymbol: selectedAssetTokenSymbol 
    }
  }); 
  const getProposalApprovals = useWeb3ExecuteFunction({ 
    chain:'mumbai',
    abi: contractABI,
    contractAddress: contractAddress,
    functionName: "getApprovalStatus",
    params: {_requestId: selectedRequestId}
  }); 
  const signProposal = useWeb3ExecuteFunction({ 
    chain:'mumbai',
    abi: contractABI,
    contractAddress: contractAddress,
    functionName: "approveRequest",
    params: {_requestId: selectedRequestId, thisApproval: selectedItemStateId}
  }); 

  function getContractOwnerFunc(){
    console.log('fetching owner from contract...');
    getContractOwner.fetch();
  }
  useEffect(()=>{
    if (getContractOwner.data != undefined){ 
      setContractOwner(getContractOwner.data);
      console.log('contract owner is:'+contractOwner)   
    }
  },[getContractOwner.data]);

  useEffect(()=>{
    if ((contractOwner) && (account) &&(contractOwner.toUpperCase() == account.toUpperCase()) ){  
      setIsAccountContractOwner(true);
    }else {
      // setIsAccountContractOwner(false);
    } 
  },[contractOwner])

  useEffect(()=>{ 
    if (getContractERC20BalanceMoralis.data && getContractERC20BalanceMoralis.data.length > 1){  
        // console.log('\t\tTHIS TOKEN DATA: ', getContractERC20BalanceMoralis.data, getContractERC20BalanceMoralis.data[0].symbol)
        setTreasuryTokenSymbols([]); 
        let q = [{symbol:nativeToken, contractAddress: '0x0000000000000000000000000000000000000000', isErc20: false}];
        getContractERC20BalanceMoralis.data.map((item)=>{ 
            q.push({symbol: item.symbol, contractAddress: item.token_address, isErc20: true});
            // console.log('\t\t',q); 
        })
        setTreasuryTokenSymbols(q);
    }
},[getContractERC20BalanceMoralis.data]);  

  useEffect(()=>{ 
    calculateRejectCount.fetch();
    getVoteThreshold.fetch();
    fetch();
    getProposalInfo(-1);
    getContractOwnerFunc();
    getContractERC20BalanceMoralis.fetchERC20Balances();
  },[])
  
///////////
///////////
  useEffect(() => {
    if (getVoteThreshold.data != null){
      setVoteThresholdValue(getVoteThreshold.data);
    }
  },[getVoteThreshold.data]);

  useEffect(() => {
    if (calculateRejectCount.data != null){
      console.log('*****setting reject count array: ', calculateRejectCount.data)
      setFailedVoteThresholdArray(calculateRejectCount.data);
    }
  },[calculateRejectCount.data]);

  useEffect(() => {
    if (failedVoteThresholdArray != null){
      failedVoteThresholdArray.map((failsById)=>{
        if (failsById > (totalVotes - voteThresholdValue)){
          
        }
      });
    }
  },[failedVoteThresholdArray]);
///////////
///////////


function checkIfIdHasFailed(id){
  if (failedVoteThresholdArray != null){
      if (failedVoteThresholdArray[id] > (totalVotes - voteThresholdValue)){
        console.log('id['+id+'] failure', true);
        console.log(failedVoteThresholdArray[id], (totalVotes - voteThresholdValue))
        return(true);
      }else {
        console.log('id['+id+'] failure', false);
        console.log(failedVoteThresholdArray, (totalVotes - voteThresholdValue))
        return(false);
      }
  }else{
    console.log('failedVoteThresholdArray is not yet defined: ', failedVoteThresholdArray);
  }
}


  useEffect(() => {
    if(data != null){
      if (data[1][0] != null){
        console.log('\t\t\tSETTING TOTAL VOTES AT: ',data[1][0].length)
        setTotalVotes(data[1][0].length); //set total number of votes that can be cast
      }
    }
  },[data]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('\n\nsubmitted');
    console.log(typeof receipient, receipient );
    console.log(typeof textArea, textArea);
    console.log(typeof sendAmountInWei, sendAmountInWei);
    console.log(typeof isErc20Selected, isErc20Selected);
    console.log(typeof selectedAssetContractAddress, selectedAssetContractAddress);
    console.log(typeof selectedAssetTokenSymbol, selectedAssetTokenSymbol);
    submitNewProposal.fetch();

    // _sendTo: receipient,
    // _reason: textArea,
    // _amount: sendAmountInWei,
    // _isErc20: isErc20Selected,
    // _selectedAssetContractAddress: selectedAssetContractAddress,
    // _tokenSymbol: selectedAssetTokenSymbol 

  }

  function getProposalInfo(id){ 
    // console.log('id: '+id);
    setSelectedRequestId(id);
    getProposalApprovals.fetch();


  }

  function submitProposalSignature(){ 
    let approvalId = -1;
    switch (selectedItemState){
      case 'not seen': 
        approvalId = 0;
        break;
      case 'approved': 
        approvalId = 1;
        break;
      case 'rejected': 
        approvalId = 2;
        break;

    }
    setSelectedItemStateId(approvalId); 
    signProposal.fetch();
  }




useEffect(()=>{
  if (signProposal.error != null){
    console.log('proposal ERROR: ',signProposal.error)
  }
},[signProposal.error]);

useEffect(()=>{
  // console.log('got data back for id: '+selectedRequestId);
  // console.log(getProposalApprovals.data);
  if (getProposalApprovals.data != null){
    setPropsalInfoDivDisplay('100%');
    setUpdatedProposalsState(getProposalApprovals.data);
  }
},[getProposalApprovals.data])


const {account} = useChain();
function isMeSignatureSubmit(custodian){
  if (account == null){return<></>}
  if (account && custodian){
    if (custodian.toUpperCase() == account.toUpperCase()){
      return(<button onClick={()=>{submitProposalSignature()} } >Sign</button>)
    }else {
      return <></>
    }
  }
}



function calcRejections(id){
  let rejectionCountTemp  = 0;

  for (let i = 0; i <= data[1][id].length; i++){
    if (i == data[1][id].length){
      return (rejectionCountTemp);
    }
    let convertedStatus = parseInt(data[1][id][i].status);
    if (convertedStatus == 2){
      rejectionCountTemp++;
    }
  }

}

function calcVotes(id){
  let voteCountTemp = 0;

  for (let i = 0; i <= data[1][id].length; i++){
    if (i == data[1][id].length){
      return (voteCountTemp);
    }
    let convertedStatus = parseInt(data[1][id][i].status);
    if (convertedStatus != 0){
      voteCountTemp++;
    }

  }
}


function colorApprovalItem(param){
  switch(param){
    case 'not seen': 
      return({color: '#3366ff'})
      break;
    case 'approved': 
      return({color: '#00ff00'})
      break;
    case 'rejected': 
      return({color: '#ff0000'})
      break;
    
  }
}

useEffect(()=>{ 
  // console.log('votecount is:');
  // console.log(voteCount);

},[voteCount]);

useEffect(()=>{
  // console.log('account is: '+account)

},[account])

function updateTheSelectedTokenInfo(e){
  console.log(e.target[e.target.selectedIndex].getAttribute("data-contractaddress"), e.target[e.target.selectedIndex].getAttribute("data-iserc"), );
  let isErc20 = e.target[e.target.selectedIndex].getAttribute("data-iserc");
  setSelectedAssetTokenSymbol(e.target.value);
  if (isErc20 == 'true'){
    setIsErc20Selected(true);
  }else{
    setIsErc20Selected(false);
  }
  setSelectedAssetContractAddress(e.target[e.target.selectedIndex].getAttribute("data-contractaddress"));
}

function showNewProposalDiv(){ 
    return(
      <div style={Styles.newProposalDiv}>
        
        <div style={{fontSize:'20px', width:'100%', marginBottom:'10%'}}>
          New Proposal
        </div>
        <div>
                
          <form autoComplete="off" onSubmit={handleSubmit}> 
              <input type="text" name="Receipient" value={receipient} onChange={(e) => setReceipient(e.target.value)} placeholder="Receipient" style={{color: '#fff', backgroundColor:'#333',width:'70%'}}/><br></br><br></br>
              <input type="text" name="Amount"     value={sendAmount} onChange={(e) => setSendAmount(e.target.value)} placeholder="Amount" style={{backgroundColor:'#333',width:'40%'}}/>&nbsp;&nbsp;
              <select onChange={e => updateTheSelectedTokenInfo(e) } style={{backgroundColor:'#fff',}}> 
                  {
                      treasuryTokenSymbols.map((item, key)=>{
                          
                          return(<option data-iserc={item.isErc20.toString()} data-contractaddress={item.contractAddress} key={key} value={item.symbol}> {item.symbol}</option>);
                      })
                  }
                {/* <option  value='5'> 5</option> */}
              </select>
              <br></br><br></br>
              <textarea value={textArea} onChange={(e) => setTextArea(e.target.value)} placeholder='Enter Reason...'style={{backgroundColor:'#333', width:'80%', height:'200px'}}>
              </textarea>
            <br></br> <br></br>
          <input type="submit" value="Submit" />
          </form>
        </div>

      </div>

    )
  
}// isErc20Selected selectedAssetContractAddress  selectedAssetTokenSymbol

  function statusFunction(signatureStatus, custodian){
    signatureStatus = parseInt(signatureStatus,16);
    let selectedItem = 'ugga';
    let notSelected1 = 55;
    let notSelected2 = 66;  
    switch(signatureStatus){
      case 0: selectedItem = 'not seen'; notSelected1='approved'; notSelected2='rejected';break;
      case 1: selectedItem = 'approved'; notSelected1='not seen'; notSelected2='rejected';break;
      case 2: selectedItem = 'rejected'; notSelected1='approved'; notSelected2='not seen';break;
    }
     


    // console.log(signatureStatus, custodian);
    if (account == null){return<></>}
    if (account && custodian){

      if (custodian.toUpperCase() == account.toUpperCase()){
          return(
            <div >
              <select onChange={(e) => setSelectedItemState(e.target.value)} >
                {/* <option value={selectedItem}>{selectedItem}</option> */}
                <option  value={selectedItem}>{selectedItem}</option>
                <option  value={notSelected1}>{notSelected1}</option>
                <option  value={notSelected2}>{notSelected2}</option>
              </select>
              </div>
          )
      }
      return(
        <>{selectedItem}</>

      )
    }
    
    

  }
  useEffect(()=>{
    if (sendAmount != ''){
    setSendAmountInWei(Moralis.Units.ETH(sendAmount));
    }
  },[sendAmount])
  useEffect(()=>{
    // console.log('selectedItemState:');
    // console.log(selectedItemState);
    
    switch (selectedItemState){
      case 'not seen': 
        setSelectedItemStateId(0);
        break;
      case 'approved': 
        setSelectedItemStateId(1);
        break;
      case 'rejected': 
        setSelectedItemStateId(2);
        break;

    }
  },[selectedItemState])

function proposalStatusReturn(status){
  switch(status){
    case 1:
      return(<div style={{color:'#00ff00'}}>open</div>);
      break;
    case 2:
      return(<div style={{color:'#006600'}}>completed</div>);
      break;

  }
}
  
  if (data && data[0] && data != null && !isLoading && !isFetching){
    // console.log('GOT SOME DATA: ');
    // console.log(data);


    return(
    <div style={Styles.container}>
        

          <div style={{position:'absolute', fontSize:'25px', left: '-10%', top:'8%', zIndex:5, width:'100%'}}>
            Proposals
          </div>
          <div style={{ position:'absolute', left:'1%', width:'100%', top:'17%', height:'45%', overflowY:'scroll', "::WebkitScrollbar": { width: '0', }}}>
          <table style={Styles.table}>
            <tbody> 
            <tr>
              <th style={Styles.th}>ID </th>
              <th style={Styles.th}>Receipient </th>
              <th style={Styles.th}>Reason </th>
              <th style={Styles.th}>Amount </th>
              <th style={Styles.th}>Token </th>
              <th style={Styles.th}>Votes </th>
              <th style={Styles.th}>Status </th> 
            </tr>
          { 
            updatedProposals.map((obj2, index) => (   
              
              <tr key={index} style={{userSelect:'none'}} onClick={()=>{getProposalInfo(obj2.attributes.idGuy) }  }>
                <td style={Styles.tdId}>{obj2.attributes.idGuy  } </td>
                <td style={Styles.td}>{getEllipsisTxt(obj2.attributes.sendToGuy, 5)  }</td>
                <td style={Styles.tdReason}>{obj2.attributes.reasonGuy  }</td>
                <td style={Styles.td}>{Moralis.Units.FromWei(obj2.attributes.amountGuy) }</td>
                <td style={Styles.td}>devETH</td>
                <td style={Styles.td}> {calcVotes(obj2.attributes.idGuy)} </td>
                <td style={Styles.td}> {proposalStatusReturn(obj2.attributes.idGuy)} </td>
                {isAccountContractOwner ? <td><ContractOwnerSendButton proposalId={{proposalId: obj2.attributes.idGuy, status: proposalStatusReturn(obj2.attributes.idGuy)}}/> </td> : <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>}
              </tr>
              
            ))    
          } 

            {
            data[0].slice(0).reverse().map((obj, index) => {   
              let proposalStatus = parseInt(obj[4]._hex,16)
              let proposalId = parseInt(obj[1]);
              let didReject = calcRejections(proposalId);
              if (didReject > 0){didReject = true}
              


              // console.log('DATA m8: ',obj);
              return(
              <tr key={index} style={{userSelect:'none'}} onClick={()=>{getProposalInfo(parseInt(obj[1])) }  }>
                <td style={Styles.tdId}>{ parseInt(obj[1]) }</td>               
                <td onClick={() => {navigator.clipboard.writeText(obj[0])}} title={obj[0]} style={Styles.td}>{ getEllipsisTxt(obj[0], 5) }</td>                                    
                <td style={Styles.tdReason}>{obj[3]}</td>         
                <td style={Styles.td}>{ Moralis.Units.FromWei(''+parseInt(obj[2]._hex)) }</td>               
                <td style={Styles.td}>{obj.tokenSymbol}</td>         
                {/* <td style={Styles.td}>{ parseInt(obj[2]._hex) }</td>                */}
                                   
                {didReject? <td style={Styles.tdRed}> {calcVotes(parseInt(obj[1]) )+ ' / '+ data[1][obj[1]].length} </td> :  <td style={Styles.td}> {calcVotes(parseInt(obj[1]) )+ ' / '+ data[1][obj[1]].length}   </td> }                              
                {/* <td style={Styles.td}> {proposalStatusReturn(parseInt(obj[4]._hex,16))} </td> */}
                <td style={Styles.td}> {checkIfIdHasFailed(parseInt(obj[1])) ? <div style={{color:'#9C0000', fontWeight:'900'}}>rejected</div> : proposalStatusReturn(parseInt(obj[4]._hex,16)) }</td>
                {/* {isAccountContractOwner ? <td><ContractOwnerSendButton proposalId={{proposalId: proposalId, status: proposalStatus }}/> </td> : <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>} */}
                {checkIfIdHasFailed(parseInt(obj[1])) ? <></>  :  <ExecuteLink proposalId={{proposalId: proposalId, status: proposalStatus }}/> }
              </tr>
              )
             
            
              })
            
          }
              

            </tbody>
          </table>
        </div>

        <div style={{position:'absolute', left: '1%', width: '75%',height: '40%',bottom:'1%',border: '0px solid #ddd', opacity:propsalInfoDivDisplay,transition: 'all 0.2s ease'   }}>
          
          Request ID: {selectedRequestId}
        <table style={Styles.table2}>
          <tbody>
          <tr>
            <th style={Styles.th}>Custodian</th>
            <th style={Styles.th}>Signature</th>
            <th style={Styles.th}></th>

          </tr>
            {
              updatedProposalsState.map((proposalState,index)=>{
                return(
                  <tr key={index}  style={{userSelect:'none'}}   >
                    <td style={Styles.td}>{proposalState.custodianMember} </td>
                    <td style={Styles.td}>{statusFunction(proposalState.status, proposalState.custodianMember)} </td>
                    <td style={Styles.td}>{isMeSignatureSubmit(proposalState.custodianMember)} </td>
                  </tr>
                )
              })

            }

          </tbody>
        </table>
        </div>
        {showNewProposalDiv()}
        

      </div>
    );
  }else {
  return(
    <div>
      <div>
        <button onClick={() => fetch()} disabled={isFetching}>
          Fetch data
        </button>
      </div>

      <div>
        <div style={{display:'flex',fontSize:'15px'}}>
          <strong>contract:</strong>
        </div> 
        <div style={{display:'flex',justifyContent:'left',alignContent: 'left', color:'#00ffff',fontSize:'15px'}}> 
          {contractAddress} 
        </div>
      </div>


      <div>
       error: {JSON.stringify(error)}
      </div>
      <div>
       data:  {JSON.stringify(data)}
      </div>
      <div>
       isFetching:  {JSON.stringify(isFetching)}
      </div>
      <div>
       isLoading:  {JSON.stringify(isLoading)}
      </div>


      


    </div>
    
  );
  }
}

export default Proposals