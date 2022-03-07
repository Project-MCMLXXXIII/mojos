// SPDX-License-Identifier: GPL-3.0

/// @title The Mojos DAO auction house

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

// LICENSE
// MojosAuctionHouse.sol is a modified version of Zora's AuctionHouse.sol:
// https://github.com/ourzora/auction-house/blob/54a12ec1a6cf562e49f0a4917990474b11350a2d/contracts/AuctionHouse.sol
//
// AuctionHouse.sol source code Copyright Zora licensed under the GPL-3.0 license.
// With modifications by Mojos DAO.

pragma solidity ^0.8.6;

import { PausableUpgradeable } from '@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol';
import { ReentrancyGuardUpgradeable } from '@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol';
import { OwnableUpgradeable } from '@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol';
import { IERC20 } from '@openzeppelin/contracts/token/ERC20/IERC20.sol';

import '@openzeppelin/contracts/utils/math/SafeMath.sol';
import { IMojosAuctionHouse } from './interfaces/IMojosAuctionHouse.sol';
import { IMojosToken } from './interfaces/IMojosToken.sol';
import { IWETH } from './interfaces/IWETH.sol';

contract MojosAuctionHouse is IMojosAuctionHouse, PausableUpgradeable, ReentrancyGuardUpgradeable, OwnableUpgradeable {
    // The Mojos ERC721 token contract
    IMojosToken public mojos1;
    IMojosToken public mojos2;
    // The address of the WETH contract
    address public weth;

    // The minimum amount of time left in an auction after a new bid is created
    uint256 public timeBuffer;

    // The minimum price accepted in an auction
    uint256 public reservePrice;

    // The minimum percentage difference between the last bid amount and the current bid
    uint8 public minBidIncrementPercentage;

    // The duration of a single auction
    uint256 public duration;

    // The active auctions auction1 & auction2
    IMojosAuctionHouse.Auction public auction1;
    IMojosAuctionHouse.Auction public auction2;

    // The creation (deployment) date for the contract
    uint256 public creationDate;

    address public multiSigFeeWallet;

    using SafeMath for uint256;

    /**
     * @notice Initialize the auction house and base contracts,
     * populate configuration values, and pause the contract.
     * @dev This function can only be called once.
     */
    function initialize(
        IMojosToken _mojos1,
        IMojosToken _mojos2,
        address _weth,
        uint256 _timeBuffer,
        uint256 _reservePrice,
        uint8 _minBidIncrementPercentage,
        uint256 _duration,
        address _multisigFeeWallet
    ) external initializer {
        __Pausable_init();
        __ReentrancyGuard_init();
        __Ownable_init();

        _pause();

        mojos1 = _mojos1;
        mojos2 = _mojos2;
        weth = _weth;
        timeBuffer = _timeBuffer;
        reservePrice = _reservePrice;
        minBidIncrementPercentage = _minBidIncrementPercentage;
        duration = _duration;
        creationDate = block.timestamp;
        multiSigFeeWallet = _multisigFeeWallet;
    }

    /**
     * @notice Settle the current auction, mint a new Mojo, and put it up for auction.
     */
    function settleCurrentAndCreateNewAuction() external override nonReentrant whenNotPaused {
        _settleAuction();
        _createAuction();
    }

    /**
     * @notice Settle the current auction.
     * @dev This function can only be called when the contract is paused.
     */
    function settleAuction() external override whenPaused nonReentrant {
        _settleAuction();
    }

    /**
     * @notice Create a bid for a Mojo, with a given amount.
     * @dev This contract only accepts payment in ETH.
     */
    function createBid(uint256 mojoId) external payable override nonReentrant {
        IMojosAuctionHouse.Auction memory _auction = auction1;
        uint8 auctionSlot = 1;
        if (_auction.mojoId != mojoId) {
            _auction = auction2;
            auctionSlot = 2;
        }
        require(_auction.mojoId == mojoId, 'Mojo not up for auction');
        require(block.timestamp < _auction.endTime, 'Auction expired');
        require(msg.value >= reservePrice, 'Must send at least reservePrice');
        require(
            msg.value >= _auction.amount + ((_auction.amount * minBidIncrementPercentage) / 100),
            'Must send more than last bid by minBidIncrementPercentage amount'
        );

        address payable lastBidder = _auction.bidder;

        // Refund the last bidder, if applicable
        if (lastBidder != address(0)) {
            _safeTransferETHWithFallback(lastBidder, _auction.amount);
        }

        if (auctionSlot == 1) {
            auction1.amount = msg.value;
            auction1.bidder = payable(msg.sender);

            // Extend the auction if the bid was received within `timeBuffer` of the auction end time
            bool extended = _auction.endTime - block.timestamp < timeBuffer;
            if (extended) {
                auction1.endTime = _auction.endTime = block.timestamp + timeBuffer;
            }
            emit AuctionBid(_auction.mojoId, msg.sender, msg.value, extended);

            if (extended) {
                emit AuctionExtended(_auction.mojoId, _auction.endTime);
            }
        } else {
            auction2.amount = msg.value;
            auction2.bidder = payable(msg.sender);

            // Extend the auction if the bid was received within `timeBuffer` of the auction end time
            bool extended = _auction.endTime - block.timestamp < timeBuffer;
            if (extended) {
                auction2.endTime = _auction.endTime = block.timestamp + timeBuffer;
            }
            emit AuctionBid(_auction.mojoId, msg.sender, msg.value, extended);

            if (extended) {
                emit AuctionExtended(_auction.mojoId, _auction.endTime);
            }
        }
    }

    /**
     * @notice Pause the Mojos auction house.
     * @dev This function can only be called by the owner when the
     * contract is unpaused. While no new auctions can be started when paused,
     * anyone can settle an ongoing auction.
     */
    function pause() external override onlyOwner {
        _pause();
    }

    /**
     * @notice Unpause the Mojos auction house.
     * @dev This function can only be called by the owner when the
     * contract is paused. If required, this function will start a new auction.
     */
    function unpause() external override onlyOwner {
        _unpause();

        if ((auction1.startTime == 0 || auction1.settled) && (auction2.startTime == 0 || auction2.settled)) {
            _createAuction();
        }
    }

    /**
     * @notice Set the auction time buffer.
     * @dev Only callable by the owner.
     */
    function setTimeBuffer(uint256 _timeBuffer) external override onlyOwner {
        timeBuffer = _timeBuffer;

        emit AuctionTimeBufferUpdated(_timeBuffer);
    }

    /**
     * @notice Set the auction reserve price.
     * @dev Only callable by the owner.
     */
    function setReservePrice(uint256 _reservePrice) external override onlyOwner {
        reservePrice = _reservePrice;

        emit AuctionReservePriceUpdated(_reservePrice);
    }

    /**
     * @notice Set the auction minimum bid increment percentage.
     * @dev Only callable by the owner.
     */
    function setMinBidIncrementPercentage(uint8 _minBidIncrementPercentage) external override onlyOwner {
        minBidIncrementPercentage = _minBidIncrementPercentage;

        emit AuctionMinBidIncrementPercentageUpdated(_minBidIncrementPercentage);
    }

    function oneYearHavePassed() public view returns (bool) {
        return (block.timestamp >= (creationDate + 365 days));
    }

    /**
     * @notice Create an auction.
     * @dev Store the auction details in the `auction` state variable and emit an AuctionCreated event.
     * If the mint reverts, the minter was updated without pausing this contract first. To remedy this,
     * catch the revert and pause this contract.
     */
    function _createAuction() internal {
        try mojos1.mint() returns (uint256 mojoId1) {
            uint256 startTime = block.timestamp;
            uint256 endTime = startTime + duration;

            auction1 = Auction({
                mojoId: mojoId1,
                amount: 0,
                startTime: startTime,
                endTime: endTime,
                bidder: payable(0),
                settled: false
            });

            emit AuctionCreated(mojoId1, startTime, endTime);
        } catch Error(string memory) {
            _pause();
        }

        try mojos2.mint() returns (uint256 mojoId2) {
            uint256 startTime = block.timestamp;
            uint256 endTime = startTime + duration;

            auction2 = Auction({
                mojoId: mojoId2,
                amount: 0,
                startTime: startTime,
                endTime: endTime,
                bidder: payable(0),
                settled: false
            });

            emit AuctionCreated(mojoId2, startTime, endTime);
        } catch Error(string memory) {
            _pause();
        }
    }

    /**
     * @notice Settle an auction, finalizing the bid and paying out to the owner.
     * @dev If there are no bids, the Mojo is burned.
     */
    function _settleAuction() internal {
        IMojosAuctionHouse.Auction memory _auction1 = auction1;
        IMojosAuctionHouse.Auction memory _auction2 = auction2;
        require(_auction1.startTime != 0, "Auction 1 hasn't begun");
        require(_auction2.startTime != 0, "Auction 2 hasn't begun");
        require(!_auction1.settled, 'Auction 1 has already been settled');
        require(!_auction2.settled, 'Auction 2 has already been settled');
        require(block.timestamp >= _auction1.endTime, "Auction hasn't completed");
        require(block.timestamp >= _auction2.endTime, "Auction hasn't completed");

        auction1.settled = true;
        auction2.settled = true;

        if (_auction1.bidder == address(0)) {
            mojos1.burn(_auction1.mojoId);
        } else {
            mojos1.transferFrom(address(this), _auction1.bidder, _auction1.mojoId);
        }

        if (_auction2.bidder == address(0)) {
            mojos2.burn(_auction2.mojoId);
        } else {
            mojos2.transferFrom(address(this), _auction2.bidder, _auction2.mojoId);
        }

        if (_auction1.amount > 0) {
            if (!oneYearHavePassed()) {
                uint256 fee = _auction1.amount.mul(10).div(100);
                //10% fee for multisig
                _safeTransferETHWithFallback(multiSigFeeWallet, fee);
                _safeTransferETHWithFallback(owner(), _auction1.amount.sub(fee));
            } else {
                _safeTransferETHWithFallback(owner(), _auction1.amount);
            }
        }

        if (_auction2.amount > 0) {
            if (!oneYearHavePassed()) {
                uint256 fee = _auction2.amount.mul(10).div(100);
                //10% fee for multisig
                _safeTransferETHWithFallback(multiSigFeeWallet, fee);
                _safeTransferETHWithFallback(owner(), _auction2.amount.sub(fee));
            } else {
                _safeTransferETHWithFallback(owner(), _auction2.amount);
            }
        }

        emit AuctionSettled(_auction1.mojoId, _auction1.bidder, _auction1.amount);
        emit AuctionSettled(_auction2.mojoId, _auction2.bidder, _auction2.amount);
    }

    /**
     * @notice Transfer ETH. If the ETH transfer fails, wrap the ETH and try send it as WETH.
     */
    function _safeTransferETHWithFallback(address to, uint256 amount) internal {
        if (!_safeTransferETH(to, amount)) {
            IWETH(weth).deposit{ value: amount }();
            IERC20(weth).transfer(to, amount);
        }
    }

    /**
     * @notice Transfer ETH and return the success status.
     * @dev This function only forwards 30,000 gas to the callee.
     */
    function _safeTransferETH(address to, uint256 value) internal returns (bool) {
        (bool success, ) = to.call{ value: value, gas: 30_000 }(new bytes(0));
        return success;
    }
}
