let contractAddress = '0xdec7d763e7a4430d91897253181a38a1a8c673dd';
let abi = [
	{
		"constant": false,
		"inputs": [
			{
				"name": "itemName",
				"type": "bytes32"
			},
			{
				"name": "tokens",
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
		"outputs": [],
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
		"name": "buyers",
		"outputs": [
			{
				"name": "addr",
				"type": "address"
			},
			{
				"name": "tokens",
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
		"name": "getHighestPrice",
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
		"inputs": [
			{
				"name": "",
				"type": "bytes32"
			}
		],
		"name": "highestPrice",
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
		"name": "items",
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
			},
			{
				"name": "",
				"type": "bytes32"
			}
		],
		"name": "myBid",
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
	}
]

let DCCAuctionContract;
let DCCAuction;
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
  DCCAuctionContract = web3.eth.contract(abi);
  DCCAuction = DCCAuctionContract.at(contractAddress);
  document.getElementById('contractAddr').innerHTML = getLink(contractAddress);

  web3.eth.getAccounts(function(e,r){
  document.getElementById('accountAddr').innerHTML = getLink(r[0]);
  accountAddress = r[0];
  getValue();
  });
  getBid();
}

function getLink(addr) {
  return '<a target="_blank" href=https://testnet.etherscan.io/address/' + addr + '>' + addr +'</a>';
}

function getValue() {
  getEther();
  getToken();
  getTokenInfo();
}

function getBid() {
    DCCAuction.getHighestPrice(function(e, r) {
        document.getElementById('highest_iphone7').innerHTML = r[0].toString();
        document.getElementById('highest_iphone8').innerHTML = r[1].toString();
        document.getElementById('highest_iphoneX').innerHTML = r[2].toString();
        document.getElementById('highest_galaxyS9').innerHTML = r[3].toString();
        document.getElementById('highest_galaxyNote9').innerHTML = r[4].toString();
        document.getElementById('highest_LGG7').innerHTML = r[5].toString();
    });
    DCCAuction.getMyBid(accountAddress, function(e, r) {
        document.getElementById('myself_iphone7').innerHTML = r[0].toString();
        document.getElementById('myself_iphone8').innerHTML = r[1].toString();
        document.getElementById('myself_iphoneX').innerHTML = r[2].toString();
        document.getElementById('myself_galaxyS9').innerHTML = r[3].toString();
        document.getElementById('myself_galaxyNote9').innerHTML = r[4].toString();
        document.getElementById('myself_LGG7').innerHTML = r[5].toString();
    });
}

function getEther() {
  web3.eth.getBalance(accountAddress, function(e,r){
    document.getElementById('ethValue').innerHTML =web3.fromWei(r.toString()) + "ETH";
  });
}

function getToken() {
  DCCAuction.getTokenBought(function(e,r){
    document.getElementById('tokenValue').innerHTML = r.toString();
  });
}

function getTokenInfo() {
  DCCAuction.getTokenPrice(function(e,r){
    tokenPrice = parseFloat(web3.fromWei(r.toString()));
    document.getElementById('token-cost').innerHTML = tokenPrice + "ETH";
  });
  web3.eth.getBalance(DCCAuction.address, function(e,v) {
    document.getElementById('contract-balance').innerHTML = web3.fromWei(v.toString()) + "ETH";
  });
}

function buyTokens() {
  let tokensToBuy = $("#buy").val();
  let price = tokensToBuy * tokenPrice;
  $("#buy-msg").html("Purchase order has been submitted. Please wait.");

  DCCAuction.buy({value: web3.toWei(price, 'ether'), from: web3.eth.accounts[0]}, function(v) {
    web3.eth.getBalance(DCCAuction.address, function(e, r) {
    $("#contract-balance").html(web3.fromWei(r.toString()) + " ETH");
   });
  });
}



function voteForProduct(productNum) {

    switch (productNum) {
        case 0: // iphone 7
        DCCAuction.bid("iphone 7", $("#tb_iphone7").val(), function(e, r){});
        break;
        
        case 1: // iphone 8
        DCCAuction.bid("iphone 8", $("#tb_iphone8").val(), function(e, r){});
        break;
        
        case 2: // iphone X
        DCCAuction.bid("iphone X", $("#tb_iphoneX").val(), function(e, r){});
        break;
        
        case 3: // Galaxy S9
        DCCAuction.bid("Galaxy S9", $("#tb_galaxyS9").val(), function(e, r){});
        break;
        
        case 4: // Galaxy Note 9
        DCCAuction.bid("Galaxy Note 9", $("#tb_galaxyNote9").val(), function(e, r){});
        break;
        
        case 5: // LG G7
        DCCAuction.bid("LG G7", $("#tb_LGG7").val(), function (e, r) {});
        break;
    }
}