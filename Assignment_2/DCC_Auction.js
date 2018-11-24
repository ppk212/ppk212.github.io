﻿let contractAddress = '0x25932587363FBA8E57ab745E39CE58D10047a6a6';
let abi =
[
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
		"constant": false,
		"inputs": [
			{
				"name": "productName",
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
		"inputs": [
			{
				"name": "_tokenPrice",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"name": "buyers",
		"outputs": [
			{
				"name": "buyerAddress",
				"type": "address"
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
				"name": "product",
				"type": "bytes32"
			}
		],
		"name": "getProductIndex",
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
		"name": "getVotesReceivedHighestFor",
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
		"name": "getVotesReceivedMyselfFor",
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
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "productNames",
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
		"inputs": [
			{
				"name": "",
				"type": "bytes32"
			}
		],
		"name": "votesReceivedHighest",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
];

let dcc_auctionContract;
let dcc_auction;
let accountAddress;
let currentEtherBalance;
let currentTokenBalance;
let tokenPrice;

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
  dcc_auctionContract = web3.eth.contract(abi);
  dcc_auction = dcc_auctionContract.at(contractAddress);
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
  getProductInfo();
}

function getEther() {
  web3.eth.getBalance(accountAddress, function(e,r){
    document.getElementById('ethValue').innerHTML =web3.fromWei(r.toString()) + "ETH";
  });
}

function getToken() {
  dcc_auction.getTokenBought(function(e,r){
    document.getElementById('tokenValue').innerHTML = r.toString();
  });
}

function getTokenInfo() {

  dcc_auction.getTokenPrice(function(e,r){
    tokenPrice = parseFloat(web3.fromWei(r.toString()));
    document.getElementById('token-cost').innerHTML = tokenPrice + "ETH";
  });
  web3.eth.getBalance(dcc_auction.address, function(e,v) {
    document.getElementById('contract-balance').innerHTML = web3.fromWei(v.toString()) + "ETH";
  });
}

function getProductInfo() {
	dcc_auction.getVotesReceivedHighestFor(function(e,r){
		document.getElementById('highest_iphone7').innerHTML = r[0].toString();
		document.getElementById('highest_iphone8').innerHTML = r[1].toString();
		document.getElementById('highest_iphoneX').innerHTML = r[2].toString();
		document.getElementById('highest_galaxyS9').innerHTML = r[3].toString();
		document.getElementById('highest_galaxyNote9').innerHTML = r[4].toString();
		document.getElementById('highest_LGG7').innerHTML = r[5].toString();
	});
	dcc_auction.getVotesReceivedMyselfFor(function(e,r){
		document.getElementById('myself_iphone7').innerHTML = r[0].toString();
		document.getElementById('myself_iphone8').innerHTML = r[1].toString();
		document.getElementById('myself_iphoneX').innerHTML = r[2].toString();
		document.getElementById('myself_galaxyS9').innerHTML = r[3].toString();
		document.getElementById('myself_galaxyNote9').innerHTML = r[4].toString();
		document.getElementById('myself_LGG7').innerHTML = r[5].toString();
	});
}

function voteForProduct(num) {
  let productName;
	let voteTokens;
	switch (num) {
		case 0: productName="iphone7";
						voteTokens=$("#tb_iphone7").val();
		break;
		case 1: productName="iphone8";
						voteTokens=$("#tb_iphone8").val();
		break;
		case 2: productName="iphoneX";
						voteTokens=$("#tb_iphoneX").val();
		break;
		case 3: productName="galaxyS9";
						voteTokens=$("#tb_galaxyS9").val();
		break;
		case 4: productName="galaxyNote9";
						voteTokens=$("#tb_galaxyNote9").val();
		break;
		case 5: productName="LGG7";
						voteTokens=$("#tb_LGG7").val();
		break;
		default: productName=""; break;
	}

  dcc_auction.vote(productName, voteTokens, function (e, r){
    getProductInfo();
  });
}

function buyTokens() {
  let tokensToBuy = $("#buy").val();
  let price = tokensToBuy * tokenPrice;
  $("#buy-msg").html("Purchase order has been submitted. Please wait.");

  dcc_auction.buy({value: web3.toWei(price, 'ether'), from: web3.eth.accounts[0]}, function(v) {
    web3.eth.getBalance(dcc_auction.address, function(e, r) {
    $("#contract-balance").html(web3.fromWei(r.toString()) + " ETH");
   });
  });
}
