import React from 'react'

const Styles = {
  table: {
    marginTop:'10%',
    border:'0px solid #666', 
    width: '75%',
    tableLayout: 'auto'
  },
  th: {
    color:'#fff',
    fontSize:'20px',
    border:'2px solid #666'
  },
  td: {
    color:'#999'
  },
  addNewEntry:{
    border:'1px solid rgba(150,150,150,0.7)',
    width:'3%',
    height:'5%',
    fontSize:'35px',
    paddingBottom: '10px',
    position:'absolute',
    top:'10%',
  },

}

const User = () => {
  return (
    <div style={{width:'100%',marginLeft:'15%'}}>
      <div style={{position:'absolute', top:'10%', left:'45%', fontSize:'30px',}}>
        ADDRESS BOOK
      </div>
      
      <div>
      <div className="addNewEntry" style={Styles.addNewEntry}>
        +
      </div>
      <table style={Styles.table}>
      
          <tbody>
          <tr>
            <th style={Styles.th}>Address </th> 
            <th style={Styles.th}>Entry </th>
          </tr>
          <tr>
            <td style={Styles.td}>0x0000000</td>
            <td style={Styles.td}>Frank McGuy</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default User