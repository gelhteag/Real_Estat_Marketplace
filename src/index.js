import Web3 from "web3";
import SolnSquareVerifier from "../eth-contracts/build/contracts/SolnSquareVerifier.json";
import ERC721MintableComplete from "../eth-contracts/build/contracts/ERC721MintableComplete.json";
const zokratesProof = require("../zokrates/code/square/proof.json");
//import MarketArtifact from "../../build/contracts/Market.json";


const App = {
  web3: null,
  account: null,
  meta: null,

  meta721:null,
  

  start: async function() {
    const { web3 } = this;
    
    try {
      // get SolnSquareVerifier
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = SolnSquareVerifier.networks[networkId];
      this.meta = new web3.eth.Contract(
        SolnSquareVerifier.abi,
        deployedNetwork.address,
      
      );
      // get accounts  SolnSquareVerifier
      const accounts = await web3.eth.getAccounts();
      
      this.account = accounts[0];
      this.accountContract = this.meta.options.address;
      
      const ClientReceipt = web3.eth.contract(SolnSquareVerifier.abi);
      const clientReceiptContract = ClientReceipt.at(deployedNetwork.address);

      
       // get ERC721MintableComplete
      const networkId721 = await web3.eth.net.getId();
      const deployedNetwork721 = ERC721MintableComplete.networks[networkId721];
      this.meta721 = new web3.eth.Contract(
        ERC721MintableComplete.abi,
        deployedNetwork721.address,
      
      );
      
      // get accounts  ERC721MintableComplete
      const accounts721 = await web3.eth.getAccounts();
      
      this.account721 = accounts721[0];
      this.accountContract721 = this.meta.options.address;
      
      
     
    } catch (error) {
      console.error("Could not connect to contract or chain.");
    }
  },
   
  

  setStatus: function(message) {
    const status = document.getElementById("status");
    status.innerHTML = message;
  },
  
  minT: async function(){
    const { minT } = this.meta.methods;
    const { _owner } = this.meta.methods;
    const { addSolution } = this.meta.methods;

    const contractOwner = await _owner().call({from : this.account});
    
    const id = document.getElementById("id").value;
    await addSolution(...Object.values(zokratesProof.proof), zokratesProof.inputs, "0x2389A7B4c959741f958b441C875fF5FaD4553806", id).send({from : this.account});
    
    console.log(`contractOwner:  address ${contractOwner}  Type: ${typeof(contractOwner)} `);
    console.log(`this.account:  address ${this.account}  Type: ${typeof(this.account)} `);
    await minT("0x2389A7B4c959741f958b441C875fF5FaD4553806", id).send({from: this.account}).then(result =>{console.log(result)});
    
    
  },  
  
  ownerOf: async function(){
    const { tokenURI } = this.meta.methods;
    const idT = document.getElementById("idToken").value;
    console.log(idT);
    await tokenURI(idT).call({from: this.account}).then(result =>{console.log(result)});
    
  }
  
  

};

window.App = App;

window.addEventListener("load", async function() {
  if (window.ethereum) {
    // use MetaMask's provider
    App.web3 = new Web3(window.ethereum);
    await window.ethereum.enable(); // get permission to access accounts
  } else {
    console.warn("No web3 detected. Falling back to http://127.0.0.1:7545. You should remove this fallback when you deploy live",);
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    App.web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"),);
  }

  App.start();
});
