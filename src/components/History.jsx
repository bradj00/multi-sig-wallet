import { queryByTitle } from '@testing-library/react';
import React, { useEffect, useState } from 'react'
import {useMoralis, useMoralisQuery} from 'react-moralis'
import { getEllipsisTxt } from "../helpers/formatters";

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



const History = () => {
  const {Moralis} = useMoralis();

  const [globalHistoryArr, setGlobalHistoryArr] = useState([]);
  const [userHistoryArr, setUserHistoryArr]     = useState([]);

  const getDeposits = useMoralisQuery(
    "Deposits",
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
    console.log('fetching..');
    getDeposits.fetch();
  },[]);

  useEffect(()=>{
    console.log('DATA:',getDeposits.data);
    setGlobalHistoryArr(getDeposits.data)
    
  },[getDeposits.data]);
  
  return (
    <div>
      
      <div style={{position:'absolute', display:'flex', paddingTop:'5%', marginLeft:'12.5%', alignContent:'left', justifyContent:'left', fontSize:'22px', width:'100%'}}>
        Global History
      </div>
      <div style={{display:'flex', alignContent:'center', justifyContent:'center', width:'100%'}}>
        <table style={Styles.table}>
          <tbody>
          <tr>
            <th style={Styles.th}>Action </th>
            <th style={Styles.th}>Date </th>
            <th style={Styles.th}>Initiator </th>
            <th style={Styles.th}>Amount </th>
            <th style={Styles.th}>TX hash </th>
          </tr>
      {globalHistoryArr? globalHistoryArr.map((item)=>{
        let txHash = 'https://mumbai.polygonscan.com/tx/'+item.attributes.transaction_hash;
        let timestamp = new Date(item.attributes.block_timestamp);


        return(
        <tr>
          <td>Deposit</td>
          <td>{timestamp.toString().substring(0,24)}</td>
          <td>{getEllipsisTxt(item.attributes.fromThisGuy, 4)}</td>
          <td>{Moralis.Units.FromWei(item.attributes.valueGuy)}</td>
          <td><a href={txHash} target="_blank">{getEllipsisTxt(item.attributes.transaction_hash, 4)}</a></td>
        </tr>)   
        }): <>loading..</>
      }
          </tbody>
        </table>
      </div>

      <div style={{marginTop:'10%', display:'flex', alignContent:'center', justifyContent:'center', width:'100%'}}>
      <div style={{position:'absolute', display:'flex', marginTop:'5%',marginLeft:'25%', alignContent:'left', justifyContent:'left', fontSize:'22px', width:'100%'}}>
        My History (0x0000...0000)
      </div>
        <table style={Styles.table}>
          <tbody>
          <tr>
            <th style={Styles.th}>Action </th>
            <th style={Styles.th}>Amount </th>
            <th style={Styles.th}>TX hash </th>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default History