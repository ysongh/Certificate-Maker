# Certificate Maker NFT
A dapp where users can use certificate template to create certificate and upload it to IPFS

## Info

### Project name
Certificate Maker NFT

### Working code in a public repo or PR to a public repo
https://github.com/ysongh/Certificate-Maker/tree/unstoppabledomains

### Recorded video demo of the integration (max. 3 mins)
https://youtu.be/8rVDe0ztf7Q

### Discord ID
You Song#4593

### UnstoppableDomain registered account email address
ysongweb3@gmail.com

## Features
- Users can create certificates and upload it to IPFS
- User can use certificate borders that are created by designers
- User can mint certificate as NFT
- Developers can see a list of bounties and choose which bounties to work on.
- Designers can earn cryptos when someone used their certificate borders to mint NFT of certificates.
- User will need to purchase membership to see all certificate borders.
- User can login with Unstoppable Domain

## Technologies
- React
- semantic-ui
- Node.js
- nft.storage (Store certificates and its metadata)
- slate.host (Store certificate borders)
- Polygon (Deploy the contract on Polygon Testnet for cheap gas fee)
- Chainlink (Price Feed)
- Unlock (Using Unlock's Paywall to get user to pay membership to access all certificate templates)
- Unstoppable Domains Login

## Running the dapp on local host
- Clone or download this repository
- Run `npm i` to install the dependencies
- Install and open up Ganache and click "Quickstart"
- Run `truffle migrate` to deploy the contract
- Create a file called 'config.js' on the src folder and add the following code
```
export const SLATEAPIKEY = "< Create API key from slate.host >";
export const CERTIFICATETEMPLATE_COLLECTIONID = "<Get Collection ID from slate.host>";
export const SERVER_URL = "http://localhost:4000/";
export const UNSTOPPABLEDOMAINS_CLIENTID = "< Your Unstoppable Domains Client Id >";
export const UNSTOPPABLEDOMAINS_CLIENTSECRET = "< Your Unstoppable Domains Client Secret >";
export const UNSTOPPABLEDOMAINS_REDIRECT_URI = "< Your Unstoppable Domains Redirect URL >";
export const UNSTOPPABLEDOMAINS_LOGOUT_REDIRECT_URI = "< Your Unstoppable Domains Logout Redirect URL >";
```
- Create a file called '.env' on the root folder and add the following code
```
NFTSTORAGE_APIKEY =  "< Create API key from nft.storage >";
MNEMONIC=< Your mnemonic >
ALCHEMYAPI_KEY = < Your Alchemy API key >
```
- Run `npm start` to start the dapp