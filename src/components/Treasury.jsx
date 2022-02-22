import React, {useEffect, useState} from 'react'
import { useMoralis, useWeb3ExecuteFunction, useWeb3Contract, useWeb3Transfer, useMoralisSubscription, useChain } from 'react-moralis';
import { contractABI, contractAddress } from '../contractVars/bankABI';


const Styles = {
  table: {
    marginTop:'10%',
    border:'1px solid black',
    width: '75%',
    tableLayout: 'auto',
    marginLeft: '13%'
  },
  th: {
    color: '#0892ff',
    fontSize:'30px',
    border:'2px solid black'
  },
  td: {
    fontSize:'20px',
    borderLeft:'1px solid black',
    borderRight:'1px solid black'
  },

}

const Treasury = () => {
  const [thisContractBalance, setThisContractBalance] = useState('loading..');

  const submitDeposit = useWeb3ExecuteFunction({ 
    chain:'mumbai',
    abi: contractABI,
    contractAddress: contractAddress,
    functionName: "depositEth",
    msgValue: 8880000000000000,
  }); 
  const getContractBalance = useWeb3ExecuteFunction({ 
    chain:'mumbai',
    abi: contractABI,
    contractAddress: contractAddress,
    functionName: "getContractBalance"
  }); 
  
  function getContractBalanceCall(){
    getContractBalance.fetch();
    console.log('fetching contract balance..');
  }
 useEffect(()=>{
  setTimeout(function(){getContractBalanceCall();},500);

 },[]);

 useEffect(()=>{
   if (getContractBalance.data != null){
    let decimalContractBalance = parseInt(getContractBalance.data._hex, 16);
    console.log('got contract balance data back: ');
    console.log(decimalContractBalance);
    console.log(decimalContractBalance / (1000000000000000000));
    setThisContractBalance(decimalContractBalance / (1000000000000000000));
   }
 },[getContractBalance.data]);

  return (
    <div>
        Treasury will be value of all token balances. Maybe Moralis can help with pricing<br></br>
    <button onClick={()=>{submitDeposit.fetch()}}>Make Deposit</button>
        <div style={{position:'absolute', left:'3%', width:'95%'}}>
        <table style={Styles.table}>
          <tbody>
          <tr>
            <th style={Styles.th}><strong>Asset </strong></th>
            <th style={Styles.th}><strong>Amount </strong></th>
            <th style={Styles.th}><strong>Swap Quote</strong> </th>
            <th style={Styles.th}><strong>Estimated Value</strong> </th>
          </tr>
          <tr>
            <th style={Styles.td}>devETH </th>
            <th style={Styles.td}>{thisContractBalance} </th>
            <th style={Styles.td}>$1.75</th>
            <th style={Styles.td}>$16.72</th>
          </tr>

          </tbody>
        </table>
        </div>

    </div> 
  )
}

export default Treasury