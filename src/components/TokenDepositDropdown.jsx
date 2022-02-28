import React, {useEffect, useState} from 'react'
import { useMoralis, useERC20Balances, useWeb3ExecuteFunction, useWeb3Contract, useWeb3Transfer, useMoralisSubscription, useChain } from 'react-moralis';
import { contractABI, contractAddress, nativeToken } from '../contractVars/bankABI';


const TokenDepositDropdown = () => {
    const [treasuryTokenSymbols, setTreasuryTokenSymbols] = useState([]);
    const getContractERC20BalanceMoralis = useERC20Balances( 
        {
            address: contractAddress,
            chain:'mumbai',
        }
        );

    useEffect(()=>{ 
        getContractERC20BalanceMoralis.fetchERC20Balances();
    },[])

    useEffect(()=>{ 
        if (getContractERC20BalanceMoralis.data && getContractERC20BalanceMoralis.data.length > 1){  
            console.log('\t\tTHIS TOKEN DATA: ', getContractERC20BalanceMoralis.data, getContractERC20BalanceMoralis.data[0].symbol)
            setTreasuryTokenSymbols([]); 
            let q = [nativeToken];
            getContractERC20BalanceMoralis.data.map((item)=>{ 
                q.push(item.symbol);
                console.log('\t\t',q);
            })
            setTreasuryTokenSymbols(q);
        }
    },[getContractERC20BalanceMoralis.data]);     



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