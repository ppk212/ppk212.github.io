const contractAddress = "0xb203f3923edec9b823ae0c1a2c322d42622cd27a";
const abi = [
	{
		"constant": false,
		"inputs": [
			{
				"name": "itemName",
				"type": "bytes32"
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
		"outputs": [],
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
		"name": "getHighestBids",
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
		"inputs": [
			{
				"name": "item",
				"type": "bytes32"
			}
		],
		"name": "getItemIndex",
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
		"name": "getItemsInfo",
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
		"inputs": [],
		"name": "getUserBids",
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
		"inputs": [
			{
				"name": "",
				"type": "bytes32"
			}
		],
		"name": "highestBids",
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
		"name": "itemList",
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
		"name": "usersBids",
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
let auction;
let accountAddress;
let currentEtherBalance;
let currentTokenBalance;
let tokenPrice;
const itemNames = [];
const itemNamesBytes32 = {};

window.addEventListener("load", function() {
  // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  if (typeof web3 !== "undefined") {
    // Use Mist/MetaMask's provider
    window.web3 = new Web3(web3.currentProvider);
  } else {
    console.log("No web3? You should consider trying MetaMask!");
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    window.web3 = new Web3(
      new Web3.providers.HttpProvider("http://localhost:8545")
    );
  }
  // Now you can start your app & access web3 freely:
  startApp();
});

function startApp() {
  auctionContract = web3.eth.contract(abi);
  auction = auctionContract.at(contractAddress);
  document.getElementById("contractAddr").innerHTML = getLink(contractAddress);

  web3.eth.defaultAccount=web3.eth.accounts[0];

  web3.eth.getAccounts((e, r) => {
    document.getElementById("accountAddr").innerHTML = getLink(r[0]);
    accountAddress = r[0];
    getValue(); // 현재 address가 가지고 있는 이더 출력
  });

  auction.getItemsInfo.call((e, list) => {
    if (!e) {
      list.map((element) => {
        const itemName = web3.toUtf8(element)
        itemNames.push(itemName);
        itemNamesBytes32[itemName] = element;
      });
      console.log(itemNames);
    } else console.log(`Error: ${e}`);
  })
}

function getLink(addr) {
  return `<a target="_blank" href=https://testnet.etherscan.io/address/${addr}>${addr}</a>`;
}

function getValue() {
  getEther();
  getToken();
  getTokenInfo();
  getHighestBids();
  getMyBids();
}

function getEther() {
  web3.eth.getBalance(accountAddress, (e, r) => {
    document.getElementById("ethValue").innerHTML =
      web3.fromWei(r.toString()) + "ETH";
  });
}

function getToken() {
  auction.getTokenBought((e, r) => {
    document.getElementById("tokenValue").innerHTML = r.toString();
  });
}

function getTokenInfo() {
  auction.getTotalToken((e, r) => {
    document.getElementById("tokens-total").innerHTML = r.toString();
  });
  auction.getBalanceTokens((e, r) => {
    document.getElementById("tokens-sellable").innerHTML = r.toString();
  });
  auction.getTokenPrice((e, r) => {
    tokenPrice = parseFloat(web3.fromWei(r.toString()));
    document.getElementById("token-cost").innerHTML = tokenPrice + "ETH";
  });
  web3.eth.getBalance(auction.address, (e, v) => {
    document.getElementById("contract-balance").innerHTML =
      web3.fromWei(v.toString()) + "ETH";
  });
}

function getHighestBids() {
  auction.getHighestBids((e, list) => {
    if(list) {
      console.log(list);
      list.map((element, i) => {
        document.getElementById(`highest-${itemNames[i]}`).innerHTML = element.toString();
      });
    }
  });
}

function getMyBids() {
  auction.getUserBids((e, list) => {
    if(list) {
      list.map((element, i) => {
        document.getElementById(`myself-${itemNames[i]}`).innerHTML = element.toString();
      });
    }
  });
}

function bidForProduct(i) {
  const itemName = itemNames[i];
  const bidTokens = $(`#tb-${itemName}`).val();
  alert(
    "Bid has been submitted. The bid will be done as soon as the bid is recorded on the blockchain. (As long as your bid is higher than the previouse highest one.)"
  );
  $(`#tb-${itemName}`).val("");

  console.log(`bids for ${[itemName]} about ${bidTokens}`);

  auction.bid(itemNamesBytes32[itemName], bidTokens, (e, r) => {
    if(e) console.log(e);
    else console.log(`Error: ${e}`);
    
    getHighestBids();
    getMyBids();
  });
}

function buyTokens() {
  const tokensToBuy = $("#buy").val();
  const price = tokensToBuy * tokenPrice;
  $("#buy-msg").html("Purchase order has been submitted. Please wait.");
  $("#buy").val("");

  auction.buy(
    { value: web3.toWei(price, "ether"), from: web3.eth.accounts[0] },
    function(v) {
      web3.eth.getBalance(auction.address, function(e, r) {
        if(r) console.log(r);
        $("#contract-balance").html(web3.fromWei(r.toString()) + " ETH");
      });
    }
  );
}
