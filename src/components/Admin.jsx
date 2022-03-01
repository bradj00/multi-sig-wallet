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
    const {Moralis, web3, enableWeb3, isWeb3Enabled, isWeb3EnableLoading, web3EnableError} = useMoralis();
    const {account} = useChain();
    const [stateId, setStateId] = useState(0); //hard coded ID for admin sendToken function run
    
    const [voteThreshold, setVoteThreshold] = useState(-1);

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
    const GetVoteThreshold = useWeb3ExecuteFunction({ 
        chain:'mumbai',
        abi: contractABI,
        contractAddress: contractAddress,
        functionName: "getVoteThreshold",
    }); 


 
    useEffect(()=>{
        if (!isWeb3Enabled){
            GetVoteThreshold.fetch();
        }
    },[isWeb3Enabled]);

    useEffect(()=>{
        console.log('fetching vote threshold..');
        setTimeout(function(){GetVoteThreshold.fetch();},500);
    },[]);

    useEffect(()=>{
        setVoteThreshold (GetVoteThreshold.data);
    },[GetVoteThreshold.data]);

    useEffect(()=>{

    },[CustodiansFromContract]);

    useEffect(()=>{
        console.log('account '+account);
        if (account != null){
            fetch();
            CustodiansFromContract.fetch();
        }
    },[account]);

  
function initializeContract(){
    console.log('initializing contract..');
    firstRunContract.fetch();
}

    const [hasContractBeenRun, setHasContractBeenRun] = useState(false);
    


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
                        <table style={{width:'30%'}}>
                            <tbody>
                                <tr>
                                    <td style={{}}>Contract: </td>
                                    <td style={{}}>{hasContractBeenRun?  <span style={{color:'#00ff00'}}>initialized</span> : <><span style={{color:'#ff0044'}}>uninitialized</span> <button style={{width:'50%'}} onClick={()=>{initializeContract()}}>Initialize</button></>} </td>
                                </tr>
                                <tr>
                                    <td style={{}}>Vote pass threshold: </td>
                                    <td style={{}}>{voteThreshold? parseInt(voteThreshold._hex) : <>loading..</> } </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div>
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