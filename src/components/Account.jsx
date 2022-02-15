import React, { useState, useEffect } from 'react'
import { useMoralis } from 'react-moralis';
import { getEllipsisTxt } from "../helpers/formatters";


const Account = () => {
    
    const { authenticate, logout, isAuthenticated, user } = useMoralis();
    const [address, setAddress] = useState();



    useEffect(() => {
        if (isAuthenticated) {
          setAddress(user.attributes.ethAddress);
        }
      }, [isAuthenticated]);

    if (!isAuthenticated) {
      return (
        <div>
          <button onClick={() => authenticate()}>Authenticate</button>
        </div>
      );
    }

    return (
        <div>
          Welcome <span style={{fontSize:'20px', color:'#00f8a2', marginRight:'20px'}}>{getEllipsisTxt(address, 5)}</span>
          <button onClick={() => logout()}>Sign Out</button>
        </div>
      );
}

export default Account