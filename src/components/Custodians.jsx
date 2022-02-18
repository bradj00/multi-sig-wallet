import React, {useState} from 'react'
import { useMoralis, useMoralisQuery, useMoralisSubscription } from 'react-moralis';

const Styles = {
  table: {
    marginTop:'10%',
    border:'1px solid black',
    width: '75%',
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


const Custodians = () => {

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

          </tbody>
        </table>
      </div>
    </div>
  );


  
}

export default Custodians