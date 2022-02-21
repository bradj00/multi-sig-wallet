import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Proposals from './Proposals';
import Custodians from './Custodians';
import History from './History';
import '../styles/styles.css'
import Admin from './Admin';
import AdminLink from './subComponents/AdminLink';
import Account from './Account';

const Styles = {
  leftPanel:{
    width:'100%',
    background: 'rgb(41,41,41)',
    background: 'linear-gradient(185deg, rgba(41,41,41,0.7595413165266106) 0%, rgba(0,0,0,0.6418942577030813) 99%, rgba(24,24,24,0.40379901960784315) 100%)'
  }
}

const LeftPanel = () => {
  return (
    <div style={Styles.leftPanel}>
      <div style={{position:'absolute', top:'3%'}}>
        <div><img width="30%" height="5%"  src="https://i.imgur.com/MjEP1KO.png"></img></div>
        <div>Multi-Sig Wallet</div>
        <div><Account /></div>
        </div>
        
      <div className="menu" style={{position:'absolute', top: '20%', left:'10%', display:'flex', textAlign:'left', }}>
        
      <ul>
          <li> <Link to="/Proposals">✏️  Proposals</Link> </li>
          <li> <Link to="/Custodians">🔑 Custodians</Link> </li>
          <li> <Link to="/History">📖 History</Link> </li>
          <li> <Link to="/Treasury">🔐 Treasury</Link> </li>
          <li> <Link to="/AddressBook">📧 Address Book</Link> </li>
      </ul>
      </div>
      
      <div className="menu" style={{left: '0%', position:'absolute', bottom:'15%'}}>
        <ul>
            <AdminLink />
        </ul>
      </div>
    </div>
  )
}

export default LeftPanel