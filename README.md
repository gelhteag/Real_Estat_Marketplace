# Udacity Blockchain Capstone


###### The developpement and the test were done on a  Ubuntu 20.04.1 LTS -v focal.

## Module used:
 - Truffle v5.1.54
 - node v11.15.0
 - npm v6.7.0
 - truffle-hdwallet-provider
 - web3 v6.7.0

## Frontend dapp:
A minimal frontend is provide in order to mint the nft. [DAHOUSE](https://gateway.ipfs.io/ipfs/QmaVQgU9vnqGckaX6wm22wrfVQe7yeNzXbWzJRcBSpsLT1?fbclid=IwAR1UdyJSL7hoQnUMF98X7auIL8h6cWLOUCwCZ7CFqALbvbsRXtm8W_cn5rc#market) 



### ABI's of the contracts deployed

**SolnSquareVerifier**

![SolnSquareVerifier](https://i.imgur.com/AB5w4EI.png)


**Verifier**


![Verifier](https://i.imgur.com/FOH5oYX.png)



## Tests scripts to verify the solidity contracts: 

### Test method 

After git clone the repo

Go inside the directroy project and execute the command

```
 $npm instsall 
```

do it inside the src folder also

then to test

Go in the eth-contracts folder 

```
 $cd eth-contracts
```

then execute the command below (don't forget to start ganach)

```
 $truffle compile
```
 
 then

```
 $truffle test
```


![test screens logs](https://i.imgur.com/phIaZko.png)


## Deploy SolnSquareVerifier & Verifier contracts to Rinkeby network:
![contracts deployed logs](https://i.imgur.com/CTqUqos.png)


**contract Verifier    :** [etherscan verifier record contract trx](https://rinkeby.etherscan.io/address/0x4a69719de2071654d180b9fe6ddd18bfdb87ab22)  

**contract SolnSquareVerifier    :** [etherscan SolnSquareVerifier record contract trx](https://rinkeby.etherscan.io/address/0xfba5f6739c4f56c482a982805b0bd84bcd7e26e3)


## 10 NFT minted:

![NFT minted logs](https://i.imgur.com/PT3Zwmz.png)


**Can be check on etherscan**  [rinkeby.etherscan](https://rinkeby.etherscan.io/token/0xc7fcb15d6259ab1594c8969266a613179918f5c4?a=0x2389A7B4c959741f958b441C875fF5FaD4553806)


Getting the tokenURI of the nft minted to verify all's working 

![proof of tokenURI](https://i.imgur.com/wCqzJzg.png)


## Generate OpenSea marketplace

![opensea collection screen ](https://i.imgur.com/CiJvcPT.png)


**Storefront** [opensea_dahouse_storefront](https://testnets.opensea.io/assets/dahouse-v4)

Transaction done 5 house putted in sales and bought by 2 others accounts
![screen of one transaction bought as exemple](https://i.imgur.com/BQRItlb.png)


**screen of one transaction bought as exemple**


![account bought 3 nft](https://i.imgur.com/9beFiNk.png)


**account bought 3 nft**

![account bought 2 nft](https://i.imgur.com/mK596cN.png)


**account bought 2 nft**



# Project Resources

* [Remix - Solidity IDE](https://remix.ethereum.org/)
* [Visual Studio Code](https://code.visualstudio.com/)
* [Truffle Framework](https://truffleframework.com/)
* [Ganache - One Click Blockchain](https://truffleframework.com/ganache)
* [Open Zeppelin ](https://openzeppelin.org/)
* [Interactive zero knowledge 3-colorability demonstration](http://web.mit.edu/~ezyang/Public/graph/svg.html)
* [Docker](https://docs.docker.com/install/)
* [ZoKrates](https://github.com/Zokrates/ZoKrates)
