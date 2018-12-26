let contractAddress = '0x3359bcbea3ee5d0c63871c39bc4d3f225fc63794';
let abi =
[
	{
	    "constant": true,
	    "inputs": [
			{
			    "name": "",
			    "type": "bytes32"
			}
	    ],
	    "name": "heighestVotesReceived",
	    "outputs": [
			{
			    "name": "",
			    "type": "uint256"
			}
	    ],
	    "payable": false,
	    "stateMutability": "view",
	    "type": "function"
	},
	{
	    "constant": true,
	    "inputs": [],
	    "name": "getTokenPrice",
	    "outputs": [
			{
			    "name": "",
			    "type": "uint256"
			}
	    ],
	    "payable": false,
	    "stateMutability": "view",
	    "type": "function"
	},
	{
	    "constant": true,
	    "inputs": [],
	    "name": "tokenPrice",
	    "outputs": [
			{
			    "name": "",
			    "type": "uint256"
			}
	    ],
	    "payable": false,
	    "stateMutability": "view",
	    "type": "function"
	},
	{
	    "constant": true,
	    "inputs": [
			{
			    "name": "candidate",
			    "type": "bytes32"
			}
	    ],
	    "name": "getCandidateIndex",
	    "outputs": [
			{
			    "name": "",
			    "type": "uint256"
			}
	    ],
	    "payable": false,
	    "stateMutability": "view",
	    "type": "function"
	},
	{
	    "constant": true,
	    "inputs": [
			{
			    "name": "",
			    "type": "uint256"
			}
	    ],
	    "name": "candidateNames",
	    "outputs": [
			{
			    "name": "",
			    "type": "bytes32"
			}
	    ],
	    "payable": false,
	    "stateMutability": "view",
	    "type": "function"
	},
	{
	    "constant": false,
	    "inputs": [
			{
			    "name": "candidateName",
			    "type": "bytes32"
			},
			{
			    "name": "tokenCountForVote",
			    "type": "uint256"
			}
	    ],
	    "name": "vote",
	    "outputs": [],
	    "payable": false,
	    "stateMutability": "nonpayable",
	    "type": "function"
	},
	{
	    "constant": true,
	    "inputs": [
			{
			    "name": "",
			    "type": "address"
			}
	    ],
	    "name": "voters",
	    "outputs": [
			{
			    "name": "voterAddress",
			    "type": "address"
			},
			{
			    "name": "tokenBought",
			    "type": "uint256"
			}
	    ],
	    "payable": false,
	    "stateMutability": "view",
	    "type": "function"
	},
	{
	    "constant": true,
	    "inputs": [],
	    "name": "getCandidatesInfo",
	    "outputs": [
			{
			    "name": "",
			    "type": "bytes32[]"
			}
	    ],
	    "payable": false,
	    "stateMutability": "view",
	    "type": "function"
	},
	{
	    "constant": false,
	    "inputs": [],
	    "name": "buy",
	    "outputs": [
			{
			    "name": "",
			    "type": "int256"
			}
	    ],
	    "payable": true,
	    "stateMutability": "payable",
	    "type": "function"
	},
	{
	    "constant": true,
	    "inputs": [],
	    "name": "getMyVotes",
	    "outputs": [
			{
			    "name": "",
			    "type": "uint256"
			},
			{
			    "name": "",
			    "type": "uint256"
			},
			{
			    "name": "",
			    "type": "uint256"
			},
			{
			    "name": "",
			    "type": "uint256"
			},
			{
			    "name": "",
			    "type": "uint256"
			},
			{
			    "name": "",
			    "type": "uint256"
			}
	    ],
	    "payable": false,
	    "stateMutability": "view",
	    "type": "function"
	},
	{
	    "constant": true,
	    "inputs": [],
	    "name": "getHeighestVotesReceivedFor",
	    "outputs": [
			{
			    "name": "",
			    "type": "uint256"
			},
			{
			    "name": "",
			    "type": "uint256"
			},
			{
			    "name": "",
			    "type": "uint256"
			},
			{
			    "name": "",
			    "type": "uint256"
			},
			{
			    "name": "",
			    "type": "uint256"
			},
			{
			    "name": "",
			    "type": "uint256"
			}
	    ],
	    "payable": false,
	    "stateMutability": "view",
	    "type": "function"
	},
	{
	    "constant": true,
	    "inputs": [],
	    "name": "getTokenBought",
	    "outputs": [
			{
			    "name": "",
			    "type": "uint256"
			}
	    ],
	    "payable": false,
	    "stateMutability": "view",
	    "type": "function"
	},
	{
	    "inputs": [
			{
			    "name": "_tokenPrice",
			    "type": "uint256"
			}
	    ],
	    "payable": false,
	    "stateMutability": "nonpayable",
	    "type": "constructor"
	}
];

