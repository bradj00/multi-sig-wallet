import React, { useEffect, } from 'react'
import { useMoralis, useWeb3ExecuteFunction, useWeb3Contract } from 'react-moralis';
import { contractABI, contractAddress } from '../contractVars/bankABI';

const ContractWalletBalance = () => {


    const { authenticate, logout, isAuthenticated, user,  } = useMoralis();

    const { data, error, runContractFunction, isFetching, isLoading } = useWeb3Contract({
        abi: contractABI,
        contractAddress: contractAddress,
        functionName: "getContractBalance",
    });
    // const { data, error, fetch, isFetching, isLoading } = useWeb3ExecuteFunction({
    //     abi: contractABI,
    //     contractAddress: contractAddress,
    //     functionName: "getContractBalance",
    // });


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
    
    return(
        <div>
         $BALANCE
        </div>
      );
}

export default ContractWalletBalance