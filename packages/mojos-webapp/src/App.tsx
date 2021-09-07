import { useEffect } from 'react';
import { useEthers } from '@usedapp/core';
import { useAppDispatch, useAppSelector } from './hooks';
import { setActiveAccount } from './state/slices/account';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { setAlertModal } from './state/slices/application';
import classes from './App.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AlertModal from './components/Modal';
import NavBar from './components/NavBar';
import NetworkAlert from './components/NetworkAlert';
import Footer from './components/Footer';
import AuctionPage from './pages/Auction';
import GovernancePage from './pages/Governance';
import VotePage from './pages/Vote';
import MojosPage from './pages/Mojos';
import { CHAIN_ID } from './config';

function App() {
  const { account, chainId } = useEthers();
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Local account array updated
    dispatch(setActiveAccount(account));
  }, [account, dispatch]);

  const alertModal = useAppSelector(state => state.application.alertModal);
  const useGreyBg = useAppSelector(state => state.application.useGreyBackground);

  return (
    <div className={useGreyBg ? classes.greyBg : classes.beigeBg}>
      {Number(CHAIN_ID) !== chainId && <NetworkAlert />}
      {alertModal.show && (
        <AlertModal
          title={alertModal.title}
          content={<p>{alertModal.message}</p>}
          onDismiss={() => dispatch(setAlertModal({ ...alertModal, show: false }))}
        />
      )}
      <BrowserRouter>
        <NavBar />
        <Switch>
          <Route exact path="/" component={AuctionPage} />
          <Route exact path="/mojos" component={MojosPage} />
          <Route exact path="/vote" component={GovernancePage} />
          <Route exact path="/vote/:id" component={VotePage} />
        </Switch>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
