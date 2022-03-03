# Homebrew Multi-Sig Ethereum Wallet

A multi-signature Ethereum wallet built from the ground up using Web3 + ReactJS + Moralis. 

![alt text](https://github.com/bradj00/multi-sig-wallet/blob/master/public/screenshots/Proposals.png?raw=true)
![alt text](https://github.com/bradj00/multi-sig-wallet/blob/master/public/screenshots/Treasury.png?raw=true)

Set a number of wallets to control the treasury of a contract. This will hold any native token (ETH/MATIC) plus ERC-20 compatible tokens and allow a committee to vote on proposed transfers of treasury funds. 

You will need a browser web3 wallet such as Metamask to interact with the dApp. 

Live demo on the Mumbai Polygon testnet can be viewed at: https://multi-sig-dev.herokuapp.com/

#### SETUP
* from the root directory run `yarn install` then `yarn start` to launch the localhost UI. If you wanted to generate production files simply run `yarn build`

Once contract has been initialized via firstRun() it cannot be altered without re-deploying contract. This should be a useful feature but can easily be altered in `MultiSig.sol` before deployment.

* Configure `contractOwner` in `./contracts/MultiSig.sol` to the contract owner's wallet address
* Deploy contract to your favorite EVM chain (Ethereum, Polygon, etc.)

Before initialization from the `Admin Functions` page make the following adjustments in the browser for your needs: 

* Adjust `custodian accounts` in `Admin Functions` page before firstRun()
* Adjust vote threshold in `Admin Functions` page before firstRun()
* Adjust vote weights of custodians in `Admin Functions` page before firstRun() 


* In `./contractVars/bankABI.jsx` update `contractAddress` with contract address and generated ABI. The default `contractABI` should work fine otherwise.

#### MORALIS
* Moralis is used for most of the live data updating in the UI as well as contract event monitoring and other integrations. 
* Update `appId` and `serverUrl` in `./index.js` with your Moralis server information and add the below Contract Sync events to configure Moralis to sync these contract events:

1

2

3

4


#### USE
* Accept deposits into contract for treasury keeping
* Raise new proposals for fund management
* View `custodian accounts` for the contract. These addresses have vote weight on all proposals, configured by the `contractOwner` defined in `MultiSig.sol`
* View Historic Proposal outcomes
* Address Book with ENS support (on chain or Moralis based coming soon)
