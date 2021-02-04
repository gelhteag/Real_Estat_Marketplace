var SolnSquareVerifier = artifacts.require('SolnSquareVerifier');
var Verifier = artifacts.require('Verifier');
var ERC721Mint = artifacts.require('ERC721MintableComplete');
const zokratesProof = require("../../zokrates/code/square/proof.json");

contract("TestSolnSquareVerifier", accounts => {
  const account1 = accounts[0];
  const account2 = accounts[1];
  const tokenId = [1,2,3];
  let contract;




console.log("address account 1  "+accounts[0]);
console.log("address account 2  "+accounts[1]);
  beforeEach(async() => {
    let VerifierContract = await Verifier.new({from: account1});
    //let ERC721MintContract = await ERC721Mint.new("DAHOUSE","DAH",{from: account1});
    //console.log("Mintable contract   "+ERC721MintContract.toString());
    contract = await SolnSquareVerifier.new(VerifierContract.address , {from: account1});
  });

  // Test if a new solution can be added for contract - SolnSquareVerifier
  it("should add new solution", async() => {
    let result = false;

    try {
      
      await contract.addSolution(...Object.values(zokratesProof.proof), zokratesProof.inputs, account2, tokenId[0], { from: account2 });
      result = true;
    } 
    catch(e) {
      console.log(e);
      result = false;
    }
    assert.equal(result, true);
  });

  it("should not add new solution if the proof was used previously", async() => {
    let result = false;

    try {
      await contract.addSolution(...Object.values(zokratesProof.proof), zokratesProof.inputs, account2, tokenId[0], { from: account2 });
      await contract.addSolution(...Object.values(zokratesProof.proof), zokratesProof.inputs, account2, tokenId[1], { from: account2 });
      result = true;
    } catch(e) {
      result = false;
    }
    assert.equal(result, false);
  });

  describe('Test if an ERC721 token can be minted for contract - SolnSquareVerifier', function () {
        beforeEach(async function () { 
             let VerifierContract = await Verifier.new({from: account1});
             //let ERC721MintContract = await ERC721Mint.new("DAHOUSE","DAH",{from: account1});
             contract = await SolnSquareVerifier.new(VerifierContract.address , {from: account1});
	      
             //contract = await SolnSquareVerifier.new(VerifierContract.address , ERC721MintContract.address, {from: account1});
             
            // console.log(`VerifierContract:        ${VerifierContract.address}  \nERC721MintContract:        ${ERC721MintContract.address}   \nSolnSquareVerifier:        ${contract.address}`)
             let owner = await contract._owner.call({ from: account2 });
             let test = await contract._isOwner.call({ from: account1 });
             console.log(`owner is  ${owner}        ${JSON.stringify(test)}`); 
	     	
        })

        it("should be able to mint new token after solution has been submitted",  async() => { 
             //let result = false;
            
		//     let result = true;
            await contract.addSolution(...Object.values(zokratesProof.proof), zokratesProof.inputs, account2, tokenId[2], { from: account1 });
            let result = await contract.minT.call(account2, tokenId[2], {from: account1});
            console.log(result);
        
   		  
            assert.equal(result, true);
        })
            

    });
});
