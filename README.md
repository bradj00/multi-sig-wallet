# Homebrew Multi-Sig Ethereum Wallet
Set a number of wallets to control the treasury of a contract. This will hold any native token (ETH/MATIC) plus ERC-20 compatible tokens. 

This is my first take on a multi-sig Ethereum wallet, built from the ground up using Moralis + Web3 + React.

You will need a browser web3 wallet such as Metamask to interact and make contract calls in the dApp. 



#### SETUP
* Adjust Custodian accounts in `MultiSig.sol` before deploying contract. 
  -future feature add: add custodians from UI during firstRun()
* Adjust vote weights of custodians in `Admin Functions` page before firstRun() 
* Once contract has been initialized via firstRun() it cannot be altered without re-deploying contract. This should be a useful feature but can easily be altered in `MultiSig.sol` 


#### DEPLOY
* Deploy contract to your favorite EVM chain (Ethereum, Polygon, etc.)

#### USE
* Raise a new proposal
* View Custodian accounts for the contract
* View Historic Proposal outcomes
* Address Book with ENS support (coming soon) -- USE THIS WITH GREAT CAUTION AND ALWAYS DOUBLE-CHECK ALL ADDRESSES BEFORE SENDING!!
* 