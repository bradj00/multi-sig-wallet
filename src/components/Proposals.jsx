import React, { useEffect, useState, Component } from 'react'
import { useMoralis, useWeb3ExecuteFunction, useWeb3Contract, useWeb3Transfer, useMoralisSubscription } from 'react-moralis';
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

  useMoralisSubscription("MultiSigAlertNewApprovalK", q => q, [], { 
    onUpdate: data => updateProposalTable(data),
  });

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


function statusFunction(signatureStatus){
  // console.log('status');
  // console.log(signatureStatus._hex);
  switch(parseInt(signatureStatus,16)){
    case 0: return <>'not seen'</>;
    case 1: return <>'accepted'</>;
    case 2: return <>'rejected'</>;
  }
}

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
            <th style={Styles.th}>Approvals </th>
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
        <table style={Styles.table2}>
          <tbody>
          <tr>
            <th style={Styles.th}>Custodian</th>
            <th style={Styles.th}>Signature</th>

          </tr>
          <tr  style={{userSelect:'none'}}   >
              <td style={Styles.td}>{updatedProposalsState[0].custodianMember} </td>
              <td style={Styles.td}>{statusFunction(updatedProposalsState[0].status)} </td>
              {/* <td style={Styles.td}>{updatedProposalsState[0].status ? 'accepted' : 'rejected' } </td> */}
          </tr>
          <tr  style={{userSelect:'none'}}   >
              <td style={Styles.td}>{updatedProposalsState[1].custodianMember} </td>
              <td style={Styles.td}>{statusFunction(updatedProposalsState[1].status)} </td>
          </tr>
          <tr  style={{userSelect:'none'}}   >
              <td style={Styles.td}>{updatedProposalsState[2].custodianMember} </td>
              <td style={Styles.td}>{statusFunction(updatedProposalsState[2].status)} </td>
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