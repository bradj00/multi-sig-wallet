import React, {useState, useEffect} from 'react'
import { useMoralis, useMoralisQuery, useMoralisSubscription, useChain, useWeb3ExecuteFunction } from 'react-moralis';
import { contractABI, contractAddress } from '../contractVars/bankABI';


const Styles = {
  table: {
    marginTop:'10%',
    border:'1px solid #666',
    width: '75%',
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


const Custodians = () => {
  const {account} = useChain();
  const CustodiansFromContract = useWeb3ExecuteFunction({ 
    chain:'mumbai',
    abi: contractABI,
    contractAddress: contractAddress,
    functionName: "getCustodians",
  }); 

  useEffect(()=>{
    console.log('account '+account);
    if (account != null){
        fetch();
        CustodiansFromContract.fetch();
    }
  },[account]);

  if (CustodiansFromContract.data && !CustodiansFromContract.isLoading && !CustodiansFromContract.isFetching){
    return (
      <div style={{overflow:'hidden', width:'80%'}}>
        <div style={{position:'absolute', fontSize:'35px', width:'100%'}}>
          Custodians
          </div>
        <div style={{position:'absolute', left:'15%', width:'85%'}}>
          <table style={Styles.table}>
            <tbody>
            <tr>
            <th style={Styles.th}>Custodian </th>
            <th style={Styles.th}>Vote Weight </th>

            </tr>
            {CustodiansFromContract.data.map((custodian, index)=> (
              <tr key={index}>
                  <td style={Styles.td}> {custodian.thisAddress} </td>
                  <td style={Styles.td}>{ parseInt(custodian.voteWeight._hex,16) }</td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
  else{
    return(<></>)

  }


  
}

export default Custodians