import React, { useEffect, useState } from 'react'
import { useMoralis, useWeb3ExecuteFunction, useWeb3Contract, useWeb3Transfer } from 'react-moralis';
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

    borderLeft:'1px solid black'
  }
}


const Proposals = () => {


  const { data, error, fetch, isFetching, isLoading } = useWeb3ExecuteFunction({
    chain:'mumbai',
    abi: contractABI,
    contractAddress: contractAddress,
    functionName: "getAllApprovalRequests",

  });  


  if (data && !isLoading && !isFetching){
    console.log('asdlfkjdsflksjdfsldkfjsdlk');
    return(
    <div style={Styles.container}>
        <div style={{position:'absolute', fontSize:'35px', width:'100%'}}>
          PROPOSALS
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
          </tr>
         { 
          
          data.map((obj, index) => (
            <>
            <tr key={index}>
              <td style={Styles.td}>{ parseInt(obj[1]._hex, 16) }</td>
              <td style={Styles.td}>{ obj[0] }</td>
              <td style={Styles.td}>{JSON.stringify(obj[3])}</td>
              <td style={Styles.td}>{ parseInt(obj[2]._hex, 16) }</td>
              <td style={Styles.td}> 0 / 3 </td>
            </tr>
            </>
          ))
          
         }
            

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