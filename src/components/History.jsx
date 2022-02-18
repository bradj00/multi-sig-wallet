import React from 'react'

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

const History = () => {
  return (
    <div>
      <div style={{position:'absolute', fontSize:'35px', width:'100%'}}>
        Historic Actions
        </div>
      <div style={{position:'absolute', left:'3%', width:'95%'}}>
        <table style={Styles.table}>
          <tbody>
          <tr>
            <th style={Styles.th}>Asset </th>
            <th style={Styles.th}>Amount </th>
            <th style={Styles.th}>Estimated Value </th>

          </tr>

          </tbody>
        </table>
      </div>


    </div>
  )
}

export default History