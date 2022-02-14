import React from 'react'
import ContractWalletBalance from './ContractWalletBalance'

const Header = () => {
  return (
    <div style={{display:'flex', justifyContent:'space-between', margin:'10px', width:'100%'}}>
        <div>
            Signed in as: <strong>0x123...aBcD</strong>
        </div>
        <div>
            <ContractWalletBalance />
        </div>
    </div>
  )
}

export default Header