import { log } from '@graphprotocol/graph-ts';
import {
  DelegateChanged,
  DelegateVotesChanged,
  MojoCreated,
  Transfer,
} from './types/MojosToken/MojosToken';
import { Mojo, Seed } from './types/schema';
import { BIGINT_ONE, BIGINT_ZERO, ZERO_ADDRESS } from './utils/constants';
import { getGovernanceEntity, getOrCreateDelegate, getOrCreateAccount } from './utils/helpers';

export function handleMojoCreated(event: MojoCreated): void {
  let mojoId = event.params.tokenId.toString();

  let seed = new Seed(mojoId);
  seed.background = event.params.seed.background;
  seed.body = event.params.seed.body;
  seed.bodyAccessory = event.params.seed.bodyAccessory;
  seed.face = event.params.seed.face;
  seed.headAccessory = event.params.seed.headAccessory;
  seed.save();

  let mojo = Mojo.load(mojoId);
  if (mojo == null) {
    log.error('[handleMojoCreated] Mojo #{} not found. Hash: {}', [
      mojoId,
      event.transaction.hash.toHex(),
    ]);
    return;
  }

  mojo.seed = seed.id;
  mojo.save();
}

let accountMojos: string[] = []; // Use WebAssembly global due to lack of closure support
export function handleDelegateChanged(event: DelegateChanged): void {
  let tokenHolder = getOrCreateAccount(event.params.delegator.toHexString());
  let previousDelegate = getOrCreateDelegate(event.params.fromDelegate.toHexString());
  let newDelegate = getOrCreateDelegate(event.params.toDelegate.toHexString());
  accountMojos = tokenHolder.mojos;

  tokenHolder.delegate = newDelegate.id;
  tokenHolder.save();

  previousDelegate.tokenHoldersRepresentedAmount =
    previousDelegate.tokenHoldersRepresentedAmount - 1;
  let previousMojosRepresented = previousDelegate.mojosRepresented; // Re-assignment required to update array
  previousDelegate.mojosRepresented = previousMojosRepresented.filter(
    n => !accountMojos.includes(n),
  );
  newDelegate.tokenHoldersRepresentedAmount = newDelegate.tokenHoldersRepresentedAmount + 1;
  let newMojosRepresented = newDelegate.mojosRepresented; // Re-assignment required to update array
  for (let i = 0; i < accountMojos.length; i++) {
    newMojosRepresented.push(accountMojos[i]);
  }
  newDelegate.mojosRepresented = newMojosRepresented;
  previousDelegate.save();
  newDelegate.save();
}

export function handleDelegateVotesChanged(event: DelegateVotesChanged): void {
  let governance = getGovernanceEntity();
  let delegate = getOrCreateDelegate(event.params.delegate.toHexString());
  let votesDifference = event.params.newBalance - event.params.previousBalance;

  delegate.delegatedVotesRaw = event.params.newBalance;
  delegate.delegatedVotes = event.params.newBalance;
  delegate.save();

  if (event.params.previousBalance == BIGINT_ZERO && event.params.newBalance > BIGINT_ZERO) {
    governance.currentDelegates = governance.currentDelegates + BIGINT_ONE;
  }
  if (event.params.newBalance == BIGINT_ZERO) {
    governance.currentDelegates = governance.currentDelegates - BIGINT_ONE;
  }
  governance.delegatedVotesRaw = governance.delegatedVotesRaw + votesDifference;
  governance.delegatedVotes = governance.delegatedVotesRaw;
  governance.save();
}

