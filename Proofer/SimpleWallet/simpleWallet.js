let ERC20_contractAddress = '0x532cfe947fe58a3df85c973504ed972893c192b7';
let ERC20_abi = 
[
	{
	  "constant": true,
	  "inputs": [],
	  "name": "name",
	  "outputs": [
		{
		  "name": "",
		  "type": "string"
		}
	  ],
	  "payable": false,
	  "type": "function"
	},
	{
	  "constant": false,
	  "inputs": [
		{
		  "name": "_spender",
		  "type": "address"
		},
		{
		  "name": "_value",
		  "type": "uint256"
		}
	  ],
	  "name": "approve",
	  "outputs": [
		{
		  "name": "success",
		  "type": "bool"
		}
	  ],
	  "payable": false,
	  "type": "function"
	},
	{
	  "constant": true,
	  "inputs": [],
	  "name": "totalSupply",
	  "outputs": [
		{
		  "name": "",
		  "type": "uint256"
		}
	  ],
	  "payable": false,
	  "type": "function"
	},
	{
	  "constant": false,
	  "inputs": [
		{
		  "name": "_from",
		  "type": "address"
		},
		{
		  "name": "_to",
		  "type": "address"
		},
		{
		  "name": "_value",
		  "type": "uint256"
		}
	  ],
	  "name": "transferFrom",
	  "outputs": [
		{
		  "name": "success",
		  "type": "bool"
		}
	  ],
	  "payable": false,
	  "type": "function"
	},
	{
	  "constant": true,
	  "inputs": [],
	  "name": "decimals",
	  "outputs": [
		{
		  "name": "",
		  "type": "uint256"
		}
	  ],
	  "payable": false,
	  "type": "function"
	},
	{
	  "constant": true,
	  "inputs": [],
	  "name": "version",
	  "outputs": [
		{
		  "name": "",
		  "type": "string"
		}
	  ],
	  "payable": false,
	  "type": "function"
	},
	{
	  "constant": true,
	  "inputs": [
		{
		  "name": "_owner",
		  "type": "address"
		}
	  ],
	  "name": "balanceOf",
	  "outputs": [
		{
		  "name": "balance",
		  "type": "uint256"
		}
	  ],
	  "payable": false,
	  "type": "function"
	},
	{
	  "constant": true,
	  "inputs": [],
	  "name": "symbol",
	  "outputs": [
		{
		  "name": "",
		  "type": "string"
		}
	  ],
	  "payable": false,
	  "type": "function"
	},
	{
	  "constant": false,
	  "inputs": [
		{
		  "name": "_to",
		  "type": "address"
		},
		{
		  "name": "_value",
		  "type": "uint256"
		}
	  ],
	  "name": "transfer",
	  "outputs": [
		{
		  "name": "success",
		  "type": "bool"
		}
	  ],
	  "payable": false,
	  "type": "function"
	},
	{
	  "constant": false,
	  "inputs": [
		{
		  "name": "_spender",
		  "type": "address"
		},
		{
		  "name": "_value",
		  "type": "uint256"
		},
		{
		  "name": "_extraData",
		  "type": "bytes"
		}
	  ],
	  "name": "approveAndCall",
	  "outputs": [
		{
		  "name": "success",
		  "type": "bool"
		}
	  ],
	  "payable": false,
	  "type": "function"
	},
	{
	  "constant": true,
	  "inputs": [
		{
		  "name": "_owner",
		  "type": "address"
		},
		{
		  "name": "_spender",
		  "type": "address"
		}
	  ],
	  "name": "allowance",
	  "outputs": [
		{
		  "name": "remaining",
		  "type": "uint256"
		}
	  ],
	  "payable": false,
	  "type": "function"
	},
	{
	  "inputs": [
		{
		  "name": "_initialAmount",
		  "type": "uint256"
		},
		{
		  "name": "_tokenName",
		  "type": "string"
		},
		{
		  "name": "_decimalUnits",
		  "type": "uint8"
		},
		{
		  "name": "_tokenSymbol",
		  "type": "string"
		}
	  ],
	  "type": "constructor"
	},
	{
	  "payable": false,
	  "type": "fallback"
	},
	{
	  "anonymous": false,
	  "inputs": [
		{
		  "indexed": true,
		  "name": "_from",
		  "type": "address"
		},
		{
		  "indexed": true,
		  "name": "_to",
		  "type": "address"
		},
		{
		  "indexed": false,
		  "name": "_value",
		  "type": "uint256"
		}
	  ],
	  "name": "Transfer",
	  "type": "event"
	},
	{
	  "anonymous": false,
	  "inputs": [
		{
		  "indexed": true,
		  "name": "_owner",
		  "type": "address"
		},
		{
		  "indexed": true,
		  "name": "_spender",
		  "type": "address"
		},
		{
		  "indexed": false,
		  "name": "_value",
		  "type": "uint256"
		}
	  ],
	  "name": "Approval",
	  "type": "event"
	},
  ];

