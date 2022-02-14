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


const LeftPanel = () => {
  return (

    <div className="menu">
    <ul>
        <li> <Link to="/Proposals">Proposals</Link> </li>
        <li> <Link to="/Custodians">Custodians</Link> </li>
        <li> <Link to="/History">History</Link> </li>
    </ul>
    </div>

  )
}

export default LeftPanel