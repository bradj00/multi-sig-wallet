import React, { useEffect } from 'react'
import {Link} from "react-router-dom";
import { useMoralis, useChain, useWeb3ExecuteFunction } from 'react-moralis';
import { contractABI, contractAddress } from '../../contractVars/bankABI';


const Styles = {
    sendButton:{
        width:'80%',
        backgroundColor:'#ccc',
        padding:'5px',
        color:'#111',
        opacity:'100%'
    },
    sendButtonDisabled:{ 
        width:'80%',
        backgroundColor:'#ccc',
        padding:'5px',
        color:'#ff0000',
        opacity:'20%'
    }
}


const ExecuteLink = (proposalId) => {
    const {account} = useChain();
    useEffect(()=>{
        fetchContractOwner.fetch();

    },[])
    // const { data, error, fetch, isFetching, isLoading } = useWeb3ExecuteFunction({ 
    const fetchContractOwner = useWeb3ExecuteFunction({ 
        chain:'mumbai',
        abi: contractABI,
        contractAddress: contractAddress,
        functionName: "getContractOwner",
    }); 
    const sendProposalTokens = useWeb3ExecuteFunction({   
        chain:'mumbai',
        abi: contractABI,
        contractAddress: contractAddress, 
        functionName: "sendTokens",
        params:{
            id: proposalId.proposalId.proposalId, 
        }
    }); 

    useEffect(()=>{
        console.log('ERROR: ',sendProposalTokens.error)
        if (sendProposalTokens.error != null){
            alert(sendProposalTokens.error.data.message)
        }
    },[sendProposalTokens.error])

    useEffect(()=>{
        console.log('account '+account);
        if (account != null){fetch();}
    },[account]);
    
    

    if (fetchContractOwner.data && !fetchContractOwner.isLoading && !fetchContractOwner.isFetching){
        if ( account.toUpperCase() == fetchContractOwner.data.toUpperCase() ){
            console.log('match!');
            switch (proposalId.proposalId.status){
                case 1:
                    return(<button style={Styles.sendButton} onClick={()=>{sendProposalTokens.fetch()}} >Execute</button>)
                    break;
                case 2:
                    return(<button style={Styles.sendButtonDisabled} onClick={()=>{sendProposalTokens.fetch()}} disabled>Closed</button>)
                    break;
            }

        }else {
            console.log('NO match');
            return(<></>);
        }
    }
    return(<></>);




}

export default ExecuteLink