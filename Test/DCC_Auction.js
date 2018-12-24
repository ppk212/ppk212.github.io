let contractAddress = '0x2881cb1bed2e8ccae4d00f1cb932282e5a416857';
let abi =
[
	{
		"constant": false,
		"inputs": [
			{
				"name": "bidNumber",
				"type": "uint256"
			},
			{
				"name": "tokenCountForBid",
				"type": "uint256"
			}
		],
		"name": "bid",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
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
				"type": "address"
			}
		],
		"name": "bidders",
		"outputs": [
			{
				"name": "bidderAddress",
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
		"name": "getMaxBid",
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
		"name": "getMyBid",
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
				"type": "uint256"
			}
		],
		"name": "maxBidPerProduct",
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
	}
];

/*
let simpleVoteContract;
let simpleVote;
let accountAddress;
let currentEtherBalance;
let currentTokenBalance;
let tokenPrice;
*/
let simpleBidContract;
let simpleBid;
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

/*
function startApp() {
  simpleVoteContract = web3.eth.contract(abi);
  simpleVote = simpleVoteContract.at(contractAddress);
  document.getElementById('contractAddr').innerHTML = getLink(contractAddress);

  web3.eth.getAccounts(function(e,r){
  document.getElementById('accountAddr').innerHTML = getLink(r[0]);
  accountAddress = r[0];
  getValue();
  });
}
*/
function startApp() {
    simpleBidContract = web3.eth.contract(abi);
    simpleBid = simpleBidContract.at(contractAddress);
    document.getElementById('contractAddr').innerHTML = getLink(contractAddress);
  
    web3.eth.getAccounts(function(e,r){
    document.getElementById('accountAddr').innerHTML = getLink(r[0]);
    accountAddress = r[0];
    getValue();
    first();
    });
}
function first(){
    simpleBid.getTokenBought(function(e,r){
        console.log(r['c'][0]);
        if(r['c'][0] != 0)
        {
            getMybid();
        }
    });
}
function getLink(addr) {
  return '<a target="_blank" href=https://ropsten.etherscan.io/address/' + addr + '>' + addr +'</a>';
}

function getValue() {
  getEther();
  getToken();
  getTokenInfo();
  getBiddingInfo();

  //getCandidateInfo();
}

function getEther() {
  web3.eth.getBalance(accountAddress, function(e,r){
    document.getElementById('ethValue').innerHTML =web3.fromWei(r.toString()) + "ETH";
  });
}

function getToken() {
    simpleBid.getTokenBought(function(e,r){
    document.getElementById('tokenValue').innerHTML = r.toString();
  });
}

function getTokenInfo() {

  /*
  simpleBid.getTotalToken(function(e,r){
    document.getElementById('tokens-total').innerHTML = r.toString();
  });
  simpleBid.getBalanceTokens(function(e,r){
    document.getElementById('tokens-sellable').innerHTML = r.toString();
  });
  */
  simpleBid.getTokenPrice(function(e,r){
    tokenPrice = parseFloat(web3.fromWei(r.toString()));
    document.getElementById('token-cost').innerHTML = tokenPrice + "ETH";
  });
  web3.eth.getBalance(simpleBid.address, function(e,v) {
    document.getElementById('contract-balance').innerHTML = web3.fromWei(v.toString()) + "ETH";
  });
}
/*
function getCandidateInfo() {
  simpleVote.getVotesReceivedFor(function(e,r){
    for(let i=1;i<=r.length;i++)
    {
      document.getElementById('day_votes_' + i).innerHTML = r[i-1].toString();
    }
  });
}
*/
function getBiddingInfo() {
    simpleBid.getMaxBid(function(e,r){
        for(let i=0; i<r.length; i++)
        {
            document.getElementById('highest_' + i).innerHTML = r[i].toString();
        }
    });
}
function getMybid() {
    simpleBid.getMyBid(function(e,r){
        for(let i=0; i<r.length; i++)
        {
            document.getElementById('myself_'+i).innerHTML = r[i].toString();
        }
    });
}
/*
function voteForCandidate() {
  let candidateName = $("#candidate").val();
  let voteTokens = $("#vote-tokens").val();
  $("#msg").html("Vote has been submitted. The vote count will increment as soon as the vote is recorded on the blockchain. Please wait.")
  $("#candidate").val("");
  $("#vote-tokens").val("");

  simpleVote.vote(candidateName, voteTokens, function (e, r){
    getCandidateInfo();
  });
}
*/
function bidForProduct(productnumber){
    let voteTokens;
    if(productnumber == 0) 
        voteTokens = $("#tokenstoBuy0").val();
    else if(productnumber == 1) 
        voteTokens = $("#tokenstoBuy1").val();
    else if(productnumber == 2) 
        voteTokens = $("#tokenstoBuy2").val();
    else if(productnumber == 3) 
        voteTokens = $("#tokenstoBuy3").val();
    else if(productnumber == 4)  
        voteTokens = $("#tokenstoBuy4").val();
    else if(productnumber == 5) 
        voteTokens = $("#tokenstoBuy5").val();


    simpleBid.bid(productnumber,voteTokens, function (e,r){ 
        getValue();

    });
}
function buyTokens() {
    let tokensToBuy = $("#buy").val();
    let price = tokensToBuy * tokenPrice;
    $("#buy-msg").html("Purchase order has been submitted. Please wait.");

    simpleBid.buy({value: web3.toWei(price, 'ether'), from: web3.eth.accounts[0]}, function(v) {
        web3.eth.getBalance(simpleBid.address, function(e, r) {
            getValue();
            getMybid();
            $("#contract-balance").html(web3.fromWei(r.toString()) + " ETH");
        });
    });
}