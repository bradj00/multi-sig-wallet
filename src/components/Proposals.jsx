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
    width: '100%',
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
    left: '3%',
    width: '95%',
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
  }
}


const Proposals = () => {
  
  const [updatedProposals, setUpdatedProposals] = useState([]);

  useMoralisSubscription("MultiSigAlertNewApprovalC", q => q, [], {
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
  
useEffect(()=>{
  fetch();
},[])


  if (data && !isLoading && !isFetching){

    return(
    <div style={Styles.container}>
        <div style={{position:'absolute', fontSize:'35px', width:'100%'}}>
          OPEN PROPOSALS
        </div>

        <div style={{position:'absolute', left:'3%', width:'95%'}}>
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