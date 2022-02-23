import React, { useEffect } from 'react'
import { useMoralis, useWeb3ExecuteFunction, useWeb3Contract, useWeb3Transfer, useMoralisSubscription, useChain } from 'react-moralis';
import { contractABI, contractAddress } from '../contractVars/bankABI';   


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

const ContractOwnerSendButton = (proposalId) => {

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
    switch (proposalId.proposalId.status){
        case 1:
            return(<button style={Styles.sendButton} onClick={()=>{sendProposalTokens.fetch()}} >Execute</button>)
            break;
        case 2:
            return(<button style={Styles.sendButtonDisabled} onClick={()=>{sendProposalTokens.fetch()}} disabled>Closed</button>)
            break;
    }

}

export default ContractOwnerSendButton