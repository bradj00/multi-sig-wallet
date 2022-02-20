import React, { useEffect, useState, Component } from 'react'
import { useMoralis, useWeb3ExecuteFunction, useWeb3Contract, useWeb3Transfer, useMoralisSubscription, useChain } from 'react-moralis';
import { contractABI, contractAddress } from '../contractVars/bankABI';





const Styles= { 
  container: {
    display:'flex',
    justifyContent:'center',
    width: '100%',
  },
  table: {
    
    marginTop:'0%',
    border:'1px solid black',
    width: '75%',
    tableLayout: 'auto'
  },
  th: {

    border:'2px solid black'
  },
  td: {

    border:'1px solid black',
    // borderLeft:'1px solid black',
    // borderRight:'1px solid black'
  },
  propsalInfoDiv: {
    position:'absolute',
    left: '1%',
    width: '75%',
    height: '40%',
    bottom:'1%',
    border: '0px solid black',
    
  },
  table2:{
    position:'absolute',
    top: '0%',
    border:'1px solid black',
    width: '100%',
    tableLayout: 'auto',
    marginTop:'3%',
  },
  newProposalDiv: {
    position:'absolute',
    width: '23%',
    paddingBottom:'2%',
    right:'0%',
    top:'17%',
    border:'1px solid black',
    
  }
}


