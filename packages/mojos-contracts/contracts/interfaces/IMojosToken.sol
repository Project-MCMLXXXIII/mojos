// SPDX-License-Identifier: GPL-3.0

/// @title Interface for MojosToken

/*********************************
 * ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ *
 * ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ *
 * ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ *
 * ░░░███████████████████████░░░ *
 * ░░░░░░█████████████████░░░░░░ *
 * ░░░░░░█████████████████░░░░░░ *
 * ░░░░░░█████████████████░░░░░░ *
 * ░░░░░░█████████████████░░░░░░ *
 * ░░░░░░█████████████████░░░░░░ *
 *********************************/

pragma solidity ^0.8.6;

import { IERC721 } from '@openzeppelin/contracts/token/ERC721/IERC721.sol';
import { IMojosDescriptor } from './IMojosDescriptor.sol';
import { IMojosSeeder } from './IMojosSeeder.sol';

interface IMojosToken is IERC721 {
    event MojoCreated(uint256 indexed tokenId, IMojosSeeder.Seed seed);

    event MojoBurned(uint256 indexed tokenId);

    event MojosDAOUpdated(address mojosDAO);

    event MinterUpdated(address minter);

    event MinterLocked();

    event DescriptorUpdated(IMojosDescriptor descriptor);

    event DescriptorLocked();

    event SeederUpdated(IMojosSeeder seeder);

    event SeederLocked();

    function mint() external returns (uint256);

    function burn(uint256 tokenId) external;

    function dataURI(uint256 tokenId) external returns (string memory);

    function setMojosDAO(address mojosDAO) external;

    function setMinter(address minter) external;

    function lockMinter() external;

    function setDescriptor(IMojosDescriptor descriptor) external;

    function lockDescriptor() external;

    function setSeeder(IMojosSeeder seeder) external;

    function lockSeeder() external;
}
