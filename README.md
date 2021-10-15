# Certificate Maker NFT
A dapp where users can use certificate template to create certificate and upload it to IPFS

## Features
- Users can create certificates and upload it to IPFS
- User can use certificate borders that are created by designers
- User can mint certificate as NFT
- Developers can see a list of bounties and choose which bounties to work on.
- Designers can earn cryptos when someone used their certificate borders to mint NFT of certificates.
- User will need to purchase membership to see all certificate borders.

## Links to example use of IPFS
- (slate.host) <https://github.com/ysongh/Certificate-Maker/blob/master/src/pages/CertificateForm.js#L35>
- (nft.storage) <https://github.com/ysongh/Certificate-Maker/blob/master/server/pdf.js#L79>

## Technologies
- React
- semantic-ui
- Node.js
- nft.storage (Store certificates and its metadata)
- slate.host (Store certificate borders)
- Polygon (Deploy the contract on Polygon Testnet for cheap gas fee)
- Chainlink (Price Feed)
- Unlock (Using Unlock's Paywall to get user to pay membership to access all certificate templates)

## Running the dapp on local host
- Clone or download this repository
- Run `npm i` to install the dependencies
- Install and open up Ganache and click "Quickstart"
- Run `truffle migrate` to deploy the contract
- Create a file called 'config.js' on the src folder and add the following code
```
export const SLATEAPIKEY = "<Create API key from slate.host>";
export const CERTIFICATETEMPLATE_COLLECTIONID = "<Get Collection ID from slate.host>";
export const SERVER_URL = "http://localhost:4000/";
```
- Create a file called '.env' on the root folder and add the following code
```
NFTSTORAGE_APIKEY =  "<Create API key from nft.storage>";
MNEMONIC=< Your mnemonic >
```
- Run `npm start` to start the dapp