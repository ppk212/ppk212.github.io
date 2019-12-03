pragma solidity ^0.4.24;

import "./IERC20.sol";

/**
 * @title ERC20Detailed token
 * @dev The decimals are only for visualization purposes.
 * All the operations are done using the smallest and indivisible token unit,
 * just as on Ethereum all the operations are done in wei.
 */
contract ERC20Detailed is IERC20 { // IERC20 Interface 를 상속
  string private _name; // 토큰 이름
  string private _symbol; // 토큰 Symbol
  uint8 private _decimals; // Decimal ( 1 ETH = 10^18 Wei )

  constructor(string name, string symbol, uint8 decimals) public { // ERC20 생성자. 변수들을 초기화
    _name = name;
    _symbol = symbol;
    _decimals = decimals;
  }

  /**
   * @return the name of the token.
   */
  function name() public view returns(string) { // 이름을 반환하는 Method
    return _name;
  }

  /**
   * @return the symbol of the token.
   */
  function symbol() public view returns(string) { // Symbol 을 반환하는 Method
    return _symbol;
  }

  /**
   * @return the number of decimals of the token.
   */
  function decimals() public view returns(uint8) { // Decimal을 반환하는 Method
    return _decimals;
  }
}
