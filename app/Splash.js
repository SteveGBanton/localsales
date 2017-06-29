import React, { Component } from 'react'
import { View, Button, Container, Content } from 'native-base'
import { Text, Image, Dimensions } from 'react-native'
import { NavigationActions } from 'react-navigation'
import firebase from 'firebase'
import { observer } from 'mobx-react/native'

import Login from './components/Login'
import picImg from '../img/splash.jpg'
import theme from './themes/light'

import AuthStore from './stores/AuthStore'
import SettingsStore from './stores/SettingsStore'
import DealStore from './stores/DealStore'
import PostStore from './stores/PostStore'

const authStore = new AuthStore()
const settings = new SettingsStore()
const dealStore = new DealStore()
const postStore = new PostStore()

@observer
export default class Splash extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props)
    this.state = {
      store: {
        settings: settings,
        auth: authStore,
        deals: dealStore,
        posts: postStore

      }
    }
    console.log(postStore)
  }

  componentDidMount() {

    //authStore.signOut()

    const resetActionLogin = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'LoginScene', params: {
          state: {...this.state}
        }
      })
      ]
    })

    const resetActionHome = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'Drawer', params: {...this.state} })
      ]
    })

    const { dispatch } = this.props.navigation
    const { navigate } = this.props.navigation
    const currentState = this.state

    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        setTimeout(() => {
          navigate('Drawer', { state: {...currentState} }
          )
        }, 200)
      } else {
        setTimeout(() => {
          navigate('LoginScene', { state: {...currentState} })
        }, 200)
      }
    })

  }

  render() {

    return (
      <Container>
      <Content>
        <Image resizeMode="cover" style={{
          flex: 1,
          width: undefined,
          height: Dimensions.get('window').height
        }} source={require('../img/splash.jpg')} />
        </Content>
      </Container>
    )
  }
}
