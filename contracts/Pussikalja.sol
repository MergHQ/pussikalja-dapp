pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Pussikalja {
  struct Rating {
    uint8 rating;
    string timestamp;
  }

  event NewRating(uint8 rating, string timestamp);

  Rating[] public ratings;

  function addRating(uint8 _rating, string memory _timestamp) public {
    require(_rating <= 5 && _rating > 0, "Rating must be between 0 and 6");
    ratings.push(Rating(_rating, _timestamp));
    emit NewRating(_rating, _timestamp);
  }

  function getRatings() public view returns (Rating[] memory) {
    return ratings;
  }
}
