import logo from './logo.svg';
import './App.css';
import ContractWalletBalance from './components/ContractWalletBalance';
import LeftPanel from './components/LeftPanel';
import Header from './components/Header';

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
}

function App() {
  return (
    
    <div className="App" style={Styles.container}>
      <div style={Styles.header}>
        <Header />
      </div>
      <div style={Styles.leftNavBar}>
        <LeftPanel />
      </div>

    </div>
  );
}

export default App;
