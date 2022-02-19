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
      <div className="menu">
      <ul>
          <li> <Link to="/Proposals">Proposals</Link> </li>
          <li> <Link to="/Custodians">Custodians</Link> </li>
          <li> <Link to="/History">History</Link> </li>
          <li> <Link to="/Treasury">Treasury</Link> </li>
          <li> <Link to="/AddressBook">Address Book</Link> </li>
      </ul>
      </div>
      
      <div className="menu" style={{left: '18%', position:'absolute', bottom:'15%'}}>
        <ul>
            <AdminLink />
        </ul>
      </div>
    </div>
  )
}

export default LeftPanel