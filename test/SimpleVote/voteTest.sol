pragma solidity ^0.4.24;

contract voteTest {
    mapping(address => uint) private tickets;
    mapping(bytes32 => uint) private received_count;
    
    uint private total_count;
    uint private sellable_count;
    uint private ticket_price;
    
    bytes32[] private candidateNames;
    
    constructor (uint total, uint price) public {
        total_count = total;
        sellable_count = total;
        ticket_price = price;
        
        candidateNames.push("Monday");
        candidateNames.push("Tuesday");
        candidateNames.push("Wednesday");
        candidateNames.push("Thursday");
        candidateNames.push("Friday");
        candidateNames.push("Saturday");
        candidateNames.push("Sunday");
    }
    
    function buy() payable public {
        uint count = msg.value / ticket_price;
        require(count <= sellable_count);
        tickets[msg.sender] += count;
        sellable_count -= count;
    }
    
    function vote( bytes32 candidate, uint count ) public {
        bool check = existCandidate(candidate);
        
        require( tickets[msg.sender] >= count );
        
        received_count[candidate] += count;
        tickets[msg.sender] -= count;
    }
    
    function existCandidate(bytes32 candidate) view public returns (bool) {
        for(uint i = 0; i < candidateNames.length; i++) {
            if(candidateNames[i] == candidate) {
                return true;
            }
        }
        return false;
    }
    
    function getTicketsHave() view public returns (uint) {
        return tickets[msg.sender];
    }
    
    function getTicketsReceive() view public returns (uint[]) {
        uint[] temp;
        
        for(uint i = 0; i < candidateNames.length; i++) {
            temp.push(received_count[candidateNames[i]]);
        }
        
        return temp;
    }
    
    function getTotalTicket() view public returns (uint) {
        return total_count;
    }
    
    function getSellableTicket() view public returns (uint) {
        return sellable_count;
    }
    
    function getTicketPrice() view public returns (uint) {
        return ticket_price;
    }
}