let dccAuctionContract;
let dccAuction;
let accountAddress;
let currentEtherBalance;
let currentTokenBalance;
let tokenPrice;
let candidates = ["iphone7", "iphone8", "iphoneX", "galaxyS9", "galaxyNote9", "LGG7"];

window.addEventListener('load', function() {

  // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  if (typeof web3 !== 'undefined') {
    // Use Mist/MetaMask's provider
    window.web3 = new Web3(web3.currentProvider);
  } else {
    console.log('No web3? You should consider trying MetaMask!')
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
  }
  // Now you can start your app & access web3 freely:
  startApp();
});

function startApp() {
  dccAuctionContract = web3.eth.contract(abi);
  dccAuction = dccAuctionContract.at(contractAddress);
  document.getElementById('contractAddr').innerHTML = getLink(contractAddress);

  web3.eth.getAccounts(function(e,r){
  document.getElementById('accountAddr').innerHTML = getLink(r[0]);
  accountAddress = r[0];
  getValue();
  });
}

function getLink(addr) {
  return '<a target="_blank" href=https://testnet.etherscan.io/address/' + addr + '>' + addr +'</a>';
}

function getValue() {
  getEther();
  getToken();
  getTokenInfo();
  getCandidateInfo();
}

function getEther() {
  web3.eth.getBalance(accountAddress, function(e,r){
    document.getElementById('ethValue').innerHTML =web3.fromWei(r.toString()) + "ETH";
  });
}

function getToken() {
    dccAuction.getTokenBought(function (e, r) {
    document.getElementById('tokenValue').innerHTML = r.toString();
  });
}

function getTokenInfo() {
    dccAuction.getTokenPrice(function (e, r) {
    tokenPrice = parseFloat(web3.fromWei(r.toString()));
    document.getElementById('token-cost').innerHTML = tokenPrice + "ETH";
  });
    web3.eth.getBalance(dccAuction.address, function (e, v) {
    document.getElementById('contract-balance').innerHTML = web3.fromWei(v.toString()) + "ETH";
  });
}

function getCandidateInfo() {
    dccAuction.getHeighestVotesReceivedFor(function (e, r) {
      for (let i = 0; i < r.length; i++)
      {
        document.getElementById('highest_' + candidates[i]).innerHTML = r[i].toString();
    }
  });
    dccAuction.getMyVotes(function (e, r)
  {
      for(let i = 0; i < r.length; i++)
      {
          document.getElementById('myself_' + candidates[i]).innerHTML = r[i].toString();
      }
  })
}

function voteForProduct(index) {
    let voteId = '#tb_' + candidates[index];
    let voteTokens = $(voteId).val();
    $(voteId).val("");

  dccAuction.vote(candidates[index], voteTokens, function (e, r) {
    getValue();
  });
}

function buyTokens() {
  let tokensToBuy = $("#buy").val();
  let price = tokensToBuy * tokenPrice;
  $("#buy-msg").html("Purchase order has been submitted. Please wait.");

  dccAuction.buy({ value: web3.toWei(price, 'ether'), from: web3.eth.accounts[0] }, function (v) {
      web3.eth.getBalance(dccAuction.address, function (e, r) {
          $("#contract-balance").html(web3.fromWei(r.toString()) + " ETH");
          getValue();
   });
  });
}