let transferredMojoId: string; // Use WebAssembly global due to lack of closure support
export function handleTransfer(event: Transfer): void {
  let fromHolder = getOrCreateAccount(event.params.from.toHexString());
  let toHolder = getOrCreateAccount(event.params.to.toHexString());
  let governance = getGovernanceEntity();
  transferredMojoId = event.params.tokenId.toString();

  // fromHolder
  if (event.params.from.toHexString() == ZERO_ADDRESS) {
    governance.totalTokenHolders = governance.totalTokenHolders + BIGINT_ONE;
    governance.save();
  } else {
    let fromHolderPreviousBalance = fromHolder.tokenBalanceRaw;
    fromHolder.tokenBalanceRaw = fromHolder.tokenBalanceRaw - BIGINT_ONE;
    fromHolder.tokenBalance = fromHolder.tokenBalanceRaw;
    let fromHolderMojos = fromHolder.mojos; // Re-assignment required to update array
    fromHolder.mojos = fromHolderMojos.filter(n => n !== transferredMojoId);

    if (fromHolder.delegate != null) {
      let fromHolderDelegate = getOrCreateDelegate(fromHolder.delegate);
      let fromHolderMojosRepresented = fromHolderDelegate.mojosRepresented; // Re-assignment required to update array
      fromHolderDelegate.mojosRepresented = fromHolderMojosRepresented.filter(
        n => n !== transferredMojoId,
      );
      fromHolderDelegate.save();
    }

    if (fromHolder.tokenBalanceRaw < BIGINT_ZERO) {
      log.error('Negative balance on holder {} with balance {}', [
        fromHolder.id,
        fromHolder.tokenBalanceRaw.toString(),
      ]);
    }

    if (fromHolder.tokenBalanceRaw == BIGINT_ZERO && fromHolderPreviousBalance > BIGINT_ZERO) {
      governance.currentTokenHolders = governance.currentTokenHolders - BIGINT_ONE;
      governance.save();

      fromHolder.delegate = null;
    } else if (
      fromHolder.tokenBalanceRaw > BIGINT_ZERO &&
      fromHolderPreviousBalance == BIGINT_ZERO
    ) {
      governance.currentTokenHolders = governance.currentTokenHolders + BIGINT_ONE;
      governance.save();
    }

    fromHolder.save();
  }

  // toHolder
  if (event.params.to.toHexString() == ZERO_ADDRESS) {
    governance.totalTokenHolders = governance.totalTokenHolders - BIGINT_ONE;
    governance.save();
  }

  let toHolderDelegate = getOrCreateDelegate(toHolder.id);
  let toHolderMojosRepresented = toHolderDelegate.mojosRepresented; // Re-assignment required to update array
  toHolderMojosRepresented.push(transferredMojoId);
  toHolderDelegate.mojosRepresented = toHolderMojosRepresented;
  toHolderDelegate.save();

  let toHolderPreviousBalance = toHolder.tokenBalanceRaw;
  toHolder.tokenBalanceRaw = toHolder.tokenBalanceRaw + BIGINT_ONE;
  toHolder.tokenBalance = toHolder.tokenBalanceRaw;
  toHolder.totalTokensHeldRaw = toHolder.totalTokensHeldRaw + BIGINT_ONE;
  toHolder.totalTokensHeld = toHolder.totalTokensHeldRaw;
  let toHolderMojos = toHolder.mojos; // Re-assignment required to update array
  toHolderMojos.push(event.params.tokenId.toString());
  toHolder.mojos = toHolderMojos;

  if (toHolder.tokenBalanceRaw == BIGINT_ZERO && toHolderPreviousBalance > BIGINT_ZERO) {
    governance.currentTokenHolders = governance.currentTokenHolders - BIGINT_ONE;
    governance.save();
  } else if (toHolder.tokenBalanceRaw > BIGINT_ZERO && toHolderPreviousBalance == BIGINT_ZERO) {
    governance.currentTokenHolders = governance.currentTokenHolders + BIGINT_ONE;
    governance.save();

    toHolder.delegate = toHolder.id;
  }

  let mojo = Mojo.load(transferredMojoId);
  if (mojo == null) {
    mojo = new Mojo(transferredMojoId);
  }

  mojo.owner = toHolder.id;
  mojo.save();

  toHolder.save();
}
