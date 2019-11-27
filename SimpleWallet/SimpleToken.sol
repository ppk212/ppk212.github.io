pragma solidity ^0.5.0;

import "./Context.sol";
import "./ERC20.sol";
import "./ERC20Detailed.sol";

/**
 * @title SimpleToken
 * @dev Very simple ERC20 Token example, where all tokens are pre-assigned to the creator.
 * Note they can later distribute these tokens as they wish using `transfer` and other
 * `ERC20` functions.
 */
contract SimpleToken is Context, ERC20, ERC20Detailed {

    /**
     * @dev Constructor that gives _msgSender() all of existing tokens.
     */
    constructor (string memory token_name, string memory token_symbol, uint8 token_decimal) public ERC20Detailed(token_name, token_symbol, token_decimal) {
        _mint(_msgSender(), 10000 * (10 ** uint256(decimals())));
    }
    
    function getBalance(address account) public view returns(uint256) {
        return balanceOf(account);
    }
    
    function transfer(address recipient, uint256 amount) public returns (bool) {
        return transfer(recipient, amount);
    }
    
    function getTokenInfo() public view returns (string memory, string memory) {
        return (name(), symbol());
    }
}