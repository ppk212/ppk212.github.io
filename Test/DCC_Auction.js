let contractAddress = '0x73e8f775dca2db4c50732336f9588ea02399aec3';
let abi =
[
	{
		"constant": true,
		"inputs": [],
		"name": "getuserUsedToken",
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
				"type": "bytes32"
			}
		],
		"name": "votesReceived",
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
		"constant": false,
		"inputs": [
			{
				"name": "candidateName",
				"type": "bytes32"
			},
			{
				"name": "tokenCountForVote",
				"type": "uint256"
			},
			{
				"name": "tokenCountNo",
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
		"inputs": [],
		"name": "getVotesReceivedFor",
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
	}
];

let DCC_auctionContract;
let DCC_auction;
let accountAddress;
let currentEtherBalance;
let currentTokenBalance;
let tokenPrice;
let productNo;

window.addEventListener('load', function() {

  // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  if (typeof web3 !== 'undefined') {
    // Use Mist/MetaMask's provider
    window.web3 = new Web3(web3.currentProvider);
  } else {
    console.log('No web3? You should consider trying MetaMask!')
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
	window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8547"));
  }
  // Now you can start your app & access web3 freely:

  startApp();
});

function startApp() {
  DCC_auctionContract = web3.eth.contract(abi);
  DCC_auction = DCC_auctionContract.at(contractAddress);
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
  getuserVoteInfo();
}

function getuserVoteInfo()
{
	simpleVote.getuserUsedToken(function(e,r){
		document.getElementById('myself_iphone7').innerHTML=r[0].toString();
		document.getElementById('myself_iphone8').innerHTML=r[1].toString();
		document.getElementById('myself_iphoneX').innerHTML=r[2].toString();
		document.getElementById('myself_galaxyS9').innerHTML=r[3].toString();
		document.getElementById('myself_galaxyNote9').innerHTML=r[4].toString();
		document.getElementById('myself_LGG7').innerHTML=r[5].toString();
	});
}
function getEther() {
  web3.eth.getBalance(accountAddress, function(e,r){
    document.getElementById('ethValue').innerHTML =web3.fromWei(r.toString()) + "ETH";
  });
}

function getToken() {
  simpleVote.getTokenBought(function(e,r){
    document.getElementById('tokenValue').innerHTML = r.toString();
  });
}

function getTokenInfo() {
  simpleVote.getTokenPrice(function(e,r){
    tokenPrice = parseFloat(web3.fromWei(r.toString()));
    document.getElementById('token-cost').innerHTML = tokenPrice + "ETH";
  });
  web3.eth.getBalance(simpleVote.address, function(e,v) {
    document.getElementById('contract-balance').innerHTML = web3.fromWei(v.toString()) + "ETH";
  });
}

function getCandidateInfo() {
  simpleVote.getVotesReceivedFor(function(e,r){
   
      document.getElementById('highest_iphone7').innerHTML = r[0].toString();
      document.getElementById('highest_iphone8').innerHTML = r[1].toString();
      document.getElementById('highest_iphoneX').innerHTML = r[2].toString();
      document.getElementById('highest_galaxyS9').innerHTML = r[3].toString();
      document.getElementById('highest_galaxyNote9').innerHTML = r[4].toString();
	  document.getElementById('highest_LGG7').innerHTML = r[5].toString();
	  
  });
}


function voteForProduct(productNo) {
	let candidateName;
	let voteTokens;
	switch(productNo){
		case 0:
			candidateName = "iphone 7";
			voteTokens = $("#tb_iphone7").val();
			$("#tb_LGG7").val("");
			break;
		case 1:
			candidateName = "iphone 8";
			voteTokens = $("#tb_iphone8").val();
			$("#tb_LGG7").val("");
			break;
		case 2:
			candidateName = "iphone X";
			voteTokens = $("#tb_iphoneX").val();
			$("#tb_LGG7").val("");
			break;
		case 3:
			candidateName = "Galaxy S9";
			voteTokens = $("#tb_galaxyS9").val();
			$("#tb_LGG7").val("");
			break;
		case 4:
			candidateName = "Galaxy Note 9";
			voteTokens = $("#tb_galaxyNote9").val();
			$("#tb_LGG7").val("");
			break;
		case 5:	
			candidateName = "LG G7";
			voteTokens = $("#tb_LGG7").val();
			$("#tb_LGG7").val("");
			break;
	}
	$("#msg").html("Vote has been submitted. The vote count will increment as soon as the vote is recorded on the blockchain. Please wait.")

	simpleVote.vote(candidateName, voteTokens, productNo, function (e, r){
	  getCandidateInfo();
	  getuserVoteInfo();
	});
	
  }

function buyTokens() {
  let tokensToBuy = $("#buy").val();
  let price = tokensToBuy * tokenPrice;
  $("#buy-msg").html("Purchase order has been submitted. Please wait.");

  simpleVote.buy({value: web3.toWei(price, 'ether'), from: web3.eth.accounts[0]}, function(v) {
    web3.eth.getBalance(simpleVote.address, function(e, r) {
    $("#contract-balance").html(web3.fromWei(r.toString()) + " ETH");
   });
  });
}
