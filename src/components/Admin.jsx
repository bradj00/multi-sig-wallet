import React, { useEffect } from 'react'
import {Link} from "react-router-dom";
import { useMoralis, useChain, useWeb3ExecuteFunction } from 'react-moralis';
import { contractABI, contractAddress } from '../contractVars/bankABI';

const Styles = {
    table: {
        marginTop:'10%',
        border:'1px solid black',
        width: '100%',
        tableLayout: 'auto'
      },
      th: {
    
        border:'2px solid black'
      },
      td: {
    
        borderLeft:'1px solid black',
        borderRight:'1px solid black'
      },
}
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
    const CustodiansFromContract = useWeb3ExecuteFunction({ 
        chain:'mumbai',
        abi: contractABI,
        contractAddress: contractAddress,
        functionName: "getCustodians",
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
    
    
function initializeContract(){
    console.log('initializing contract..');
    firstRunContract.fetch();
}





    if (data && !isLoading && !isFetching && CustodiansFromContract.data && !CustodiansFromContract.isLoading && !CustodiansFromContract.isFetching){
        if ( account.toUpperCase() == data.toUpperCase() ){
            console.log('match!');
            let thisArr = CustodiansFromContract.data;
            console.log(thisArr);
            return (
                <>
                    Admin Mode: Activated<br></br>
                    <button style={{}} onClick={()=>{initializeContract()}}>Initialize Contract</button>

                    <table style={Styles.table}>
                        <tbody>
                            <tr>
                                <th style={Styles.th}>Custodian </th>
                                <th style={Styles.th}>Vote Weight </th>
                                <th style={Styles.th}>Change Weight </th>
                            </tr>

                     { 
                        thisArr.map((custodian, index)=> (
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