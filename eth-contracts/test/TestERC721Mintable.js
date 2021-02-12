const truffleAssert = require('truffle-assertions');


var ERC721MintableComplete = artifacts.require('ERC721MintableComplete');

contract('TestERC721Mintable', accounts => {

    const account_one = accounts[0];
    const account_two = accounts[1];
    const account_three = accounts[2];
    let contract;
    let tokenMinted = 0;
    let tokenId = [];
    describe('match erc721 spec', function () {
        beforeEach(async function () { 

            contract = await ERC721MintableComplete.new("DAHouse", "DAHO", {from: account_one});
            for (let id = 0; id < 11; id++){
                 await contract.mint(account_two,id);
                 
                 tokenMinted = id + 1;
                 tokenId[id] = tokenMinted;
            }

            
        })

        it('should return total supply',  async() => { 
            const totalSupply = await contract.totalSupply.call({from: account_one});
            expect(Number(totalSupply)).to.equal(tokenMinted);
        })

        it('should get token balance',  async() => { 
            const balance = await contract.balanceOf(account_two);
            expect(Number(balance)).to.equal(11);

            
        })

        // token uri should be complete i.e: https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1
        it('should return token uri',  async() => { 
           const tokenUri = await contract.tokenURI(tokenId[2]); 
           expect(tokenUri).to.deep.equal(`${tokenUri}`);

        })

        it('should transfer token from one owner to another',  async() => { 
          
            let tx = await contract.transferFrom(account_two, account_three, tokenId[7], {from: account_two});
            truffleAssert.eventEmitted(tx, 'Transfer', (ev) => {
                return expect(ev.from).to.deep.equal(account_two) 
                       && expect(ev.to).to.equal(account_three)
                       && expect(Number(ev.tokenId)).to.equal(tokenId[7]);
            });

            expect(await contract.ownerOf(tokenId[7])).to.equal(account_three);
            expect(Number(await contract.balanceOf(account_two))).to.equal(10);
            expect(Number(await contract.balanceOf(account_three))).to.equal(1);
            expect(await contract.getApproved(tokenId[7])).to.equal("0x0000000000000000000000000000000000000000");
        
        })
    });

    describe('have ownership properties', function () {
        beforeEach(async function () { 
           contract = await ERC721MintableComplete.new("DAHouse", "DAHO", {from: account_one});
        })

        it('should fail when minting when address is not contract owner',  async() => { 
             let reverted = false;
             try {

    		     await contract.mint(account_two, 2, {from: account_three});
        
   		   }
   		   catch(e) {
        //console.log(e);
  	 	     reverted = true;
   	   }

            assert.equal(reverted, true, "Token can only be mint by the contract owner !");
        })
            

        it('should return contract owner',  async() => { 
            expect(await contract.owner({from: account_two})).to.equal(account_one); 
        })

    });

})

