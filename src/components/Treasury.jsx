import React, {useEffect, useState} from 'react'
import { useTokenPrice , useNativeBalance, useERC20Balances, useMoralis, useWeb3ExecuteFunction, useWeb3Contract, useWeb3Transfer, useMoralisSubscription, useChain } from 'react-moralis';
import { contractABI, contractAddress } from '../contractVars/bankABI';
import '../styles/styles.css';

const Styles = {
  table: {
    position:'absolute',
    right:'-1.5%',
    marginTop:'0.5%',
    // width: '45%',
    tableLayout: 'auto',
    borderSpacing: '0px',
    border:'10px solid rgba(10,10,10, 0.2)',
    borderRadius:'20px',
    padding:'0px',
    overflow:'auto'

  },
  th: {
    color: '#0892ff',
    fontSize:'25px',
    // border:'2px solid #666'
    
  },
  td: {
    fontSize:'15px',
    

  },
  tdSymbol:{
    padding:'5px',
  },
  tokenSymbol:{
    fontSize:'20px',
    fontWeight:'bold',
    display:'flex',
    justifyContent:'left',   
    color: '#91907A',
  },
  tokenName:{
    fontSize:'11px',
    fontWeight:'normal',

    display:'flex',
    justifyContent:'left',        
  },
  tokenQty: {
    justifyContent: 'right',
    display:'flex',
    color: '#91907A',
    fontSize:'18px',
  },
  tokenEstValue: {
    justifyContent: 'right',
    display:'flex',
    color: '#ddd',
    fontSize:'12px',
  }



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
      address: '0x451E9948f930C33Bcda8d97F99fc1df4737921Db',
      chain:'eth',
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
    <div style={{}}>
        {/* <br></br> */}
    {/* <button onClick={()=>{submitDeposit.fetch()}}>Make Deposit</button> */}
        <div style={{position:'absolute', left:'3%', width:'95%',height:'85%',  }}>
        <table style={Styles.table}>
          <tbody>
          {/* <tr>
            <th style={Styles.th}><strong>Logo </strong></th>
            <th style={Styles.th}><strong>Asset </strong></th>
            <th style={Styles.th}><strong>Amount </strong></th>
            <th style={Styles.th}><strong>Swap Quote</strong> </th>
            <th style={Styles.th}><strong>Estimated Value</strong> </th>
          </tr> */}
          <tr>

            <td style={Styles.td}> </td>
                <td style={Styles.tdSymbol}>
                  <div>
                    <div style={Styles.tokenSymbol}>devETH</div>
                    <div style={Styles.tokenName}>testnet ETH</div>
                   </div>
                  </td>
                <td >
                  <div>
                    <div style={Styles.tokenQty}>{thisContractBalance}</div>
                    <div style={Styles.tokenEstValue}>$5.00</div>
                  </div>
                </td>  

          </tr>
          {erc20TokenBalance.map((item, index)=>{   
            return(
              <tr key={index}>
                <td style={Styles.td}> <img src={item.thumbnail} style={{marginLeft:'25%', height:'35px', paddingRight:'40px'}}></img></td>
                <td style={Styles.tdSymbol}>
                  <div>
                    <div style={Styles.tokenSymbol}>{item.symbol}</div>
                    <div style={Styles.tokenName}>{item.name}</div>
                   </div>
                  </td>
                <td >
                  <div>
                    <div style={Styles.tokenQty}>{parseFloat(Moralis.Units.FromWei(item.balance)).toFixed(4)}</div>
                    <div style={Styles.tokenEstValue}>${parseFloat(Moralis.Units.FromWei(item.balance) * tokenPriceFetch.data.usdPrice).toFixed(2)}</div>
                  </div>
                </td>
                {/* <td style={Styles.td}>{tokenPriceFetch.data ? tokenPriceFetch.data.formattedUsd : 0}</td> */}
                <td style={Styles.td}></td>
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