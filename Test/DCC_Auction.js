let contractAddress = '0xcd0828f652f1ca4545caa9d616ea064982bc2f63';

let abi = [
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
		"inputs": [
			{
				"name": "idx",
				"type": "uint256"
			},
			{
				"name": "token",
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
		"name": "getBiddingInformation",
		"outputs": [
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

let element_id = [
    "iphone7",
    "iphone8",
    "iphoneX",
    "galaxyS9",
    "galaxyNote9",
    "LGG7"
];

let DCC_AuctionContract;
let DCC_Auction;
let accountAddress;
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
  DCC_AuctionContract = web3.eth.contract(abi);
  DCC_Auction = DCC_AuctionContract.at(contractAddress);
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
  getBidInfo();
}

function getEther() {
  web3.eth.getBalance(accountAddress, function(e,r){
    document.getElementById('ethValue').innerHTML =web3.fromWei(r.toString()) + "ETH";
  });
}

function getToken() {
  DCC_Auction.getTokenBought(function(e,r){
    document.getElementById('tokenValue').innerHTML = r.toString();
  });
}
function getTokenInfo() {
  DCC_Auction.getTokenPrice(function(e,r){
    tokenPrice = parseFloat(web3.fromWei(r.toString()));
    document.getElementById('token-cost').innerHTML = tokenPrice + "ETH";
  });


  web3.eth.getBalance(DCC_Auction.address, function(e,v) {
    document.getElementById('contract-balance').innerHTML = web3.fromWei(v.toString()) + "ETH";
  });
}

function getBidInfo() {
    DCC_Auction.getBiddingInformation(function(e,r) {

        for (let i=0; i<element_id.length; i++) {
            document.getElementById('highest_' + element_id[i]).innerHTML = r[0][i].toString();
        }
        for (let i=0; i<element_id.length; i++) {
            document.getElementById('myself_' + element_id[i]).innerHTML = r[1][i].toString();
        }
    })
}

function voteForProduct(idx) {
    let bidTokens = $("#tb_" + element_id[idx]).val();
    $("#msg").html("Your bidding has been submitted. It will be reflected as soon as being recorded on the blockchain. Please wait.")
    $("#tb_" + element_id[idx]).val("");

    DCC_Auction.bid(idx, bidTokens, function (e, r){
      getBidInfo();
    });
}

function buyTokens() {
  let tokensToBuy = $("#buy").val();
  let price = tokensToBuy * tokenPrice;
  $("#buy-msg").html("Purchase order has been submitted. Please wait.");

  DCC_Auction.buy({value: web3.toWei(price, 'ether'), from: web3.eth.accounts[0]},
  function(v) {
    web3.eth.getBalance(DCC_Auction.address, function(e, r) {
    $("#contract-balance").html(web3.fromWei(r.toString()) + " ETH");
   });
  });
}
