import { queryByTitle } from '@testing-library/react';
import React, { useEffect, useState } from 'react'
import {useMoralis, useMoralisQuery, useERC20Transfers} from 'react-moralis'
import { getEllipsisTxt } from "../helpers/formatters";
import { contractABI, contractAddress, nativeToken } from '../contractVars/bankABI';


const Styles = {
  table: {
    marginTop:'10%',
    border:'0px solid #666', 
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



const History = () => {
  const {Moralis} = useMoralis();

  const [globalHistoryArr, setGlobalHistoryArr]         = useState([]);
  const [transferHistoryArr, setTransferHistoryArr]     = useState([]); 
  // const { fetchERC20Transfers, data, error, isLoading, isFetching, } = useERC20Transfers();
  const contractERC20Transfers = useERC20Transfers({
      chain:'mumbai',
      address: contractAddress
  });

  const getDeposits = useMoralisQuery(
    "DepositsA",
    query =>
      query
        .limit(25),
    [],
    { autoFetch: true },
  );
  const getPayments = useMoralisQuery(
    "PaymentsD",
    query =>
      query
        .limit(25),
    [],
    { autoFetch: true },
  );

  function displaystuff(){
    if (globalHistoryArr){
      return(<>{globalHistoryArr}</>)
    }
    else {
      return(<>loading...</>);
    }
  } 

  useEffect(()=>{
    console.log('\t\tcontract ERC20 transfers: ',contractERC20Transfers.data);
  },[contractERC20Transfers.data]);

  useEffect(()=>{
    console.log('fetching..');
    getDeposits.fetch();
    // getPayments.fetch();

    setTimeout(function(){contractERC20Transfers.fetchERC20Transfers();},300);
  },[]);

  useEffect(()=>{
    // console.log('DATA:',getDeposits.data);
    setGlobalHistoryArr(getDeposits.data)
  },[getDeposits.data]);
  
  useEffect(()=>{
    // console.log('DATA:',getPayments.data);
    setTransferHistoryArr(getPayments.data)
  },[getPayments.data]);
  
  function deriveAction(statusId){
    switch(statusId){
      case true:
        return(<>native transfer out</>);
      case false:
        return(<>Denied TX</>);
    }
  }

  return (
    <div>
      
      <div style={{color:'#fff', position:'absolute', display:'flex', paddingTop:'5%', marginLeft:'12.5%', alignContent:'left', justifyContent:'left', fontSize:'24px', width:'100%'}}>
        Global History
      </div>
      <div style={{display:'flex', alignContent:'center', justifyContent:'center', width:'100%'}}>
        <table style={Styles.table}>
          <tbody>
          <tr>
            <th style={Styles.th}>Action </th>
            <th style={Styles.th}>Initiator </th>
            <th style={Styles.th}>Token </th>
            <th style={Styles.th}>Amount </th>
            <th style={Styles.th}>TX hash </th>
            <th style={Styles.th}>Date </th>
          </tr>
      {globalHistoryArr? globalHistoryArr.map((item)=>{
        let txHash = 'https://mumbai.polygonscan.com/tx/'+item.attributes.transaction_hash;
        let timestamp = new Date(item.attributes.block_timestamp);


        return(
        <tr>
          <td>native deposit</td>
          <td>{getEllipsisTxt(item.attributes.fromThisGuy, 4)}</td>
          <td>{nativeToken}</td>
          <td style={{color:'#00cc00'}}>{Moralis.Units.FromWei(item.attributes.valueGuy)}</td>
          <td><a href={txHash} target="_blank">{getEllipsisTxt(item.attributes.transaction_hash, 4)}</a></td>
          <td>{timestamp.toString().substring(0,24)}</td>
        </tr>)   
        }): <>loading..</>
      }
      {contractERC20Transfers.data ? contractERC20Transfers.data.result.map((erc20Transfer, index2)=>{
        console.log('\t\ttransfer:', erc20Transfer);
        let txHash = 'https://mumbai.polygonscan.com/tx/'+erc20Transfer.transaction_hash;
        let timestamp = new Date(erc20Transfer.block_timestamp);
        if (erc20Transfer.to_address.toUpperCase() == contractAddress.toUpperCase() ){
          return(
          <tr key={index2}>
            <td>erc20 Deposit</td>
            <td>some person</td>
            <td>{getEllipsisTxt(erc20Transfer.address, 4)}</td>
            <td style={{color:'#00ffff'}}>{Moralis.Units.FromWei(erc20Transfer.value)}</td>
            <td><a href={txHash} target="_blank">{getEllipsisTxt(erc20Transfer.transaction_hash, 4)}</a></td>
            <td>{timestamp.toString().substring(0,24)}</td>      
          </tr>
          )
       }
        else if (erc20Transfer.from_address.toUpperCase() == contractAddress.toUpperCase() ){
          return(
          <tr key={index2}>
            <td>erc20 Transfer out</td>
            <td>some person</td>
            <td>{getEllipsisTxt(erc20Transfer.address, 4)}</td>
            <td>{Moralis.Units.FromWei(erc20Transfer.value)}</td>
            <td><a href={txHash} target="_blank">{getEllipsisTxt(erc20Transfer.transaction_hash, 4)}</a></td>
            <td>{timestamp.toString().substring(0,24)}</td>      
          </tr>
          )
       }
      }) : <>loading erc20 transfers</>
      }

      {transferHistoryArr? transferHistoryArr.map((item)=>{
            // console.log('ITEM: ',item.attributes);
            let txHash = 'https://mumbai.polygonscan.com/tx/'+item.attributes.transaction_hash;
            let timestamp = new Date(item.attributes.block_timestamp);
            return(
            <tr>
              <td >{deriveAction(item.attributes.didSucceed)}</td>
              <td >[contract owner]</td>
              <td>devETH</td>
              <td style={{color:'#cc0000'}}> {Moralis.Units.FromWei(item.attributes.paymentAmount)} </td>
              <td><a href={txHash} target="_blank">{getEllipsisTxt(item.attributes.transaction_hash, 4)}</a></td>
              <td>{timestamp.toString().substring(0,24)}</td>
            </tr>)   
          }): <>loading..</>
      }
          </tbody>
        </table>
      </div>

      <div style={{marginTop:'2%', display:'flex', alignContent:'center', justifyContent:'center', width:'100%'}}>
      <div style={{color:'#fff', position:'absolute', display:'flex', marginTop:'5%',marginLeft:'25%', alignContent:'left', justifyContent:'left', fontSize:'24px', width:'100%'}}>
        My History (0x0000...0000)
      </div>
        <table style={Styles.table}>
          <tbody>
          <tr>
            <th style={Styles.th}>Action </th>
            <th style={Styles.th}>Amount </th>
            <th style={Styles.th}>TX hash </th>
            <th style={Styles.th}>Date </th>
          </tr>
                  
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default History