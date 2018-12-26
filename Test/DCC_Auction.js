let contractAddress = "0x6c811b283a1365f0e33eba698a14ffdc1d44291d";
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
				"name": "productName",
				"type": "bytes32"
			},
			{
				"name": "tokenBid",
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
				"type": "address"
			}
		],
		"name": "buyers",
		"outputs": [
			{
				"name": "buyerAddress",
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
		"inputs": [],
		"name": "getBid",
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
		"name": "getHighestBid",
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
		"name": "getProductsInfo",
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
		"name": "highestBid",
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

let auctionContract;
let auctionBid;
let accountAddress;
let tokenPrice;

window.addEventListener('load', function() {
  if (typeof web3 !== undefined) {
    window.web3 = new Web3(web3.currentProvider);
  } else {
    console.log("There is no Web3 Library");
    window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
  }

  startApp();
});

function startApp() {
  auctionContract = web3.eth.contract(abi);
  auctionBid = auctionContract.at(contractAddress);
  document.getElementById('contractAddr').innerHTML = getLink(contractAddress);

  web3.eth.getAccounts(function(e, r) {
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
  getProductInfo();
}

function getEther() {
  web3.eth.getBalance(accountAddress, function(e, r) {
    document.getElementById('ethValue').innerHTML = web3.fromWei(r.toString()) + "ETH";
  });
}

function getToken() {
  auctionBid.getTokenBought(function(e, r) {
    document.getElementById('tokenValue').innerHTML = r.toString();
  });
}

function getTokenInfo() {
  auctionBid.getTokenPrice(function(e, r) {
    tokenPrice = parseFloat(web3.fromWei(r.toString()));
    document.getElementById('token-cost').innerHTML = tokenPrice + "ETH";
  });
  web3.eth.getBalance(auctionBid.address, function(e, v) {
    document.getElementById('contract-balance').innerHTML = web3.fromWei(v.toString()) + "ETH";
  });
}

function getProductInfo() {
  let productNames = ["iphone7", "iphone8", "iphoneX", "galaxyS9", "galaxyNote9", "LGG7"];

  auctionBid.getHighestBid(function(e, r) {
    for (let i = 0; i < r.length; i++) {
      $('#highest_' + productNames[i]).html(r[i].toString());
    }
  });

  auctionBid.getBid(function(e, r) {
    for(let i = 0; i < r.length; i++) {
      $('#myself_' + productNames[i]).html(r[i].toString());
    }
  });
}

function buyTokens() {
	let tokensToBuy = $("#buy").val();
  let price = tokensToBuy * tokenPrice;
	$("#buy-msg").html("Purchase order has been submitted. Please wait.");
	$("#buy").val("");

  auctionBid.buy({value: web3.toWei(price, 'ether'), from: web3.eth.accounts[0]}, function(v) {
    web3.eth.getBalance(auctionBid.address, function(e, r) {
    $("#contract-balance").html(web3.fromWei(r.toString()) + " ETH");
   });
  });
}

function voteForProduct(prod_id) {
  let prod;

  if (prod_id == 0) {
    prod = "iphone7";
  } else if (prod_id == 1) {
    prod = "iphone8";
  } else if (prod_id == 2) {
    prod = "iphoneX";
  } else if (prod_id == 3) {
    prod = "galaxyS9";
  } else if (prod_id == 4) {
    prod = "galaxyNote9";
  } else {
    prod = "LGG7";
  }

  let myBid = Number($("#tb_" + prod).val());
	$("#tb_" + prod).val("");
	
  auctionBid.vote(prod, myBid, function(e, r) {
    getProductInfo();
  });

}