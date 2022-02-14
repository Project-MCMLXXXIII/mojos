// SPDX-License-Identifier: MIT

pragma solidity ^0.8.6;

import '../governance/MojosDAOLogicV1.sol';

contract MojosDAOLogicV1Harness is MojosDAOLogicV1 {
    function initialize(
        address timelock_,
        address Mojos_,
        address vetoer_,
        uint256 votingPeriod_,
        uint256 votingDelay_,
        uint256 proposalThresholdBPS_,
        uint256 quorumVotesBPS_
    ) public override {
        require(msg.sender == admin, 'MojosDAO::initialize: admin only');
        require(address(timelock) == address(0), 'MojosDAO::initialize: can only initialize once');

        timelock = IMojosDAOExecutor(timelock_);
        Mojos = MojosTokenLike(Mojos_);
        vetoer = vetoer_;
        votingPeriod = votingPeriod_;
        votingDelay = votingDelay_;
        proposalThresholdBPS = proposalThresholdBPS_;
        quorumVotesBPS = quorumVotesBPS_;
    }
}
