const contractAddress = '0xA12e60C56A2d70757B59B03E6ABA3259F28f7fdf';
const abi =
[
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
				"name": "productName",
				"type": "bytes32"
			},
			{
				"name": "tokenCountForBid",
				"type": "uint256"
			}
		],
		"name": "bid",
		"outputs": [],
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
		"constant": true,
		"inputs": [],
		"name": "getBidsReceivedFor",
		"outputs": [
			{
				"name": "",
				"type": "bytes32[]"
			},
			{
				"name": "",
				"type": "uint256[]"
			},
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

const products = ["iphone7", "iphone8", "iphoneX", "galaxyS9", "galaxyNote9", "LGG7"];
const FIELD_NAME = 0;
const FIELD_HIGHEST_BID = 1;
const FIELD_MY_BID = 2;

let auctionContract;
let auction;
let accountAddress;
let tokenPrice;

window.addEventListener('load', function() {
  // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  if (typeof web3 != 'undefined') {
    // Use Mist/MetaMask's provider
    window.web3 = new Web3(web3.currentProvider);
  }
  else {
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    console.log('No web3? You should consider trying MetaMask!')
    window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
  }
  // start auction system
  startApp();
});

function startApp() {
  // set contract information
  auctionContract = web3.eth.contract(abi);       // create contract object
  auction = auctionContract.at(contractAddress);  // instantiate by address
  document.getElementById('contractAddr').innerHTML = getLink(contractAddress);
  getAuctionInfo();

  // set account information
  web3.eth.getAccounts(function(e,r) {
    accountAddress = r[0];
    // print account information if can read EOA from MetaMast
    if (typeof accountAddress !== 'undefined') {
      document.getElementById('accountAddr').innerHTML = getLink(accountAddress);
      getAccountInfo();
    }
    else {
      document.getElementById('accountAddr').innerHTML = "undefined";
    }
  });
}

function getLink(addr) {
  return '<a target="_blank" href=https://ropsten.etherscan.io/address/' + addr + '>' + addr +'</a>';
}

function getAuctionInfo() {
  getContractInfo();  // token price, balance
  getBidInfo();       // the highest bid, EOA's bid
}

function getContractInfo() {
  // token price of contract
  auction.getTokenPrice(function(e,r) {
    tokenPrice = parseFloat(web3.fromWei(r.toString()));
    document.getElementById('token-cost').innerHTML = tokenPrice + " ETH";
  });
  // number of etherium contract has
  web3.eth.getBalance(auction.address, function(e,v) {
    document.getElementById('contract-balance').innerHTML = web3.fromWei(v.toString()) + " ETH";
  });
}

function getAccountInfo() {
  // number of etherium EOA has
  web3.eth.getBalance(accountAddress, function(e,v) {
    document.getElementById('ethValue').innerHTML = web3.fromWei(v.toString()) + " ETH";
  });
  // number of tokens EOA has
  auction.getTokenBought(function(e,r) {
    document.getElementById('tokenValue').innerHTML = r.toString();
  });
}

function getBidInfo() {
  auction.getBidsReceivedFor(function(e, r) {
    // getBidsReceivedFor function returns (bytes32[], uint[], uint[])
    for(var i=0; i<r[FIELD_NAME].length; i++) {
      // convert bytes32 string to ascii string and remove null characters
      // ex) "0x6970686f6e653700000000000000000000000000000000000000000000000000"
      // => "iphone7\0\0\0\0...."
      // => "iphone7"
      var product = web3.toAscii(r[FIELD_NAME][i]).replace(/\0/g, '');
      document.getElementById('highest_'+product).innerHTML = r[FIELD_HIGHEST_BID][i].toString();
      document.getElementById('myself_'+product).innerHTML = r[FIELD_MY_BID][i].toString();
    }
  });
}

function voteForProduct(idx) {
  var productName = products[idx];
  // validate product name
  if (typeof productName == 'undefined')
    return;
  var voteTokens = $("#tb_"+productName).val();
  $("#tb_"+productName).val("");
  // validate input
  if (isIllegalNumber(voteTokens))
    return;

  auction.bid(productName, voteTokens, function(e, r) {
    getBidInfo();
  });
}

function buyTokens() {
  var tokensToBuy = $("#buy").val();
  $("#buy").val("");
  // validate input
  if (isIllegalNumber(tokensToBuy))
    return;
  var price = tokensToBuy * tokenPrice;
  $("#buy-msg").html("Purchase order has been submitted. Please wait.");

  // convert price from ether to wei
  auction.buy({value: web3.toWei(price, 'ether'), from: web3.eth.accounts[0]}, function(v) {
    getAccountInfo();
    web3.eth.getBalance(auction.address, function(e, r) {
      $("#contract-balance").html(web3.fromWei(r.toString()) + " ETH");
    });
  });
}

function isIllegalNumber(str) {
  // check whether the variable is Not-a-Number
  if (isNaN(str)) {
    alert("Input is not a number. Please check again.");
    return true;
  }
  else
    return false;
}
