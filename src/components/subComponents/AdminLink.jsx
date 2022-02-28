import React, { useEffect } from 'react'
import {Link} from "react-router-dom";
import { useMoralis, useChain, useWeb3ExecuteFunction } from 'react-moralis';
import { contractABI, contractAddress } from '../../contractVars/bankABI';


const AdminLink = () => {
    const {account} = useChain();

    //get contractOwner address from contract
    const { data, error, fetch, isFetching, isLoading } = useWeb3ExecuteFunction({ 
        chain:'mumbai',
        abi: contractABI,
        contractAddress: contractAddress,
        functionName: "getContractOwner",
    }); 


    useEffect(()=>{
        console.log('account '+account);
        if (account != null){fetch();}
    },[account]);
    
    

    if (data && !isLoading && !isFetching){
        // console.log('-------------------');
        // console.log('a: '+account.toUpperCase());
        // console.log('c: '+data.toUpperCase()); 
        //if contractOwner == account {return(stuff)}
        if ( account.toUpperCase() == data.toUpperCase() ){
            console.log('match!');
            return (
                <>
                     <li> <Link to="/Admin">🛡️ Admin Functions</Link> </li>
                </>
                )
        }else {
            // console.log('NO match');
            return(<></>);
        }
    }
    return(<></>);




}

export default AdminLink