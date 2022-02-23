import React from 'react'

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
            <th style={Styles.th}>Amount </th>
            <th style={Styles.th}>TX hash </th>
          </tr>
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