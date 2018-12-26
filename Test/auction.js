let auctionContractAddress = "0x2b1796efaeb26fb1d0c53a2ec3ec7a75a00c8dc5";
let auctionContractAbi =
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
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "productList",
		"outputs": [
			{
				"name": "name",
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
		"constant": false,
		"inputs": [
			{
				"name": "productId",
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
		"inputs": [
			{
				"name": "productId",
				"type": "uint256"
			}
		],
		"name": "getProduct",
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
]


class AuctionApp {
    constructor() {
        this.abi = auctionContractAbi;
        this.contractAddress = auctionContractAddress;
        this.accountAddress;
        this.auction;

        this.tokenPrice;

        this.numProduct = 6;

        this.auctionHeader;
        this.productItems;
        this.tokenBox;
    }

    initContract() {
        const auctionContract = web3.eth.contract(this.abi);
        this.auction = auctionContract.at(this.contractAddress);

        web3.eth.getAccounts((event, body) => {
            this.accountAddress = body[0];

            this.updateAddresses();
            this.updateTokenPrice();
            this.updateBalance();
            this.updateProducts();
        });
    }

    initComponents() {
        const productListDiv = $(".product-list");

        this.header = $(".auction-header");
        this.productItems = $_all(".product-list-item", productListDiv);
        this.tokenBox = $(".auction-token-box");

        productListDiv.addEventListener("click", (event) => {
            if (event.target.tagName !== "BUTTON")
                return;

            event.preventDefault();
            const productItem = this.getProductItem(event.target);
            const tokens = this.getBidTokens(productItem);
            const productId = productItem.dataset.id;
            this.bid(productId, tokens);
        });

        const buyButton = $("button", this.tokenBox);
        buyButton.addEventListener("click", (event) => {
            event.preventDefault();
            this.buyTokens();
        });


    }

    updateAddresses() {
        $(".contract-address", this.header).innerHTML = this.buildAddressAnchor(this.contractAddress);
        $(".account-address", this.header).innerHTML = this.buildAddressAnchor(this.accountAddress);

    }

    updateBalance() {
        web3.eth.getBalance(this.auction.address, (event, body) => {
            const contractBalance = web3.fromWei(body.toString());
            $(".token-box-bought", this.tokenBox).innerText = `${contractBalance} eth`;
        });

        web3.eth.getBalance(this.accountAddress, (event, body) => {
            $(".eth-value", this.header).innerText = `${web3.fromWei(body.toString())} eth`;
        });

        this.auction.getTokenBought((event, body) => {
            $(".token-value", this.header).innerText = body.toString();
        });
    }

    updateTokenPrice() {
        this.auction.getTokenPrice((event, body) => {
            this.tokenPrice = parseFloat(web3.fromWei(body.toString()));
            $(".token-box-price", this.tokenBox).innerText = `${this.tokenPrice} eth`;
        });
    }

    updateProducts() {
        for (let i = 0; i < this.numProduct; i++) {
            this.updateProduct(i);
        }
    }

    updateProduct(productId) {
        this.auction.getProduct(productId, (event, body) => {
            const product = this.productItems[productId];
            $(".product-list-item-name", product).innerText = web3.toUtf8(body[0]);
            $(".product-list-item-highest-bid", product).innerText = web3.toDecimal(body[1]);
            $(".product-list-item-my-bid", product).innerText = web3.toDecimal(body[2]);
        });
    }

    bid(productId, tokens) {
        this.auction.bid(productId, tokens, (event, body) => {
            this.updateProduct(productId);
            this.updateBalance();
        });
    }

    buyTokens() {
        const tokens = $("input", this.tokenBox).value;
        const price = tokens * this.tokenPrice;

        this.auction.buy(
            {
                value: web3.toWei(price, "ether"),
                from: web3.eth.accounts[0]
            },
            this.updateBalance.bind(this)
        );
    }

    getProductItem(component) {
        while (true) {
            if (component.classList.contains("product-list-item")) {
                return component;
            }
            component = component.parentNode;
        }
        return null;
    }

    getBidTokens(productItem) {
        return $(".product-list-item-bid-form-input", productItem).value;
    }

    buildAddressAnchor(address) {
        return `<a href="https://ropsten.etherscan.io/address/${address}">${address}</a>`;
    }
}

let auctionApp;

window.addEventListener("load", (event) => {

    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    if (typeof web3 !== "undefined") {
        // Use Mist/MetaMask's provider
        window.web3 = new Web3(web3.currentProvider);
    }
    else {
        console.log("No web3? You should consider trying MetaMask!")
        // Fallback - use your fallback strategy (local node / hosted node + in-Dapp id mgmt / fail)
        window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))
    }

    // Now you can start your app & access web3 freely.
    auctionApp = new AuctionApp();
    auctionApp.initComponents();
    auctionApp.initContract();
});

document.addEventListener("DOMContentLoaded", (event) => { 

});
