// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract IPFSFileStorage {

    mapping(address => string) public uploadedFiles;

    event Upload(address sender, string url);

    function upload(string memory url) public {
        console.log(msg.sender, url);
        emit Upload(msg.sender, url);
        uploadedFiles[msg.sender] = url;
    }
}