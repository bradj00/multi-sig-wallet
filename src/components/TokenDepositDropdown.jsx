import React, {useEffect, useState} from 'react'
import { useMoralis, useERC20Balances, useWeb3ExecuteFunction, useWeb3Contract, useWeb3Transfer, useMoralisSubscription, useChain } from 'react-moralis';
import { contractABI, contractAddress, nativeToken } from '../contractVars/bankABI';


const TokenDepositDropdown = () => {
    

  return (
    <div style={{marginLeft:'68%', marginTop:'-6%' }}>
        <select style={{backgroundColor:'#fff',}}>
            {
                treasuryTokenSymbols.map((item, key)=>{
                    return(<option key={key} value={item}> {item}</option>);
                })
            }
           {/* <option  value='5'> 5</option> */}
        </select>
    </div>
  )
}

export default TokenDepositDropdown