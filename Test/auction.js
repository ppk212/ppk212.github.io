let contractAddress = '0x7943df4e0a62a8e0719e4ad89560ddeae5fc5f18';
let abi = [
	{
		"constant": true,
		"inputs": [],
		"name": "getvotesMaxReceivedNgFor",
		"outputs": [
			{
				"name": "",
				"type": "uint256[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "gettotalTokenEe",
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
		"name": "getbalanceTokensAe",
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
		"name": "getvotesReceivedKFor",
		"outputs": [
			{
				"name": "",
				"type": "uint256[6]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "totalTokenEe",
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
		"name": "tokenPriceYu",
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
		"name": "gettokenBoughtJ",
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
		"name": "gettokenPriceYu",
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
		"name": "balanceTokensAe",
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
				"type": "address"
			}
		],
		"name": "voters",
		"outputs": [
			{
				"name": "voterAddressL",
				"type": "address"
			},
			{
				"name": "tokenBoughtJ",
				"type": "uint256"
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
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "votesMaxReceivedNg",
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
		"constant": false,
		"inputs": [
			{
				"name": "index",
				"type": "uint256"
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
		"inputs": [
			{
				"name": "_totalTokenEe",
				"type": "uint256"
			},
			{
				"name": "_tokenPriceYu",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	}
];

let auctionContractL;
let auctionYu;
let accountAddressEe;
let tokenPriceNg;

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
  auctionContractL = web3.eth.contract(abi);
  auctionYu = auctionContractL.at(contractAddress);
  document.getElementById('contractAddr').innerHTML = getLink(contractAddress);

  web3.eth.getAccounts(function(e,r){
    document.getElementById('accountAddr').innerHTML = getLink(r[0]);
    accountAddressEe = r[0];
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
  web3.eth.getBalance(accountAddressEe, function(e,r){
    document.getElementById('ethValue').innerHTML =web3.fromWei(r.toString()) + "ETH";
  });
}

function getToken() {
  auctionYu.getTokenBought(function(e,r){
    document.getElementById('tokenValue').innerHTML = r.toString();
  });
}

function getTokenInfo() {

  auctionYu.getTokenPrice(function(e,r){
    tokenPriceNg = parseFloat(web3.fromWei(r.toString()));
    document.getElementById('token-cost').innerHTML = tokenPriceNg + "ETH";
  });
  web3.eth.getBalance(auctionYu.address, function(e,v) {
    document.getElementById('contract-balance').innerHTML = web3.fromWei(v.toString()) + "ETH";
  });
}

function getCandidateInfo() {
  auctionYu.getVotesReceivedFor(function(e,r){
    for(let i=1;i<=r.length;i++)
    {
      document.getElementById('myself_' + i).innerHTML = r[i-1].toString();
    }
  });
  auctionYu.getVotesMaxReceivedFor(function(e,r){
    for(let i=1;i<=r.length;i++)
    {
      document.getElementById('highest_' + i).innerHTML = r[i-1].toString();
    }
  });
}

function voteForProduct(candidateIndexJ) {
  let voteTokensAe = document.getElementById('tb_' + candidateIndexJ).value;
  $("#msg").html("Vote has been submitted. The vote count will increment as soon as the vote is recorded on the blockchain. Please wait.")
  document.getElementById('tb_' + candidateIndexJ).value = "";

  auctionYu.vote(candidateIndexJ, voteTokensAe, function (e, r){
    getCandidateInfo();
  });
}

function buyTokens() {
  let tokensToBuyK = $("#buy").val();
  let price = tokensToBuyK * tokenPriceNg;
  $("#buy-msg").html("Purchase order has been submitted. Please wait.");

  auctionYu.buy({value: web3.toWei(price, 'ether'), from: web3.eth.accounts[0]}, function(v) {
    web3.eth.getBalance(auctionYu.address, function(e, r) {
    $("#contract-balance").html(web3.fromWei(r.toString()) + " ETH");
   });
  });
}