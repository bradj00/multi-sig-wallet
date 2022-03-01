import logo from './logo.svg';
import './App.css';
import ContractWalletBalance from './components/ContractWalletBalance';
import LeftPanel from './components/LeftPanel';
import Header from './components/Header';
import { enableWeb3, isWeb3Enabled, useMoralis, is } from "react-moralis";
import React, { useEffect } from 'react';
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
import Admin from './components/Admin';
import Treasury from './components/Treasury';
import AddressBook from './components/AddressBook';
import BackdropFilter from "react-backdrop-filter";


const Styles={
  container: {
    border: '0px solid #fff',
    color:'#fff',
    height:'100%',
    width:'100%',
    backgroundColor:'#333',
    position:'absolute',
    display:'flex',
    justifyContent:'center',
    overflow:'hidden',
  },
  header: {
    display:'flex',
    width:'100%',
    height:'5%',
    background: '#3B3E44',
    background: 'linear-gradient(to top, #18191C, #232528)',
  },
  leftNavBar:{
    display:'flex',
    position:'absolute',
    left:'0%',
    top:'0%',
    height: '98.5%',
    marginTop:'0.5%',
    width:'15%',
    justifyContent:'center',
    background: '#3B3E44',
    background: 'linear-gradient(to top, #18191C, #232528)',
  },
  contractBalance:{

  },
  content:{
    
    background: '#3B3E44',
    background: 'linear-gradient(to top, #18191C, #232528)',
    marginTop:'0.5%',
    position:'absolute',
    top:'0%',
    right:'0.3%',
    border: '0px solid #00ff00',
    width: '84.5%',
    height:'98.5%',
    

  }
}

function App() {
  const { web3, enableWeb3, isWeb3Enabled, isWeb3EnableLoading, web3EnableError } = useMoralis();
  
  //THE MAGIC SAUCE TO ENABLE WEB3
  useEffect(() => {
    if (!isWeb3Enabled) {
      console.log('enabling web3...');
      enableWeb3();
    }
    }, [web3]);
  
  return (
 
    <Router>
    <div className="App" style={Styles.container}>
      {/* <div style={Styles.header}>
        <Header />
      </div> */}
      <div style={Styles.leftNavBar}>
        <LeftPanel />
      </div>
  
      <div className="content" style={Styles.content} >
        <Routes>
            <Route exact path="/" element={<Treasury/>} />

            <Route path='/Proposals'  element={<Proposals/>}/>
            <Route path='/Custodians' element={<Custodians/>} />
            <Route path='/History' element={<History/>} />
            <Route path='/Deposits' element={<Deposits/>} />
            <Route path='/Admin' element={<Admin/>} />
            <Route path='/Treasury' element={<Treasury/>} />
            <Route path='/AddressBook' element={<AddressBook/>} />
        </Routes>
      </div>

    </div>
    </Router>

  );
}

export default App;
