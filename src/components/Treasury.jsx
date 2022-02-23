import React, {useEffect, useState} from 'react'
import { useTokenPrice , useNativeBalance, useERC20Balances, useMoralis, useWeb3ExecuteFunction, useWeb3Contract, useWeb3Transfer, useMoralisSubscription, useChain } from 'react-moralis';
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
  const {Moralis} = useMoralis();

  // const { fetchTokenPrice, data: formattedData, error, isLoading, isFetching } = useTokenPrice({ address: "0x1f9840...1f984", chain: "eth" });
  const tokenPriceFetch = useTokenPrice({ address: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2", chain: "eth" });
  const [tokenPriceArray, setTokenPriceArray] = useState([])


  const getContractNativeBalanceMoralis = useNativeBalance( 
    {
      address: contractAddress,
      chain:'mumbai',
      //to_block:
    }
  );
  const getContractERC20BalanceMoralis = useERC20Balances( 
    {
      address: contractAddress,
      chain:'mumbai',
      //to_block:
    }
  );

  const [erc20TokenBalance, setErc20TokenBalance] = useState([]);
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
  setTimeout(function(){
    getContractBalanceCall();
    getContractNativeBalanceMoralis.getBalances();
    getContractERC20BalanceMoralis.fetchERC20Balances();
    tokenPriceFetch.fetchTokenPrice();
    
    // console.log('---___---');
    // console.log(getContractNativeBalanceMoralis);
  },500);

 },[]);

 useEffect(()=>{
   if(tokenPriceFetch.data != null){
    console.log('token price data:',tokenPriceFetch.data);
   }
  },[tokenPriceFetch.data]);

///////////////////////////////////////////////////
///////////////////////////////////////////////////
 useEffect(()=>{
  // if (getContractNativeBalanceMoralis.data != null){
  //   console.log('Native token balance:');
  //   console.log(getContractNativeBalanceMoralis.data.balance);
  // }
 },[getContractNativeBalanceMoralis.data]);

 useEffect(()=>{
  console.log('****',erc20TokenBalance);
 },[erc20TokenBalance]);
 
 useEffect(()=>{
  if (getContractERC20BalanceMoralis.data != null){
    console.log('ERC20 token balance:');
    console.log(getContractERC20BalanceMoralis.data);
    setErc20TokenBalance(getContractERC20BalanceMoralis.data);
  }
 },[getContractERC20BalanceMoralis.data]);
///////////////////////////////////////////////////
///////////////////////////////////////////////////

 useEffect(()=>{
   if (getContractBalance.data != null){
    let decimalContractBalance = parseInt(getContractBalance.data._hex, 16);
    setThisContractBalance(decimalContractBalance / (1000000000000000000));
   }
 },[getContractBalance.data]);


  return (
    <div>
        <br></br>
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
            <td style={Styles.td}>devETH </td>
            <td style={Styles.td}>{thisContractBalance} </td>
            <td style={Styles.td}>{tokenPriceFetch.data ? tokenPriceFetch.data.formattedUsd : 0}</td>
            <td style={Styles.td}>${tokenPriceFetch.data ? parseFloat(thisContractBalance * tokenPriceFetch.data.usdPrice).toFixed(2) : 0}</td>
          </tr>
          {erc20TokenBalance.map((item, index)=>{   
            return(
              <tr key={index}>
                <td style={Styles.td}>{item.symbol}</td> 
                <td style={Styles.td}>{Moralis.Units.FromWei(item.balance)}</td>
                <td style={Styles.td}>{tokenPriceFetch.data ? tokenPriceFetch.data.formattedUsd : 0}</td>
                <td style={Styles.td}>${parseFloat(Moralis.Units.FromWei(item.balance) * tokenPriceFetch.data.usdPrice).toFixed(2)}</td>
              </tr>  
              )           
          })}

          {/* <tr>
            <td>{JSON.stringify(erc20TokenBalance[1].symbol)}</td>
            <td>{JSON.stringify(erc20TokenBalance[1].balance)}</td>
          </tr> */}
          </tbody>
        </table>
        </div>

    </div> 
  )
}

export default Treasury