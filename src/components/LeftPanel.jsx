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



const LeftPanel = () => {
  return (
    <div>
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