let friend_contractAddress = '0x27f8d7ea7786bc06c0d601f8cda383819d982832';
let friend_abi = [
	{
		"constant": false,
		"inputs": [
			{
				"name": "friend",
				"type": "address"
			}
		],
		"name": "addFriend",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getFriendsList",
		"outputs": [
			{
				"name": "",
				"type": "address[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
];

let simpleWalletContract;
let simpleWallet;
let friendContract;
let friends;

let accountAddress;
let token_name;
let token_symbol;
let token_decimal;

window.addEventListener('load', function() {
  if (typeof web3 !== 'undefined') {
    window.web3 = new Web3(web3.currentProvider);
  } else {
    console.log('No web3? You should consider trying MetaMask!')
	window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
  }
  console.log(window.web3);

  startApp();
});

function startApp() {
  simpleWalletContract = web3.eth.contract(ERC20_abi);
  simpleWallet = simpleWalletContract.at(ERC20_contractAddress);
  document.getElementById('erc20contractAddr').innerHTML = getLink(ERC20_contractAddress);

  friendContract = web3.eth.contract(friend_abi);
  friends = friendContract.at(friend_contractAddress);
  
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
  getTokenInfo();  
  getFriendsList();
}

function getToken() {
	simpleWallet.balanceOf(accountAddress, function(e,r){		
		document.getElementById('tokenValue').innerHTML =web3.fromWei(r.toString()) + " " + token_symbol;
	});
}

function getTokenInfo() {
  simpleWallet.name(function(e,r){
	token_name = r.toString();	
	document.getElementById('tokenName').innerHTML = token_name;	
	getToken();
  });
  simpleWallet.symbol(function(e,r){	
	token_symbol = r.toString();
	document.getElementById('tokenSymbol').innerHTML = token_symbol;
	document.getElementById('erc20Token').innerHTML = token_symbol;	
  });
}

function getFriendsList() {
	friends.getFriendsList(function(e,r){
		for(let i=0; i<r.length; i++) {
			var opt = $("<option>" + r[i].toString() + "</option>");
			$('#friends_list').append(opt);
		}
	});
}

function selectFriend() {
	var friendSelect = document.getElementById("friends_list");
	var text = friendSelect.options[friendSelect.selectedIndex].text;
	
	document.getElementById('receiver').value = text;

	simpleWallet.balanceOf(text, function(e,r){
		document.getElementById('tokenValueToAddress').innerHTML =web3.fromWei(r.toString()) + " " + token_symbol;
	});
}

function sendToken() {
	var _receiver = document.getElementById('receiver').value;
	var _token = document.getElementById('token_num').value;

	var real_token = web3.toWei(_token, 'ether');

	console.log("Send "+ _token + " to " + _receiver);	

	simpleWallet.transfer(_receiver, real_token, function(e,r){
		console.log("Complete!");
		getToken();
	});
}

function addFriend() {
	var _friend = document.getElementById('address_friend').value;

	friends.addFriend(_friend, function(e,r) {
		console.log("Complete, Add friend.")
		getFriendsList();
	}); 
}