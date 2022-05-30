import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ChainId, DAppProvider } from '@usedapp/core';
import { Web3ReactProvider } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import account from './state/slices/account';
import application from './state/slices/application';
import logs from './state/slices/logs';
import auction, {
  reduxSafeAuction,
  reduxSafeNewAuction,
  reduxSafeBid,
  setActiveAuction,
  setAuctionExtended,
  setAuctionSettled,
  setFullAuction,
} from './state/slices/auction';
import onDisplayAuction, {
  setLastAuctionMojoId,
  setOnDisplayAuctionMojoId,
} from './state/slices/onDisplayAuction';
import { ApolloProvider, useQuery } from '@apollo/client';
import { clientFactory, latestAuctionsQuery } from './wrappers/subgraph';
import { useEffect } from 'react';
import pastAuctions, { addPastAuctions } from './state/slices/pastAuctions';
import LogsUpdater from './state/updaters/logs';
import config, { CHAIN_ID, createNetworkHttpUrl } from './config';
import { WebSocketProvider } from '@ethersproject/providers';
import { BigNumber, BigNumberish } from 'ethers';
import { MojosAuctionHouseFactory } from '@mojos/sdk';
import dotenv from 'dotenv';
import { useAppDispatch, useAppSelector } from './hooks';
import { appendBid } from './state/slices/auction';
import { ConnectedRouter, connectRouter } from 'connected-react-router';
import { createBrowserHistory, History } from 'history';
import { applyMiddleware, createStore, combineReducers, PreloadedState } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { mojoPath } from './utils/history';
import { push } from 'connected-react-router';

dotenv.config();

export const history = createBrowserHistory();

const createRootReducer = (history: History) =>
  combineReducers({
    router: connectRouter(history),
    account,
    application,
    auction,
    logs,
    pastAuctions,
    onDisplayAuction,
  });

export default function configureStore(preloadedState: PreloadedState<any>) {
  const store = createStore(
    createRootReducer(history), // root reducer with router state
    preloadedState,
    composeWithDevTools(
      applyMiddleware(
        routerMiddleware(history), // for dispatching history actions
        // ... other middlewares ...
      ),
    ),
  );

  return store;
}

const store = configureStore({});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// prettier-ignore
const useDappConfig = {
  readOnlyChainId: CHAIN_ID,
  readOnlyUrls: {
    [ChainId.Rinkeby]: createNetworkHttpUrl('rinkeby'),
    [ChainId.Mainnet]: createNetworkHttpUrl('mainnet'),
    [ChainId.Hardhat]: 'http://localhost:8545',
    [ChainId.Fantom]: createNetworkHttpUrl('fantom'),
    [4002]: createNetworkHttpUrl('fantomtest'),
  },
  // multicallAddresses: {
  //   1: '0xeefba1e63905ef1d7acba5a8513c70307c1ce441',
  //   4002: '0xA01917aF773b703717C25C483a619e9218343531',
  // },
};

const client = clientFactory(config.app.subgraphApiUri);

const Updaters = () => {
  return (
    <>
      <LogsUpdater />
    </>
  );
};

const BLOCKS_PER_DAY = 6_500;

const ChainSubscriber: React.FC = () => {
  const dispatch = useAppDispatch();

  const loadState = async () => {
    const wsProvider = new WebSocketProvider(config.app.wsRpcUri);
    const mojosAuctionHouseContract = MojosAuctionHouseFactory.connect(
      config.addresses.mojosAuctionHouseProxy,
      wsProvider,
    );

    const bidFilter = mojosAuctionHouseContract.filters.AuctionBid(null, null, null, null);
    const extendedFilter = mojosAuctionHouseContract.filters.AuctionExtended(null, null);
    const createdFilter = mojosAuctionHouseContract.filters.AuctionCreated(null, null, null);
    const settledFilter = mojosAuctionHouseContract.filters.AuctionSettled(null, null, null);
    const processBidFilter = async (
      mojoId: BigNumberish,
      sender: string,
      value: BigNumberish,
      extended: boolean,
      event: any,
    ) => {
      const timestamp = (await event.getBlock()).timestamp;
      const transactionHash = event.transactionHash;
      dispatch(
        appendBid(reduxSafeBid({ mojoId, sender, value, extended, transactionHash, timestamp })),
      );
    };
    const processAuctionCreated = (
      mojoId: BigNumberish,
      startTime: BigNumberish,
      endTime: BigNumberish,
    ) => {
      dispatch(
        setActiveAuction(reduxSafeNewAuction({ mojoId, startTime, endTime, settled: false })),
      );
      const mojoIdNumber = BigNumber.from(mojoId).toNumber();
      dispatch(push(mojoPath(mojoIdNumber)));
      dispatch(setOnDisplayAuctionMojoId(mojoIdNumber));
      dispatch(setLastAuctionMojoId(mojoIdNumber));
    };
    const processAuctionExtended = (mojoId: BigNumberish, endTime: BigNumberish) => {
      dispatch(setAuctionExtended({ mojoId, endTime }));
    };
    const processAuctionSettled = (mojoId: BigNumberish, winner: string, amount: BigNumberish) => {
      dispatch(setAuctionSettled({ mojoId, amount, winner }));
    };

    // Fetch the current auction
    // debugger;
    const currentAuction = await mojosAuctionHouseContract.auction1();
    dispatch(setFullAuction(reduxSafeAuction(currentAuction)));
    dispatch(setLastAuctionMojoId(currentAuction.mojoId.toNumber()));

    // Fetch the previous 24hours of  bids
    const previousBids = await mojosAuctionHouseContract.queryFilter(bidFilter, 0 - BLOCKS_PER_DAY);
    for (let event of previousBids) {
      if (event.args === undefined) return;
      processBidFilter(...(event.args as [BigNumber, string, BigNumber, boolean]), event);
    }

    mojosAuctionHouseContract.on(bidFilter, (mojoId, sender, value, extended, event) =>
      processBidFilter(mojoId, sender, value, extended, event),
    );
    mojosAuctionHouseContract.on(createdFilter, (mojoId, startTime, endTime) =>
      processAuctionCreated(mojoId, startTime, endTime),
    );
    mojosAuctionHouseContract.on(extendedFilter, (mojoId, endTime) =>
      processAuctionExtended(mojoId, endTime),
    );
    mojosAuctionHouseContract.on(settledFilter, (mojoId, winner, amount) =>
      processAuctionSettled(mojoId, winner, amount),
    );
  };
  loadState();

  return <></>;
};

const PastAuctions: React.FC = () => {
  const latestAuctionId = useAppSelector(state => state.onDisplayAuction.lastAuctionMojoId);
  const { data } = useQuery(latestAuctionsQuery());
  const dispatch = useAppDispatch();

  useEffect(() => {
    data && dispatch(addPastAuctions({ data }));
  }, [data, latestAuctionId, dispatch]);

  return <></>;
};

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <ChainSubscriber />
      <React.StrictMode>
        <Web3ReactProvider
          getLibrary={
            provider => new Web3Provider(provider) // this will vary according to whether you use e.g. ethers or web3.js
          }
        >
          <ApolloProvider client={client}>
            <PastAuctions />
            <DAppProvider config={useDappConfig}>
              <App />
              <Updaters />
            </DAppProvider>
          </ApolloProvider>
        </Web3ReactProvider>
      </React.StrictMode>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
