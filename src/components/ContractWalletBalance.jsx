import React, { useEffect, } from 'react'
import { useMoralis, useWeb3ExecuteFunction } from 'react-moralis';
import { contractABI, contractAddress } from '../contractVars/bankABI.jsx';

const ContractWalletBalance = () => {


    const { authenticate, logout, isAuthenticated, user,  } = useMoralis();

    const { data, error, fetch, isFetching, isLoading } = useWeb3ExecuteFunction({
        abi: contractABI,
        contractAddress: contractAddress,
        functionName: "getContractBalance",
  
    });


    if (!isAuthenticated) {
      return (
        <div>
          <button onClick={() => authenticate()}>Authenticate</button>
        </div>
      );
    }


    


    if (data){
        console.log('got data back: ');
        console.log(data);
        return (
            <div>
                {JSON.stringify(data)} 
            </div>
            )  
    }
    
    return (<div>
        
        <button onClick={() => fetch()} disabled={isFetching}>Fetch data</button>
        {data && <pre>
          {JSON.stringify(data),null,2 }
          {console.log(data)}
        </pre>
        }
      </div>)
}

export default ContractWalletBalance