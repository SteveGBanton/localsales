import React, { Component } from 'react'
import { View, Button } from 'native-base'
import { StackNavigator, DrawerNavigator } from 'react-navigation'
import { Text } from 'react-native'

import HomeScreen from './components/HomeScreen'
import Drawer from './components/Drawer'
import DealPage from './components/DealPage'
import Splash from './Splash'
import LoginScene from './LoginScene'
import StorePage from './components/StorePage'
import PostDeal from './components/PostDeal'

const AppContainer = StackNavigator({
  Splash: { screen: Splash },
  LoginScene: { screen: LoginScene },
  Drawer: { screen: Drawer },
  StorePage: { screen: StorePage },
  DealPage: { screen: DealPage },
  PostDeal: { screen: PostDeal }
  },
  {
    initialRouteName: "Splash",
    headerMode: "none",
  }

);

export default () => <AppContainer />
