import React, { useEffect } from 'react'
import { useMoralis, useWeb3ExecuteFunction, useWeb3Contract, useWeb3Transfer } from 'react-moralis';
import { contractABI, contractAddress } from '../contractVars/bankABI';




const Proposals = () => {


  function runner(){
    console.log('calling on contract: '+contractAddress);
    fetch();
  }

  const { data, error, fetch, isFetching, isLoading } = useWeb3ExecuteFunction({
    chain:'mumbai',
    abi: contractABI,
    contractAddress: contractAddress,
    functionName: "getAllApprovalRequests",

  });  

  useEffect( ()=> {
    console.log('new data');
    console.log('data: '+data);
    console.log('error: '+error);
  },[data, error]);
  
  return(
    <div>
      <div>
        <button onClick={() => runner()} disabled={isFetching}>
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

export default Proposals