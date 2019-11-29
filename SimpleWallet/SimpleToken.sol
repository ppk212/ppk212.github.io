pragma solidity ^0.4.24;

import "./ERC20.sol";
import "./ERC20Detailed.sol";

/**
 * @title SimpleToken
 * @dev Very simple ERC20 Token example, where all tokens are pre-assigned to the creator.
 * Note they can later distribute these tokens as they wish using `transfer` and other
 * `ERC20` functions.
 */
contract SimpleToken is ERC20, ERC20Detailed {
  
  mapping(address=>address[]) friends_list;
  
  /**
   * @dev Constructor that gives msg.sender all of existing tokens.
   */
  constructor (string token_name, string token_symbol) public ERC20Detailed(token_name, token_symbol, 18) {
    _mint(msg.sender, 10000 * (10 ** uint256(decimals())) );
  }
  
  function getBalance(address account) public view returns(uint256) {
    return balanceOf(account);
  }
    
  function transfer(address recipient, uint256 amount) public returns (bool) {
    return transfer(recipient, amount);
  }
    
  function getTokenInfo() public view returns (string, string) {
    return (name(), symbol());
  }
    
  function getFriendsList() public view returns (address[]) {
    return (friends_list[msg.sender]);
  }
    
  function addFriend(address friend) public {
    friends_list[msg.sender].push(friend);
  }
}
