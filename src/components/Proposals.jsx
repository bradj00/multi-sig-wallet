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
    
    marginTop:'10%',
    border:'1px solid black',
    width: '75%',
    tableLayout: 'auto'
  },
  th: {

    border:'2px solid black'
  },
  td: {

    borderLeft:'1px solid black',
    borderRight:'1px solid black'
  },
  propsalInfoDiv: {
    position:'absolute',
    left: '1%',
    width: '75%',
    height: '40%',
    bottom:'5%',
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

  const [updatedProposals, setUpdatedProposals] = useState([]);

  useMoralisSubscription("MultiSigAlertNewApprovalG", q => q, [], {
    onUpdate: data => updateProposalTable(data),
  });

  function updateProposalTable(data){
    console.log('adding new proposal:');
    console.log(data);
    console.log(Object.keys(data));
    console.log(data.attributes);
    console.log(data.attributes.amountGuy);
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

  
  useEffect(()=>{
    fetch();
  },[])


  // useEffect(()=>{
  //   console.log(textArea, receipient, sendAmount);
  // },[textArea, receipient, sendAmount]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('submitted');
    submitNewProposal.fetch();
  }

  if (data && !isLoading && !isFetching){

    return(
    <div style={Styles.container}>
        <div style={{position:'absolute', fontSize:'35px', width:'100%'}}>
          Open Proposals
        </div>

        <div style={{position:'absolute', left:'1%', width:'100%'}}>
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
            <tr key={index}>
              <td style={Styles.td}> idNum </td>
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
            
            <tr key={index}>
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
            <th style={Styles.th}>Memo</th>

          </tr>
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