const Proposals = () => {
  
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
  
  useMoralisSubscription("MultiSigAlertNewApprovalR", q => q, [], { 
    onUpdate: data => updateProposalTable(data),
  });
  useMoralisSubscription("NewApprovalSignature", q => q, [], { 
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

  const { data, error, fetch, isFetching, isLoading } = useWeb3ExecuteFunction({
    chain:'mumbai',
    abi: contractABI,
    contractAddress: contractAddress,
    functionName: "getAllApprovalRequests",

  });  

  const submitNewProposal = useWeb3ExecuteFunction({ 
    chain:'mumbai',
    abi: contractABI,
    contractAddress: contractAddress,
    functionName: "newApproval",
    params: {_sendTo: receipient,  _reason: textArea, _amount: sendAmount}
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

  
  useEffect(()=>{
    fetch();
    getProposalInfo(0);
  },[])


  // useEffect(()=>{
  //   console.log(textArea, receipient, sendAmount);
  // },[textArea, receipient, sendAmount]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('submitted');
    submitNewProposal.fetch();
  }

  function getProposalInfo(id){
    console.log('id: '+id);
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
  console.log('updated state: ')
  console.log(updatedProposalsState)
  console.log(updatedProposalsState[1].receipient)
  console.log(updatedProposalsState[1].status)
},[updatedProposalsState]);

useEffect(()=>{
  console.log('got data back: ');
  console.log(getProposalApprovals.data);
  if (getProposalApprovals.data != null){
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

useEffect(()=>{
  console.log('account is: '+account)

},[account])

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


    console.log(signatureStatus, custodian);
    if (account == null){return<></>}
    if (account && custodian){

      if (custodian.toUpperCase() == account.toUpperCase()){
          return(
            <select onChange={(e) => setSelectedItemState(e.target.value)} >
              <option value={selectedItem}>{selectedItem}</option>
              <option value={notSelected1}>{notSelected1}</option>
              <option value={notSelected2}>{notSelected2}</option>
            </select>
            
          )
      }
      return(
        <>{selectedItem}</>

      )
    }
    
    

  }
  useEffect(()=>{
    console.log('selectedItemState:');
    console.log(selectedItemState);
    
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

  if (data && !isLoading && !isFetching){

    return(
    <div style={Styles.container}>
        <div style={{position:'absolute', fontSize:'35px', width:'100%'}}>
          Open Proposals
        </div>

        <div style={{ position:'absolute', left:'1%', width:'100%', top:'17%', height:'45%', overflowY:'scroll', "::WebkitScrollbar": { width: '0', }}}>
        <table style={Styles.table}>
          <tbody> 
          <tr>
            <th style={Styles.th}>ID </th>
            <th style={Styles.th}>Receipient </th>
            <th style={Styles.th}>Reason </th>
            <th style={Styles.th}>Amount </th>
            <th style={Styles.th}>Votes </th>
            <th style={Styles.th}>Status </th>
          </tr>
        { 
          updatedProposals.map((obj2, index) => (
            <tr key={index} style={{userSelect:'none'}} onClick={()=>{getProposalInfo(obj2.attributes.idGuy) }  }>
              <td style={Styles.td}>{obj2.attributes.idGuy  } </td>
              <td style={Styles.td}>{obj2.attributes.sendToGuy  }</td>
              <td style={Styles.td}>{obj2.attributes.reasonGuy  }</td>
              <td style={Styles.td}>{obj2.attributes.amountGuy }</td>
              <td style={Styles.td}> 0 / 3 </td>
              <td style={Styles.td}> In-Progress </td>
            </tr>
          ))
        }

          {
          data.slice(0).reverse().map((obj, index) => (
            
            <tr key={index} style={{userSelect:'none'}} onClick={()=>{getProposalInfo(parseInt(obj[1]._hex, 16)) }  }>
              <td style={Styles.td}>{ parseInt(obj[1]._hex, 16) }</td>
              <td style={Styles.td}>{ obj[0] }</td>
              <td style={Styles.td}>{JSON.stringify(obj[3])}</td>
              <td style={Styles.td}>{ parseInt(obj[2]._hex, 16) }</td>
              <td style={Styles.td}> 0 / 3 </td>
              <td style={Styles.td}> In-Progress </td>
            </tr>
            
          ))
          
         }
            

          </tbody>
        </table>
        </div>

        <div style={Styles.propsalInfoDiv}>
          Request ID: {selectedRequestId}
        <table style={Styles.table2}>
          <tbody>
          <tr>
            <th style={Styles.th}>Custodian</th>
            <th style={Styles.th}>Signature</th>
            <th style={Styles.th}></th>

          </tr>
          <tr  style={{userSelect:'none'}}   >
              <td style={Styles.td}>{updatedProposalsState[0].custodianMember} </td>
              <td style={Styles.td}>{statusFunction(updatedProposalsState[0].status, updatedProposalsState[0].custodianMember)} </td>
              <td style={Styles.td}>{isMeSignatureSubmit(updatedProposalsState[0].custodianMember)} </td>
              
          </tr>
          <tr  style={{userSelect:'none'}}   >
              <td style={Styles.td}>{updatedProposalsState[1].custodianMember} </td>
              <td style={Styles.td}>{statusFunction(updatedProposalsState[1].status, updatedProposalsState[1].custodianMember)} </td>
              <td style={Styles.td}>{isMeSignatureSubmit(updatedProposalsState[1].custodianMember)} </td>
          </tr>
          <tr  style={{userSelect:'none'}}   >
              <td style={Styles.td}>{updatedProposalsState[2].custodianMember} </td>
              <td style={Styles.td}>{statusFunction(updatedProposalsState[2].status, updatedProposalsState[2].custodianMember)} </td>
              <td style={Styles.td}>{isMeSignatureSubmit(updatedProposalsState[2].custodianMember)} </td>
          </tr>
            {/* {
            updatedProposalsState.map((custodian,index)=>{
              <tr key={index} style={{userSelect:'none'}}   >
                <td style={Styles.td}>{custodian.receipient} </td>
                <td style={Styles.td}>{custodian.status ? 'accepted' : 'rejected' } </td>
              </tr>
            })
            } */}
          </tbody>
        </table>
        </div>
        
        <div style={Styles.newProposalDiv}>
          <div style={{fontSize:'20px', width:'100%', marginBottom:'10%'}}>
            New Proposal
          </div>
          <div>
            <form onSubmit={handleSubmit}>

                <input type="text" name="Receipient" value={receipient} onChange={(e) => setReceipient(e.target.value)} placeholder="Receipient" style={{width:'70%'}}/><br></br><br></br>
                <input type="text" name="Amount"     value={sendAmount} onChange={(e) => setSendAmount(e.target.value)} placeholder="Amount" style={{width:'40%'}}/>&nbsp;&nbsp;
                <select>
                  <option value="ETH"> ETH</option>
                  <option value="USDC">USDC</option>
                  <option value="DOGE">DOGE</option>
                </select><br></br><br></br>
                <textarea value={textArea} onChange={(e) => setTextArea(e.target.value)} placeholder='Enter Reason...'style={{width:'80%', height:'200px'}}>
                </textarea>
              <br></br> <br></br>
             <input type="submit" value="Submit" />
            </form>
          </div>

        </div>

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