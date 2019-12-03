pragma solidity ^0.4.24;

contract FriendContract{
    mapping(address=>address[]) friends_list; // 친구들의 주소를 담는 mapping, 1주소당 여러 친구의 주소를 저장
    
    function addFriend(address friend) public { // 친구의 주소를 매개변수로 전달받아 mapping 데이터에 추가
        friends_list[msg.sender].push(friend); // friend_list에 친구를 추가
    }
    
    function getFriendsList() public view returns (address[]) { 
        return (friends_list[msg.sender]); // 자기 자신의 mapping 데이터에 입력되어 있는 친구를 반환
    }
}