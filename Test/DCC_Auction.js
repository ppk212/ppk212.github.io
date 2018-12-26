
let contractAddress = '0x27cb1b1d64a7f5bc2d6b44d675ac78b15e832027';
let abi = [
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
		"inputs": [
			{
				"name": "_totalToken",
				"type": "uint256"
			},
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
		"inputs": [],
		"name": "balanceTokens",
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
		"constant": true,
		"inputs": [],
		"name": "first",
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
		"name": "getBalanceTokens",
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
		"constant": true,
		"inputs": [],
		"name": "getHighestVotes",
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
		"name": "getTotalToken",
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
				"type": "bytes32"
			}
		],
		"name": "highestVote",
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
		"inputs": [],
		"name": "totalToken",
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
	}
];

let procName = ['iphone7', 'iphone8', 'iphoneX', 'galaxyS9', 'galaxyNote9', 'LGG7'];

let DCCAuction;
let DCCAuctionContract;
let accountAddress;
let tokenPrice;
let voteTokens;

window.addEventListener('load', function() {
	
	if(typeof web3 !== 'undefined') {
		window.web3 = new Web3(web3.currentProvider);
	} else {
		console.log('No web3? You should consider trying MetaMask!');
		window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8080"));
	}
	
	startApp();
});

function startApp() {

	DCCAuctionContract = web3.eth.contract(abi);
	DCCAuction = DCCAuctionContract.at(contractAddress);
	document.getElementById('contractAddr').innerHTML = getLink(contractAddress);
	
	web3.eth.getAccounts(function(e,r) {
		document.getElementById('accountAddr').innerHTML = getLink(r[0]);
		accountAddress = r[0];
		getValue();
	});
}

function getLink(addr) {
	return '<a target="_blank" href=https://testnet.etherscan.io/address/' + addr + '>' + addr + '</a>';
}

function getValue() {
	getEther();
	getToken();
	getTokenInfo();
	getCandidateInfo();
	getMyInfo();
}

function getEther() {
	web3.eth.getBalance(accountAddress, function(e,r) {
		document.getElementById('ethValue').innerHTML = web3.fromWei(r.toString()) + "ETH";
	});
}

function getToken() {
	DCCAuction.getTokenBought(function(e,r) {
		document.getElementById('tokenValue').innerHTML = r.toString();
	});
}

function getTokenInfo() {
	DCCAuction.getTokenPrice(function(e,r) {
		tokenPrice = parseFloat(web3.fromWei(r.toString()));
		document.getElementById('token-cost').innerHTML = tokenPrice + "ETH";
	});
	
	web3.eth.getBalance(DCCAuction.address, function(e,v) {
		document.getElementById('contract-balance').innerHTML = web3.fromWei(v.toString()) + "ETH";
	});
}

function getCandidateInfo() {
	DCCAuction.getHighestVotes(function(e,r) {
		for(let i=0 ; i<r.length ; i++)
		{
			document.getElementById('highest_' + procName[i]).innerHTML = r[i].toString();
		}
	});
}

function getMyInfo() {
	DCCAuction.getMyVotes(function(e,r) {
		for(let i=0 ; i<r.length ; i++)
		{
			document.getElementById('myself_' + procName[i]).innerHTML = r[i].toString();
		}
	});
}

function voteForProduct(procNum) {

	if(procNum == 0)
	{
		voteTokens = $("#tb_iphone7").val();
		$("#tb_iphone7").val("");
	}
	else if(procNum == 1)
	{
		voteTokens = $("#tb_iphone8").val();
		$("#tb_iphone8").val("");
	}
	else if(procNum == 2)
	{
		voteTokens = $("#tb_iphoneX").val();
		$("#tb_iphoneX").val("");
	}
	else if(procNum == 3)
	{
		voteTokens = $("#tb_galaxyS9").val();
		$("#tb_galaxyS9").val("");
	}
	else if(procNum == 4)
	{
		voteTokens = $("#tb_galaxyNote9").val();
		$("#tb_galaxyNote9").val("");
	}
	else if(procNum == 5)
	{
		voteTokens = $("#tb_LGG7").val();
		$("#tb_LGG7").val("");
	}
	
	DCCAuction.vote(procName[procNum], voteTokens, function(e,r) {
		getCandidateInfo();
		getMyInfo();
	});
}

function buyTokens() {
	let tokensToBuy = $("#buy").val();
	let price = tokensToBuy * tokenPrice;
	$("#buy-msg").html("Purchase order has been submitted. Please wait.");
	
	DCCAuction.buy({value:web3.toWei(price, 'ether'), from: web3.eth.accounts[0]}, function(v) {
		web3.eth.getBalance(DCCAuction.address, function(e,r) {
			$("#contract-balance").html(web3.fromWei(r.toString()) + "ETH");
		});
	});
}























