import React, { useState, useEffect } from 'react'
import { useMoralis } from 'react-moralis';
import { getEllipsisTxt } from "../helpers/formatters";


const Account = () => {
    
    const { authenticate, isAuthenticated, user } = useMoralis();
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
          Welcome <strong>{getEllipsisTxt(address, 5)}</strong>
        </div>
      );
}

export default Account