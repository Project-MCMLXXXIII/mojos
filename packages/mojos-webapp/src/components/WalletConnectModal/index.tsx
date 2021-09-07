import Modal from '../Modal';
import WalletButton from '../WalletButton';
import { WALLET_TYPE } from '../WalletButton';
import { useEthers } from '@usedapp/core';
import { InjectedConnector } from '@web3-react/injected-connector';
import { WalletLinkConnector } from '@web3-react/walletlink-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import { TrezorConnector } from '@web3-react/trezor-connector';
import { FortmaticConnector } from '@web3-react/fortmatic-connector';
import config, { CHAIN_ID } from '../../config';
import classes from './WalletConnectModal.module.css';
import { useState } from 'react';

const WalletConnectModal: React.FC<{ onDismiss: () => void }> = props => {
  const { onDismiss } = props;
  const { activate } = useEthers();
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const supportedChainIds = [CHAIN_ID];

  const wallets = (
    <>
      <WalletButton
        onClick={() => {
          const injected = new InjectedConnector({
            supportedChainIds,
          });
          activate(injected);
        }}
        walletType={WALLET_TYPE.metamask}
      />
      <WalletButton
        onClick={() => {
          const fortmatic = new FortmaticConnector({
            apiKey: 'pk_test_FB5E5C15F2EC5AE6',
            chainId: CHAIN_ID,
          });
          activate(fortmatic);
        }}
        walletType={WALLET_TYPE.fortmatic}
      />
      <WalletButton
        onClick={() => {
          const walletlink = new WalletConnectConnector({
            supportedChainIds,
            chainId: CHAIN_ID,
            rpc: {
              [CHAIN_ID]: config.jsonRpcUri,
            },
          });
          activate(walletlink);
        }}
        walletType={WALLET_TYPE.walletconnect}
      />
      <WalletButton
        onClick={() => {
          const walletlink = new WalletLinkConnector({
            appName: 'Mojos.TODO',
            appLogoUrl: 'https://mojos.wtf/static/media/logo.cdea1650.svg',
            url: config.jsonRpcUri,
            supportedChainIds,
          });
          activate(walletlink);
        }}
        walletType={WALLET_TYPE.coinbaseWallet}
      />
      <WalletButton
        onClick={() => {
          const injected = new InjectedConnector({
            supportedChainIds,
          });
          activate(injected);
        }}
        walletType={WALLET_TYPE.brave}
      />
      {/* <WalletButton
        onClick={() => {
          const ledger = new LedgerConnector({
            //TODO: refactor
            chainId: config.supportedChainId,
            url: config.rinkebyJsonRpc,
          });
          activate(ledger);
        }}
        walletType={WALLET_TYPE.ledger}
      /> */}
      <WalletButton
        onClick={() => {
          const trezor = new TrezorConnector({
            chainId: CHAIN_ID,
            url: config.jsonRpcUri,
            manifestAppUrl: 'mojoops+trezorconnect@protonmail.com.todo',
            manifestEmail: 'https://mojos.todo',
          });
          activate(trezor);
        }}
        walletType={WALLET_TYPE.trezor}
      />
      <div className={classes.clickable} onClick={() => setAdvancedOpen(!advancedOpen)}>
        Advanced {advancedOpen ? '^' : 'v'}
      </div>
      {advancedOpen && (
        <div
          className={classes.clickable}
          onClick={() => {
            console.log(localStorage.removeItem('walletconnect'));
          }}
        >
          Clear WalletConnect Data
        </div>
      )}
    </>
  );
  return <Modal title="Connect your wallet" content={wallets} onDismiss={onDismiss} />;
};
export default WalletConnectModal;
