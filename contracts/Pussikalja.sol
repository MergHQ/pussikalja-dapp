pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Pussikalja {
    struct Rating {
      uint8 rating;
      string timestamp;
    }

    Rating[] public ratings;

    function addRating(uint8 _rating, string memory _timestamp) public {
      ratings.push(Rating(_rating, _timestamp));
    }

    function getRatings() public view returns (Rating[] memory) {
      return ratings;
    }
}
