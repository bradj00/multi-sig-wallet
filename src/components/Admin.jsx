import React, { useEffect, useState } from 'react'
import {Link} from "react-router-dom";
import { useMoralis, useChain, useWeb3ExecuteFunction } from 'react-moralis';
import { contractABI, contractAddress } from '../contractVars/bankABI';

const Styles = {
    table: {
        marginTop:'10%',
        border:'1px solid #666',
        width: '100%',
        tableLayout: 'auto'
      },
      th: {
    
        border:'2px solid #666'
      },
      td: {
    
        borderLeft:'1px solid #666',
        borderRight:'1px solid #666'
      },
}


const Admin = () => {
    const {Moralis} = useMoralis();
    const {account} = useChain();
    const [stateId, setStateId] = useState(0); //hard coded ID for admin sendToken function run


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
    const CustodiansFromContract = useWeb3ExecuteFunction({ 
        chain:'mumbai',
        abi: contractABI,
        contractAddress: contractAddress,
        functionName: "getCustodians",
    }); 
    const sendProposalTokens = useWeb3ExecuteFunction({ 
        chain:'mumbai',
        abi: contractABI,
        contractAddress: contractAddress,
        functionName: "sendTokens",
        params:{
            id: stateId, 
        }
    }); 

 
    useEffect(()=>{

    },[CustodiansFromContract]);

    useEffect(()=>{
        console.log('account '+account);
        if (account != null){
            fetch();
            CustodiansFromContract.fetch();
        }
    },[account]);

function sendTokenTransfer() {
    console.log('calling sendTokens(id: 0');
    sendProposalTokens.fetch();
}
    
function initializeContract(){
    console.log('initializing contract..');
    firstRunContract.fetch();
}

    const [hasContractBeenRun, setHasContractBeenRun] = useState(false);
    
    function initializeReturner(){
        if (hasContractBeenRun){
            return(
                <>
                    <span style={{color:'#00ff00'}}>initialized</span><br></br>
                    <span style={{display:"flex", alignContent:'left'}}>
                        
                        Vote "pass" threshold <span style={{color:'#00ff00'}}>&nbsp; &nbsp; 2 / 4</span>
                    </span>
                </>
            )
        }else {
            return(
            <>
                <span style={{color:'#ff0044'}}>uninitialized</span>
                <span>
                    <form>
                    Vote "pass" threshold &nbsp;
                    <select style={{backgroundColor:'#ff0044',}}>
                        <option value="ETH"> 1</option>
                        <option value="ETH"> 2</option>
                        <option value="ETH"> 3</option>
                        <option value="ETH"> 4</option>
                    </select>
                    </form>
                </span>
            </>
            )
        }
    }

    if (data && !isLoading && !isFetching && CustodiansFromContract.data && !CustodiansFromContract.isLoading && !CustodiansFromContract.isFetching){
        if ( account.toUpperCase() == data.toUpperCase() ){

            console.log('match!');
            if ((CustodiansFromContract.data.length > 0) && (hasContractBeenRun != true) ){
                setHasContractBeenRun(true);
            }
           
            return (
                <div style={{}}>
<br></br>           Admin Mode: Activated<br></br>

                    <div style={{display:'flex', alignContent:'left', marginLeft:'10%', marginTop:'4%', }}>
                        <button style={{}} onClick={()=>{initializeContract()}}>Initialize Contract</button>
                        <div style={{marginLeft:'3%'}}> Contract: {initializeReturner()}</div>
                    </div>

                    <div>
                    <button onClick={()=>{sendTokenTransfer()}}>Attempt transfer</button>
                
                    <table style={Styles.table}>
                        <tbody>
                            <tr>
                                <th style={Styles.th}>Custodian </th>
                                <th style={Styles.th}>Vote Weight </th>
                                <th style={Styles.th}>Change Weight </th>
                            </tr>

                     { 
                        CustodiansFromContract.data.map((custodian, index)=> (
                                <tr key={index}>
                                    <td style={Styles.td}> {custodian.thisAddress} </td>
                                    <td style={Styles.td}>{ parseInt(custodian.voteWeight._hex,16) }</td>
                                    <td style={Styles.td}>
                                        <select>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="3">4</option>
                                            <option value="3">5</option>
                                        </select>
                                    </td>
                                </tr>
                        ))
                      }

                        </tbody>
                    </table>
                    </div>    
                </div>
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