import React from 'react'

const Styles = {
    th:{
        color:'gold',
    }

}

const Budgetary = () => {
  return (
    <div>
        <br></br><br></br>
        Budgetary:<br></br>
        Here we will define discretionary allowances that specified addresses may draw from at defined intervals (weekly, monthly, etc.)

        <div style={{display:'flex', alignContent:'left', marginLeft:'10%', marginTop:'4%', }}>
            <table style={{width:'90%'}}>
                <tbody>
                    <tr>
                        <th style={Styles.th}>Allowance </th>
                        <th style={Styles.th}>Amount </th>
                        <th style={Styles.th}>Token </th>
                        <th style={Styles.th}>Recurring</th>
                    </tr>
                    <tr>
                        <td style={{}}>0x0000000000000 </td>
                        <td style={{}}>0.05 </td>
                        <td style={{}}>devETH </td>
                        <td style={{}}>Weekly</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default Budgetary