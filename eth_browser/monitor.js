/*var Web3;
var web3;

window.addEventListener('load', function() {*/
	//var Web3 = require('web3');
    //var web3 = new Web3( new Web3.providers.HttpProvider("http://localhost:8545"));
    // 49960 43797
	// Checking if Web3 has been injected by the browser (Mist/MetaMask)
	if (typeof web3 !== 'undefined') {
	  // Use Mist/MetaMask's provider
	  window.web3 = new Web3(web3.currentProvider);
	} else {
	  console.log('No web3? You should consider trying MetaMask!')
	  // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
	  window.web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"));
	}
	console.log(web3);
	// Now you can start your app & access web3 freely:
	startApp();
  //});
  
  var stop;

  function startApp() {
	//web3.eth.defaultAccount = web3.eth.accounts[0];
	console.log(web3.eth.blockNumber);
	stop = false;
  }
function startMonitor() 
{
	stop = false;
	var startBlockNo = web3.eth.blockNumber - 5;  
	var table = document.getElementById('list');	// 태그에 있는 id(list) 속성을 사용하여 해당 태그에 접근
	var i = startBlockNo;
	
	for(; i < web3.eth.blockNumber;i++)
	{
		var result = web3.eth.getBlock(i);	 	// 블록번호나 블록해시와 맞는 블록 리턴            
		insertBlockRow(result, table,i);
	}

	setTimeout(function() 						// 매개변수로 호출될 콜백함수와 지연시간, 지연시간 뒤에 실행될 코드를 설정(10초후 watchBlock 함수 실행)
	{
		watchBlock(table,i);
	}, 10000);	
}

function watchBlock(table, blockNumber) 
{
	if(stop) 
	{
		return;
	}

	if(blockNumber == web3.eth.blockNumber)
	{
		setTimeout(function()
		{
			watchBlock(table, blockNumber);
		} ,10000);
	}
	var result = web3.eth.getBlock(blockNumber);	
	insertBlockRow(result,table,blockNumber);	
		
	setTimeout(function()
	{
			watchBlock(table,++blockNumber);
	},10000);	
}

function insertBlockRow(result, table) 
{
	var row = table.insertRow();	// 행 하단에 추가
	var td = row.insertCell(0);		// 첫번째 열 
	td.innerHTML = result.number;	// 첫번째 열에 블록 번호 
	var td = row.insertCell(1);		// 두번째 열 	
	td.innerHTML = new Date(parseInt(result.timestamp, 16) * 1000).toString();	// 두번째 열에 블록생성 시간	
	var td = row.insertCell(2);		// 세번째 열
	td.innerHTML = result.hash;		// 세번째 열에 블록 해쉬
	var td = row.insertCell(3);		// 네번째 열
	td.innerHTML = result.nonce;	// 네번째 열에 논스
	var td = row.insertCell(4);		// 다섯번째 열
	if (result.transactions.length > 0) 
	{
		insertTranRow(result.transactions, td);
	}
}

function insertTranRow(transactions, td) 
{
	var allData = "";
	for (var i = 0; i < transactions.length; i++) 
	{
		var data= web3.eth.getTransaction(transactions[i])	// 트랜잭션 해시와 맞는 트랜잭션 리턴
		allData += JSON.stringify(data);          			// 자바스크립트 값인 data를 JSON.stringify()를 통하여 JSON 문자열로 변환        	
	}
	td.innerHTML = "<input type='text' value='" + allData + "' /></td>";
}

function stopWatch() 
{
	stop = true;
}