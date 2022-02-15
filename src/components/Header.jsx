import React from 'react'
import Account from './Account'
import ContractWalletBalance from './ContractWalletBalance'

const Header = () => {

  return (
    <div style={{display:'flex', justifyContent:'space-between', margin:'10px', width:'100%'}}>
        <div>
            <Account />
        </div>
        <div>
            <ContractWalletBalance />
        </div>
    </div>
  )
}

export default Header