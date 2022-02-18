import React, { useEffect } from 'react'
import {Link} from "react-router-dom";
import { useMoralis, useChain, useWeb3ExecuteFunction } from 'react-moralis';
import { contractABI, contractAddress } from '../contractVars/bankABI';


const Admin = () => {
    const {account} = useChain();
    const { data, error, fetch, isFetching, isLoading } = useWeb3ExecuteFunction({ 
        chain:'mumbai',
        abi: contractABI,
        contractAddress: contractAddress,
        functionName: "getContractOwner",
    }); 
    const firstRunContract = useWeb3ExecuteFunction({ 
        chain:'mumbai',
        abi: contractABI,
        contractAddress: contractAddress,
        functionName: "firstRun",
    }); 


    useEffect(()=>{
        console.log('account '+account);
        if (account != null){fetch();}
    },[account]);
    
    
function initializeContract(){
    console.log('initializing contract..');
    
    firstRunContract.fetch();
}





    if (data && !isLoading && !isFetching){
        if ( account.toUpperCase() == data.toUpperCase() ){
            console.log('match!');
            return (
                <>
                    Admin Mode: Activated<br></br>
                    <button style={{}} onClick={()=>{initializeContract()}}>Initialize Contract</button>
                </>
            );
        }else {
            return (
                <div>
                    Restricted Panel
                </div>
            );
        }
    }
    return (
        <div>
            ADMIN PANEL FUNCTIONS
        </div>
    );
}

export default Admin;