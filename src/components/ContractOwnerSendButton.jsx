import React from 'react'
import { useMoralis, useWeb3ExecuteFunction, useWeb3Contract, useWeb3Transfer, useMoralisSubscription, useChain } from 'react-moralis';
import { contractABI, contractAddress } from '../contractVars/bankABI';


const Styles = {
    sendButton:{
        width:'80%',
        backgroundColor:'#ccc',
        padding:'5px'
    }
}

const ContractOwnerSendButton = (proposalId) => {

    const sendProposalTokens = useWeb3ExecuteFunction({ 
        chain:'mumbai',
        abi: contractABI,
        contractAddress: contractAddress,
        functionName: "sendTokens",
        params:{
            id: proposalId.proposalId, 
        }
    }); 


    return ( 
        <button style={Styles.sendButton} onClick={()=>{sendProposalTokens.fetch()}}>Execute (id {proposalId.proposalId})</button> 
    )
}

export default ContractOwnerSendButton