import React from 'react'
import { Route, Switch, useLocation } from 'react-router-dom'
import PrivateRoute from './PrivateRoutes'
import Account from '../components/Account'
import WalletSetup from '../components/WalletSetup'
import CollectionView from '../containers/CollectionView/index'
import ManageAlert from '../containers/Manage-Alert'
import CreateAlert from '../containers/Create-Alert/index'
import FlipView from '../components/FlipView/FlipView'
import './Route.css'
import {
  Mission,
  DiscordMission,
  DiscordVideo,
  DiscordMissComp
} from '../components/Mission'
import CreateBot from '../containers/Create-Bot'
import ManageBot from '../containers/Manage-Bot'
import CreateScreen from '../components/Create-Bot/CreateScreen'
import BotActivation from '../components/Create-Bot/BotActivation'
import BotModule from '../components/botModule/index'
import WithdrawRequest from '../components/WithdrawRequest'
import TokenView from '../containers/TokenView/index'
import HomeScreen from '../components/HomeScreen'
import Header from '../containers/header/index'
import NewHeader from '../components/Header/NewHeader'

// eslint-disable-next-line react/prefer-stateless-function
const Application = () => {
  const location = useLocation()
  return (
    <>
      {location.pathname === '/' ||
      location.pathname === '/withdraw-request' ||
      location.pathname === '/wallet' ||
      location.pathname === '/create-bot-confirm' ||
      location.pathname === '/create-alert' ||
      location.pathname === '/create-bot' ||
      location.pathname === '/bot-activation' ||
      location.pathname === '/explore' ||
      location.pathname === '/bot' ||
      location?.pathname.includes('/token') ? null : (
        <Header />
      )}
      {location.pathname === '/explore' ? <NewHeader /> : null}
      <Switch>
        <Route exact path='/collections/:id' component={CollectionView} />
        <Route exact path='/token/:id' component={TokenView} />
        <PrivateRoute path='/bot' component={BotModule} />
        <PrivateRoute exact path='/account' component={Account} />
        <PrivateRoute
          exact
          path='/withdraw-request'
          component={WithdrawRequest}
        />
        <PrivateRoute exact path='/explore' component={HomeScreen} />
        <PrivateRoute exact path='/manage-alert' component={ManageAlert} />
        <PrivateRoute exact path='/create-alert' component={CreateAlert} />
        <PrivateRoute exact path='/mission' component={Mission} />
        <PrivateRoute
          exact
          path='/discord-mission'
          component={DiscordMission}
        />
        <PrivateRoute exact path='/discord-video' component={DiscordVideo} />
        <PrivateRoute
          exact
          path='/discord-complete'
          component={DiscordMissComp}
        />
        <PrivateRoute exact path='/wallet' component={WalletSetup} />
        <PrivateRoute exact path='/create-bot' component={CreateBot} />
        <PrivateRoute exact path='/manage-bot' component={ManageBot} />
        <PrivateRoute
          exact
          path='/create-bot-confirm'
          component={CreateScreen}
        />
        <PrivateRoute exact path='/bot-activation' component={BotActivation} />
        <Route path='/' component={FlipView} />
      </Switch>
    </>
  )
}

export default Application
