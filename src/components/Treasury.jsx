import React, {useEffect, useState} from 'react'
import { useTokenPrice , useNativeBalance, useERC20Balances, useMoralis, useWeb3ExecuteFunction, useWeb3Contract, useWeb3Transfer, useMoralisSubscription, useChain } from 'react-moralis';
import { contractABI, contractAddress } from '../contractVars/bankABI';
import '../styles/styles.css';
import DepositTreasuryAssets from './DepositTreasuryAssets';

const Styles = {
  table: {
    
    right:'-1.5%',
    marginTop:'0.5%',
    // tableLayout: 'auto',
    borderSpacing: '0px',

    padding:'0px',
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
    paddingRight:'10px'
  },
  tokenEstValue: {
    justifyContent: 'right',
    display:'flex',
    color: '#ddd',
    fontSize:'12px',
    paddingRight:'10px'
  }

}

function commaNumber(x) {
	// return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return x.toLocaleString(navigator.language, { minimumFractionDigits: 2 });
}

const Treasury = () => {
  const {Moralis} = useMoralis();
  const [displayUserAssetsDiv, setDisplayUserAssetsDiv]             = useState('none');
  const [displayUserSelectAssetsDiv, setDisplayUserSelectAssetsDiv] = useState('block');

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

 function showSelectAssetDiv(){
   setDisplayUserAssetsDiv('block');
   setDisplayUserSelectAssetsDiv('none');
 }
 function resetSelectAssetDiv(){
   setDisplayUserAssetsDiv('none');
   setDisplayUserSelectAssetsDiv('block');
 }

    {/* <button onClick={()=>{submitDeposit.fetch()}}>Make Deposit</button> */}
  return (
    <div style={{}}>


      <div style={{display:'flex',display:displayUserSelectAssetsDiv, width:'33%', top:'25%', left:'10%', backgroundColor:'rgba(15,15,15,0.4)', border:'1px solid rgba(1,1,1,0.4)', height:'400px', position:'absolute', borderRadius:'20px' }}>
      <div style={{position:'absolute', left:'37%', top:'8%', fontSize:'35px'}}>DEPOSIT</div>
        <div className="selectAssetButton" onClick={()=>{showSelectAssetDiv() }}  style={{zIndex:'55', height:"8%", width:'30%',  backgroundColor:'rgba(0,130,255,0.5',  paddingTop:"2%", position:'absolute', top:'40%', right:'5%',  borderRadius:'25px'}}>
            Select A Token &nbsp;&nbsp;<strong>↓</strong>
        </div>
        <div style={{position:'absolute', top:'41%', left:'5%'}}>
          <form > 
            <label >
              <input onKeyPress={(event) => {
        if (!/[0-9,\.]/.test(event.key)) {
          event.preventDefault();
        }
      }} type="text" placeholder="0.0" style={{ fontSize:'35px', color: '#fff', backgroundColor:'#333', height:'25px', width:'70%', marginLeft:'-35%', padding:'5px',}} />
            </label>
          </form>
        </div>
        <div className="selectAssetButton" onClick={()=>{showSelectAssetDiv() }}  style={{zIndex:'55', height:"12%", width:'35%',  backgroundColor:'rgba(0,130,255,0.5',  fontSize:'33px',  position:'absolute', bottom:'5%', right:'35%',  borderRadius:'5px'}}>
            Submit
        </div>
      </div>
      <div style={{display:displayUserAssetsDiv}}>
      <div onClick={()=>{resetSelectAssetDiv() }} className="xButton" style={{position:'absolute', left:'38%', top:'15%', fontSize:'40px', userSelect:'none', }}>ⓧ </div>

        <div style={{position:'absolute', left:'15%', top:'8%', fontSize:'35px'}}>MY ASSETS</div>
        <div style={{position:'absolute', top:'15%', left:'2%', width:'34%', height:'80%', border:'6px solid rgba(10,10,10, 0.2)', borderRadius:'20px', overflow:'scroll'  }}>
        
        <table style={Styles.table}>
          <tbody>
          <tr>

            <td style={Styles.td}></td>
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
                    <div style={Styles.tokenQty}>{commaNumber(Moralis.Units.FromWei(item.balance) * 1 ) }</div>
                    <div style={Styles.tokenEstValue}>${commaNumber(Moralis.Units.FromWei(item.balance) * tokenPriceFetch.data.usdPrice)}</div>
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


      <div>
        <div style={{position:'absolute', right:'15%', top:'8%', fontSize:'35px'}}>TREASURY</div>
        <div style={{position:'absolute', top:'15%', right:'2%', width:'34%', height:'80%', border:'6px solid rgba(10,10,10, 0.2)', borderRadius:'20px', overflow:'scroll'  }}>
        
        <table style={Styles.table}>
          <tbody>
          <tr>

            <td style={Styles.td}></td>
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
                    <div style={Styles.tokenQty}>{commaNumber(Moralis.Units.FromWei(item.balance) * 1 ) }</div>
                    <div style={Styles.tokenEstValue}>${commaNumber(Moralis.Units.FromWei(item.balance) * tokenPriceFetch.data.usdPrice)}</div>
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
    </div> 
  )
}

export default Treasury