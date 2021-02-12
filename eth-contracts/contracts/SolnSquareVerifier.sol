pragma solidity >0.4.24;

// Define a contract call to the zokrates generated solidity contract <Verifier> or <renamedVerifier>
import "./ERC721Mintable.sol";
import "./Verifier.sol";


// Define another contract named SolnSquareVerifier that inherits from your ERC721Mintable class
contract SolnSquareVerifier is ERC721MintableComplete {
  Verifier private verifierContract;
  //ERC721MintableComplete private erc721MintableComplete;

  constructor(address verifierAddress) ERC721MintableComplete("DAHOUSE", "DAO")  public {
    verifierContract = Verifier(verifierAddress);
    //erc721MintableComplete = ERC721MintableComplete(erc721address);
  }

  // Define a solutions struct that can hold an index & an address
  struct Solution {
    uint256 tokenId;
    address owner;
    uint256[2] input;
    bool minted;
  }

  // Define an array of the above struct
  mapping(bytes32 => Solution) solution;

  // Define a mapping to store unique solutions submitted
  mapping(uint256 => bytes32) private solutionSubmitted;

  // Create an event to emit when a solution is added
  event SolutionAdded(address indexed owner, uint256 indexed tokenId , bool indexed minted);
  
  modifier requireSolutionIsverifialbe
  					(
  					uint[2] memory solA,
  					uint[2][2] memory solB,
  					uint[2] memory solC,
  					uint[2] memory input
  					)
  	{
  		require(verifierContract.verifyTx(solA, solB, solC, input), "wrong input unable to verify the solution");
  		_;				
  	}
  
  modifier requireSolution
  					(
  					 uint256 tokenId
  					)
  	{
   	       require(solutionSubmitted[tokenId] != bytes32(0), "no solution submitted for the given token ID");
   	       _;
  	}
  modifier requireNotMinted
  					(
  					 uint256 tokenId
  					)
  	{
   	       require(solution[solutionSubmitted[tokenId]].minted = true, "token already  minted");
   	       _;
  	}
  modifier requireIsOwner
  					(
  					 address to,
  					 uint256 tokenId
  					)
  	{
               require(solution[solutionSubmitted[tokenId]].owner == to, "wrong token owner address provided");
               _;
  	}	
   



  function _transferOwnership(address newOwner) public {
        
        super.transferOwnership(newOwner);
    }
  // Create a function to add the solutions to the array and emit the event
  function addSolution 
  			(
  			uint[2] memory a,
  			uint[2][2] memory b,
  			uint[2] memory c,
  			uint[2] memory input,
  			address account,
  			uint256 tokenId
  			) 
  			public 
  			requireSolutionIsverifialbe(a,b,c,input) 
  	{
    		
	    // Hash a, b, c and the input to create a unique key for the solution
	    bytes32 solutionHash = keccak256(abi.encodePacked(a, b, c, input));

	    require(solution[solutionHash].tokenId == 0, "solution exist already generate a new one using ZoKrates");

	    solutionSubmitted[tokenId] = solutionHash;
	    solution[solutionHash].owner = account;
	    solution[solutionHash].tokenId = tokenId;
	    solution[solutionHash].input = input;
	    solution[solutionHash].minted = false;
	    emit SolutionAdded(account, tokenId , solution[solutionHash].minted );
  	}
  	
  	
  
  // Create a function to mint new NFT only after the solution has been verified
  //  - make sure the solution is unique (has not been used before)
  //  - make sure you handle metadata as well as token supply
  function _owner() public returns(address)
  	{
  		return super.owner();
  	}
  function _isOwner() public returns(address, address, bool)
  	{
  		return super.isOwner();
  	}   	
  function minT
  		(
  		 address to,
  		 uint256 tokenId
  		)
  		 
  		 public 
  		 requireSolution(tokenId) 
  		 requireNotMinted(tokenId) 
  		 requireIsOwner(to,tokenId) 
  		 returns(bool) 
  		 		 
  	{
           
            
  	    solution[solutionSubmitted[tokenId]].minted = true;
  	    bool minted = mint(to, tokenId);
            return minted;
  	}
} 


























