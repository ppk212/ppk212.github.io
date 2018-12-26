let contractAddress = '0x1247fece2e80464c75c8d756cfde2b0aea883cc1';
let abi =
    [
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
                    "name": "itemName",
                    "type": "bytes32"
                },
                {
                    "name": "tokenCountForVote",
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
            "inputs": [
                {
                    "name": "itemName",
                    "type": "bytes32"
                }
            ],
            "name": "getItem",
            "outputs": [
                {
                    "name": "",
                    "type": "bytes32"
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
                    "name": "itemName",
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
            "name": "getItemNames",
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
            "name": "mBalanceTokens",
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
            "name": "mItemNames",
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
            "name": "mItems",
            "outputs": [
                {
                    "name": "itemName",
                    "type": "bytes32"
                },
                {
                    "name": "highestBid",
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
            "name": "mTokenPrice",
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
            "name": "mTotalToken",
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
            "name": "mVotersToken",
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
let auctionVote;
let accountAddress;
let currentEtherBalance;
let currentTokenBalance;
let tokenPrice;
let idxToName =
{
    0: "iphone7",
    1: "iphone8",
    2: "iphoneX",
    3: "galaxyS9",
    4: "galaxyNote9",
    5: "LGG7"
};


window.addEventListener('load', function () {

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
    auctionContract = web3.eth.contract(abi);
    auctionVote = auctionContract.at(contractAddress);
    document.getElementById('contractAddr').innerHTML = getLink(contractAddress);

    web3.eth.getAccounts(function (e, r) {
        document.getElementById('accountAddr').innerHTML = getLink(r[0]);
        accountAddress = r[0];
        getValue();
        window.setInterval(getValue, 1000);
    });
}

function getLink(addr) {
    return '<a target="_blank" href=https://ropsten.etherscan.io/address/' + addr + '>' + addr + '</a>';
}

function getValue() {
    getEther();
    getToken();
    getTokenInfo();
    getItemsInfo();
}

function getEther() {
    web3.eth.getBalance(accountAddress, function (e, r) {
        document.getElementById('ethValue').innerHTML = web3.fromWei(r.toString()) + "ETH";
    });
}

function getToken() {
    auctionVote.getTokenBought(function (e, r) {
        document.getElementById('tokenValue').innerHTML = r.toString();
    });
}

function getTokenInfo() {
    auctionVote.getTokenPrice(function (e, r) {
        tokenPrice = parseFloat(web3.fromWei(r.toString()));
        document.getElementById('token-cost').innerHTML = tokenPrice + "ETH";
    });
    web3.eth.getBalance(auctionVote.address, function (e, v) {
        document.getElementById('contract-balance').innerHTML = web3.fromWei(v.toString()) + "ETH";
    });
}

function getItemsInfo() {
    auctionVote.getItemNames(function (e, itemNames) {

        for (let i = 0; i < itemNames.length; i++) {
            var itemName = itemNames[i];
            itemName = web3.toAscii(itemName);
            itemName = itemName.replace(/\0/g, '');
            auctionVote.getItem(itemName, function (e, r) {
                var reqItemName = web3.toAscii(r[0]);
                reqItemName = reqItemName.replace(/\0/g, '');
                document.getElementById('highest_' + reqItemName).innerHTML = r[1].toString() + " token";
                document.getElementById('myself_' + reqItemName).innerHTML = r[2].toString() + " token";
            });
        }
    });
}

function voteForProduct(idx) {
    let name = idxToName[idx];
    let voteTokens = $("#tb_" + name).val();
    $("#tb_" + name).val("");

    auctionVote.vote(name, voteTokens, function (e, r) {
        getItemsInfo();
    });
}

function buyTokens() {
    let tokensToBuy = $("#buy").val();
    let price = tokensToBuy * tokenPrice;
    $("#buy-msg").html("Purchase order has been submitted. Please wait.");
    $("#buy").val("");

    auctionVote.buy({ value: web3.toWei(price, 'ether'), from: web3.eth.accounts[0] }, function (v) {

    });
}
