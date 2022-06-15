// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

import './MojosToken.sol';

/// @title Interface of the UniversalONFT standard
contract UniversalMojo is MojosToken {
    uint256 public nextMintId;
    uint256 public maxMintId;

    /// @notice Constructor for the UniversalNFT

    constructor(
        address _mojosDAO,
        address _minter,
        IMojosDescriptor _descriptor,
        IMojosSeeder _seeder,
        IProxyRegistry _proxyRegistry,
        address _lzEndpoint,
        uint256 _startMintId,
        uint256 _endMintId
    ) MojosToken(_mojosDAO, _minter, _descriptor, _seeder, _proxyRegistry, _lzEndpoint) {
        nextMintId = _startMintId;
        maxMintId = _endMintId;
    }
}
