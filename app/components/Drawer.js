import React, { Component } from 'react'
import { DrawerNavigator } from 'react-navigation'

import HomeScreen from './HomeScreen'
import DealPage from './DealPage'
import SideBar from './SideBar'
import PostDeal from './PostDeal'
import Profile from './Profile'
import SearchByDeal from './SearchByDeal'
import SearchByProduct from './SearchByProduct'
import SearchByStore from './SearchByStore'
import StorePage from './StorePage'

const Drawer = DrawerNavigator(
  {
    HomeScreen: { screen: HomeScreen },
    PostDeal: { screen: PostDeal },
    Profile: { screen: Profile },
    SearchByDeal: { screen: SearchByDeal },
    SearchByProduct: { screen: SearchByProduct },
    SearchByStore: { screen: SearchByStore }
  },
  {
    initialRouteName: "HomeScreen",
    contentOptions: {
    activeTintColor: "#e91e63",
  },
    contentComponent: props => <SideBar {...props} />
  }
)

export default Drawer
