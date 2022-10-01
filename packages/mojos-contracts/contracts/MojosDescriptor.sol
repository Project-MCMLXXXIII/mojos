// SPDX-License-Identifier: GPL-3.0

/// @title The Mojos NFT Descriptor

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

import { Ownable } from '@openzeppelin/contracts/access/Ownable.sol';
import { Strings } from '@openzeppelin/contracts/utils/Strings.sol';
import { IMojosDescriptor } from './interfaces/IMojosDescriptor.sol';
import { IMojosSeeder } from './interfaces/IMojosSeeder.sol';
import { NFTDescriptor } from './libs/NFTDescriptor.sol';
import { MultiPartRLEToSVG } from './libs/MultiPartRLEToSVG.sol';

contract MojosDescriptor is IMojosDescriptor, Ownable {
    using Strings for uint256;

    // prettier-ignore TODO Check this license
    // https://creativecommons.org/publicdomain/zero/1.0/legalcode.txt
    bytes32 constant COPYRIGHT_CC0_1_0_UNIVERSAL_LICENSE =
        0xa2010f343487d3f7618affe54f789f5487602331c0a8d03f49e9a7c547cf0499;

    // Whether or not new Mojo parts can be added
    bool public override arePartsLocked;

    // Whether or not `tokenURI` should be returned as a data URI (Default: true)
    bool public override isDataURIEnabled = true;

    // Base URI
    string public override baseURI;

    // Mojo Color Palettes (Index => Hex Colors)
    mapping(uint8 => string[]) public override palettes;

    // Mojo Backgrounds (Hex Colors)
    string[] public override backgrounds;

    // Mojo Bodies (Custom RLE)
    bytes[] public override bodies;

    // Mojo Body Accessories (Custom RLE)
    bytes[] public override bodyAccessories;

    // Mojo Faces (Custom RLE)
    bytes[] public override faces;

    // Mojo Head Accessories (Custom RLE)
    bytes[] public override headAccessories;

    /**
     * @notice Require that the parts have not been locked.
     */
    modifier whenPartsNotLocked() {
        require(!arePartsLocked, 'Parts are locked');
        _;
    }

    /**
     * @notice Get the number of available Mojo `backgrounds`.
     */
    function backgroundCount() external view override returns (uint256) {
        return backgrounds.length;
    }

    /**
     * @notice Get the number of available Mojo `bodies`.
     */
    function bodyCount() external view override returns (uint256) {
        return bodies.length;
    }

    /**
     * @notice Get the number of available Mojo `bodyAccessories`.
     */
    function bodyAccessoryCount() external view override returns (uint256) {
        return bodyAccessories.length;
    }

    /**
     * @notice Get the number of available Mojo `faces`.
     */
    function faceCount() external view override returns (uint256) {
        return faces.length;
    }

    /**
     * @notice Get the number of available Mojo `headAccessories`.
     */
    function headAccessoryCount() external view override returns (uint256) {
        return headAccessories.length;
    }

    /**
     * @notice Add colors to a color palette.
     * @dev This function can only be called by the owner.
     */
    function addManyColorsToPalette(uint8 paletteIndex, string[] calldata newColors) external override onlyOwner {
        require(palettes[paletteIndex].length + newColors.length <= 256, 'Palettes can only hold 256 colors');
        for (uint256 i = 0; i < newColors.length; i++) {
            _addColorToPalette(paletteIndex, newColors[i]);
        }
    }

    /**
     * @notice Batch add Mojo backgrounds.
     * @dev This function can only be called by the owner when not locked.
     */
    function addManyBackgrounds(string[] calldata _backgrounds) external override onlyOwner whenPartsNotLocked {
        for (uint256 i = 0; i < _backgrounds.length; i++) {
            _addBackground(_backgrounds[i]);
        }
    }

    /**
     * @notice Batch add Mojo bodies.
     * @dev This function can only be called by the owner when not locked.
     */
    function addManyBodies(bytes[] calldata _bodies) external override onlyOwner whenPartsNotLocked {
        for (uint256 i = 0; i < _bodies.length; i++) {
            _addBody(_bodies[i]);
        }
    }

    /**
     * @notice Batch add Mojo bodyAccessories.
     * @dev This function can only be called by the owner when not locked.
     */
    function addManyBodyAccessories(bytes[] calldata _bodyAccessories) external override onlyOwner whenPartsNotLocked {
        for (uint256 i = 0; i < _bodyAccessories.length; i++) {
            _addBodyAccessory(_bodyAccessories[i]);
        }
    }

    /**
     * @notice Batch add Mojo faces.
     * @dev This function can only be called by the owner when not locked.
     */
    function addManyFaces(bytes[] calldata _faces) external override onlyOwner whenPartsNotLocked {
        for (uint256 i = 0; i < _faces.length; i++) {
            _addFace(_faces[i]);
        }
    }

    /**
     * @notice Batch add Mojo headAccessories.
     * @dev This function can only be called by the owner when not locked.
     */
    function addManyHeadAccessories(bytes[] calldata _headAccessories) external override  {
        for (uint256 i = 0; i < _headAccessories.length; i++) {
            _addHeadAccessory(_headAccessories[i]);
        }
    }

    /**
     * @notice Add a single color to a color palette.
     * @dev This function can only be called by the owner.
     */
    function addColorToPalette(uint8 _paletteIndex, string calldata _color) external override onlyOwner {
        require(palettes[_paletteIndex].length <= 255, 'Palettes can only hold 256 colors');
        _addColorToPalette(_paletteIndex, _color);
    }

    /**
     * @notice Add a Mojo background.
     * @dev This function can only be called by the owner when not locked.
     */
    function addBackground(string calldata _background) external override onlyOwner whenPartsNotLocked {
        _addBackground(_background);
    }

    /**
     * @notice Add a Mojo body.
     * @dev This function can only be called by the owner when not locked.
     */
    function addBody(bytes calldata _body) external override onlyOwner whenPartsNotLocked {
        _addBody(_body);
    }

    /**
     * @notice Add a Mojo bodyAccessory.
     * @dev This function can only be called by the owner when not locked.
     */
    function addBodyAccessory(bytes calldata _bodyAccessory) external override onlyOwner whenPartsNotLocked {
        _addBodyAccessory(_bodyAccessory);
    }

    /**
     * @notice Add a Mojo face.
     * @dev This function can only be called by the owner when not locked.
     */
    function addFace(bytes calldata _face) external override onlyOwner whenPartsNotLocked {
        _addFace(_face);
    }

    /**
     * @notice Add Mojo headAccessory.
     * @dev This function can only be called by the owner when not locked.
     */
    function addHeadAccessory(bytes calldata _headAccessory) external override onlyOwner whenPartsNotLocked {
        _addHeadAccessory(_headAccessory);
    }

    /**
     * @notice Lock all Mojo parts.
     * @dev This cannot be reversed and can only be called by the owner when not locked.
     */
    function lockParts() external override onlyOwner whenPartsNotLocked {
        arePartsLocked = true;

        emit PartsLocked();
    }

    /**
     * @notice Toggle a boolean value which determines if `tokenURI` returns a data URI
     * or an HTTP URL.
     * @dev This can only be called by the owner.
     */
    function toggleDataURIEnabled() external override onlyOwner {
        bool enabled = !isDataURIEnabled;

        isDataURIEnabled = enabled;
        emit DataURIToggled(enabled);
    }

    /**
     * @notice Set the base URI for all token IDs. It is automatically
     * added as a prefix to the value returned in {tokenURI}, or to the
     * token ID if {tokenURI} is empty.
     * @dev This can only be called by the owner.
     */
    function setBaseURI(string calldata _baseURI) external override onlyOwner {
        baseURI = _baseURI;

        emit BaseURIUpdated(_baseURI);
    }

    /**
     * @notice Given a token ID and seed, construct a token URI for an official Mojos DAO Mojo.
     * @dev The returned value may be a base64 encoded data URI or an API URL.
     */
    function tokenURI(uint256 tokenId, IMojosSeeder.Seed memory seed) external view override returns (string memory) {
        if (isDataURIEnabled) {
            return dataURI(tokenId, seed);
        }
        return string(abi.encodePacked(baseURI, tokenId.toString()));
    }

    /**
     * @notice Given a token ID and seed, construct a base64 encoded data URI for an official Mojos DAO Mojo.
     */
    function dataURI(uint256 tokenId, IMojosSeeder.Seed memory seed) public view override returns (string memory) {
        string memory mojoId = tokenId.toString();
        string memory name = string(abi.encodePacked('Mojo ', mojoId));
        string memory description = string(abi.encodePacked('Mojo ', mojoId, ' is a member of the Mojos DAO'));

        return genericDataURI(name, description, seed);
    }

    /**
     * @notice Given a name, description, and seed, construct a base64 encoded data URI.
     */
    function genericDataURI(
        string memory name,
        string memory description,
        IMojosSeeder.Seed memory seed
    ) public view override returns (string memory) {
        NFTDescriptor.TokenURIParams memory params = NFTDescriptor.TokenURIParams({
            name: name,
            description: description,
            parts: _getPartsForSeed(seed),
            background: backgrounds[seed.background]
        });
        return NFTDescriptor.constructTokenURI(params, palettes);
    }

    /**
     * @notice Given a seed, construct a base64 encoded SVG image.
     */
    function generateSVGImage(IMojosSeeder.Seed memory seed) external view override returns (string memory) {
        MultiPartRLEToSVG.SVGParams memory params = MultiPartRLEToSVG.SVGParams({
            parts: _getPartsForSeed(seed),
            background: backgrounds[seed.background]
        });
        return NFTDescriptor.generateSVGImage(params, palettes);
    }

    /**
     * @notice Add a single color to a color palette.
     */
    function _addColorToPalette(uint8 _paletteIndex, string calldata _color) internal {
        palettes[_paletteIndex].push(_color);
    }

    /**
     * @notice Add a Mojo background.
     */
    function _addBackground(string calldata _background) internal {
        backgrounds.push(_background);
    }

    /**
     * @notice Add a Mojo body.
     */
    function _addBody(bytes calldata _body) internal {
        bodies.push(_body);
    }

    /**
     * @notice Add a Mojo bodyAccessory.
     */
    function _addBodyAccessory(bytes calldata _bodyAccessory) internal {
        bodyAccessories.push(_bodyAccessory);
    }

    /**
     * @notice Add a Mojo face.
     */
    function _addFace(bytes calldata _face) internal {
        faces.push(_face);
    }

    /**
     * @notice Add Mojo headAccessory.
     */
    function _addHeadAccessory(bytes calldata _headAccessory) internal {
        headAccessories.push(_headAccessory);
    }

    /**
     * @notice Get all Mojo parts for the passed `seed`.
     */
    function _getPartsForSeed(IMojosSeeder.Seed memory seed) internal view returns (bytes[] memory) {
        bytes[] memory _parts = new bytes[](4);
        _parts[0] = bodies[seed.body];
        _parts[1] = bodyAccessories[seed.bodyAccessory];
        _parts[2] = faces[seed.face];
        _parts[3] = headAccessories[seed.headAccessory];
        return _parts;
    }
}
