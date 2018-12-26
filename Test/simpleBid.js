let contractAddress = '0xa09f2bedd0219ec4c699c901937d903030d4b736';
let abi =
[
	{
		"constant": false,
		"inputs": [
			{
				"name": "productName",
				"type": "bytes32"
			},
			{
				"name": "tokensToBid",
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
		"inputs": [
			{
				"name": "productName",
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
		"inputs": [
			{
				"name": "",
				"type": "bytes32"
			}
		],
		"name": "highest",
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
	}
];

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

function startApp() {
  simpleBidContract = web3.eth.contract(abi);
  simpleBid = simpleBidContract.at(contractAddress);
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
  simpleBid.getTokenBought(function(e,r){
    document.getElementById('tokenValue').innerHTML = r.toString();
  });
}

function getTokenInfo() {

  simpleBid.getTokenPrice(function(e,r){
    tokenPrice = parseFloat(web3.fromWei(r.toString()));
    document.getElementById('token-cost').innerHTML = tokenPrice + "ETH";
  });
  web3.eth.getBalance(simpleBid.address, function(e,v) {
    document.getElementById('contract-balance').innerHTML = web3.fromWei(v.toString()) + "ETH";
  });
}

function getProductInfo() {
  simpleBid.getMyBid(function(e,r){
    document.getElementById('myself_iphone7').innerHTML = r[0].toString();
    document.getElementById('myself_iphone8').innerHTML = r[1].toString();
    document.getElementById('myself_iphoneX').innerHTML = r[2].toString();
    document.getElementById('myself_galaxyS9').innerHTML = r[3].toString();
    document.getElementById('myself_galaxyNote9').innerHTML = r[4].toString();
    document.getElementById('myself_LGG7').innerHTML = r[5].toString();
  });

  simpleBid.getHighestBid(function(e,r){
    document.getElementById('highest_iphone7').innerHTML = r[0].toString();
    document.getElementById('highest_iphone8').innerHTML = r[1].toString();
    document.getElementById('highest_iphoneX').innerHTML = r[2].toString();
    document.getElementById('highest_galaxyS9').innerHTML = r[3].toString();
    document.getElementById('highest_galaxyNote9').innerHTML = r[4].toString();
    document.getElementById('highest_LGG7').innerHTML = r[5].toString();
  });

}

function bidForProduct(n) {
  if(n == 0){
    let bidTokens = parseInt($("#tb_iphone7").val());
    $("#msg").html("Bid has been submitted. The bid count will increment as soon as the vote is recorded on the blockchain. Please wait.")
    $("#tb_iphone7").val("");
    simpleBid.bid("iPhone 7", bidTokens, function (e, r){
      getProductInfo();
    });
  } else if(n == 1){
    let bidTokens = parseInt($("#tb_iphone8").val());
    $("#msg").html("Bid has been submitted. The bid count will increment as soon as the vote is recorded on the blockchain. Please wait.")
    $("#tb_iphone8").val("");
    simpleBid.bid("iPhone 8", bidTokens, function (e, r){
      getProductInfo();
    });
  } else if(n == 2){
    let bidTokens = parseInt($("#tb_iphoneX").val());
    $("#msg").html("Bid has been submitted. The bid count will increment as soon as the vote is recorded on the blockchain. Please wait.")
    $("#tb_iphoneX").val("");
    simpleBid.bid("iPhone X", bidTokens, function (e, r){
      getProductInfo();
    });
  } else if(n == 3){
    let bidTokens = parseInt($("#tb_galaxyS9").val());
    $("#msg").html("Bid has been submitted. The bid count will increment as soon as the vote is recorded on the blockchain. Please wait.")
    $("#tb_galaxyS9").val("");
    simpleBid.bid("Galaxy S9", bidTokens, function (e, r){
      getProductInfo();
    });
  } else if(n == 4){
    let bidTokens = parseInt($("#tb_galaxyNote9").val());
    $("#msg").html("Bid has been submitted. The bid count will increment as soon as the vote is recorded on the blockchain. Please wait.")
    $("#tb_galaxyNote9").val("");
    simpleBid.bid("Galaxy Note 9", bidTokens, function (e, r){
      getProductInfo();
    });
  } else if(n == 5){
    let bidTokens = parseInt($("#tb_LGG7").val());
    $("#msg").html("Bid has been submitted. The bid count will increment as soon as the vote is recorded on the blockchain. Please wait.")
    $("#tb_LGG7").val("");
    simpleBid.bid("LG G7", bidTokens, function (e, r){
      getProductInfo();
    });
  }
}


function buyTokens() {
  let tokensToBuy = $("#buy").val();
  let price = tokensToBuy * tokenPrice;
  $("#buy-msg").html("Purchase order has been submitted. Please wait.");

  simpleBid.buy({value: web3.toWei(price, 'ether'), from: web3.eth.accounts[0]}, function(v) {
    web3.eth.getBalance(simpleBid.address, function(e, r) {
    $("#contract-balance").html(web3.fromWei(r.toString()) + " ETH");
   });
  });
}
