pragma solidity ^0.4.24;

import "./ERC20.sol";
import "./ERC20Detailed.sol";

/**
 * @title SimpleToken
 * @dev Very simple ERC20 Token example, where all tokens are pre-assigned to the creator.
 * Note they can later distribute these tokens as they wish using `transfer` and other
 * `ERC20` functions.
 */
contract SimpleToken is ERC20, ERC20Detailed { // ERC20, ERC20Detailed Contract를 상속
  /**
   * @dev Constructor that gives msg.sender all of existing tokens.
   */
  constructor () public ERC20Detailed("Proofer_Token", "PFT", 18) { // ERC20Detailed 생성자를 호출
    _mint(msg.sender, 10000 * (10 ** uint256(decimals())) );
  }
}