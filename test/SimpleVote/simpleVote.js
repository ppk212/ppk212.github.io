let contractAddress = '0x8C45128852511b45Bccc344dBE932cE89B6AF461';
let abi =
[
	{
		"constant": false,
		"inputs": [],
		"name": "buy",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "name",
				"type": "bytes32"
			},
			{
				"name": "num",
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
				"name": "total",
				"type": "uint256"
			},
			{
				"name": "price",
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
				"type": "uint256"
			}
		],
		"name": "candidates_Names",
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
				"type": "bytes32"
			}
		],
		"name": "candidates_ticket",
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
		"name": "getCandidatesTicket",
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
		"name": "getSellableCount",
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
		"name": "getTicketCount",
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
		"name": "getTotalCount",
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
		"name": "sellable_count",
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
		"name": "ticket_count",
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
		"name": "token_Price",
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
		"name": "total_count",
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

let simpleVoteContract;
let simpleVote;
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
  console.log(window.web3);
  // Now you can start your app & access web3 freely:
  startApp();
});

function startApp() {
  simpleVoteContract = web3.eth.contract(abi);
  simpleVote = simpleVoteContract.at(contractAddress);
  document.getElementById('contractAddr').innerHTML = getLink(contractAddress);
  
  web3.eth.getAccounts(function(e,r){
  document.getElementById('accountAddr').innerHTML = getLink(r[0]);
  accountAddress = r[0];
  getValue();
  });

  /*var accounts = web3.eth.getAccounts();
  document.getElementById('accountAddr').innerHTML = getLink(accounts[0]);
  accountAddress = accounts[0];
  getValue();*/
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
  simpleVote.getTicketCount(function(e,r){
    document.getElementById('ticketValue').innerHTML = r.toString();
  });
}

function getTokenInfo() {

  simpleVote.getTotalCount(function(e,r){
    document.getElementById('tickets-total').innerHTML = r.toString();
  });
  simpleVote.getSellableCount(function(e,r){
    document.getElementById('tickets-sellable').innerHTML = r.toString();
  });

/*
  simpleVote.getTicketPrice(function(e,r){
    tokenPrice = parseFloat(web3.fromWei(r.toString()));
    document.getElementById('ticket-cost').innerHTML = tokenPrice + "ETH";
  });
*/

   web3.eth.getBalance(simpleVote.address, function(e,v) {
    document.getElementById('contract-balance').innerHTML = web3.fromWei(v.toString()) + "ETH";
  });
}

function getCandidateInfo() {
  document.getElementById('day_votes_1').innerHTML = "Monday";
  document.getElementById('day_votes_2').innerHTML = "Tuesday";
  document.getElementById('day_votes_3').innerHTML = "Wednesday";
  document.getElementById('day_votes_4').innerHTML = "Thursday";
  document.getElementById('day_votes_5').innerHTML = "Friday";
  document.getElementById('day_votes_6').innerHTML = "Saturday";
  document.getElementById('day_votes_7').innerHTML = "Sunday";
}

function voteForCandidate() {
  let candidateName = $("#candidate").val();
  let voteTokens = $("#vote-tickets").val();
  $("#msg").html("Vote has been submitted. The vote count will increment as soon as the vote is recorded on the blockchain. Please wait.")
  $("#candidate").val("");
  $("#vote-tokens").val("");

  simpleVote.vote(candidateName, voteTokens, function (e, r){
    getCandidateInfo();
  });
}

function buyTickets() {
  let tokensToBuy = $("#buy").val();
  let price = tokensToBuy * tokenPrice;
  $("#buy-msg").html("Purchase order has been submitted. Please wait.");

  simpleVote.buy({value: web3.toWei(price, 'ether'), from: web3.eth.accounts[0]}, function(v) {
    web3.eth.getBalance(simpleVote.address, function(e, r) {
    $("#contract-balance").html(web3.fromWei(r.toString()) + " ETH");
   });
  });
}
