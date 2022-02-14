import logo from './logo.svg';
import './App.css';
import ContractWalletBalance from './components/ContractWalletBalance';
import LeftPanel from './components/LeftPanel';
import Header from './components/Header';
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

import Proposals from "./components/Proposals";
import Custodians from './components/Custodians';
import History from './components/History';
import Deposits from './components/Depsoits';


const Styles={
  container: {
    color:'#fff',
    height:'100%',
    width:'100%',
    backgroundColor:'#333',
    position:'absolute',
    display:'flex',
    justifyContent:'center'
  },
  header: {
    display:'flex',
    width:'100%',
    height:'5%',
    backgroundColor:'#555',
  },
  leftNavBar:{
    display:'flex',
    position:'absolute',
    left:'0%',
    top:'5%',
    height: '95%',
    width:'20%',
    justifyContent:'center',
    backgroundColor:'#777'
  },
  contractBalance:{

  },
  content:{
    position:'absolute',
    top:'6%',
    right:'0.5%',
    border: '1px solid #00ff00',
    width: '79%',
    height:'93%',

  }
}

function App() {
  return (
    <Router>
    <div className="App" style={Styles.container}>
      <div style={Styles.header}>
        <Header />
      </div>
      <div style={Styles.leftNavBar}>
        <LeftPanel />
      </div>
      <div style={Styles.content}>
        <Routes>
            <Route exact path="/" element={<Proposals/>} />

            <Route path='/Proposals'  element={<Proposals/>}/>
            <Route path='/Custodians' element={<Custodians/>} />
            <Route path='/History' element={<History/>} />
            <Route path='/Deposits' element={<Deposits/>} />
        </Routes>
      </div>
    </div>
    </Router>
  );
}

export default App;
