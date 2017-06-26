import React, { Component } from "react"

import {
  Container,
  Content,
  View,
  Text
} from "native-base"

import {
  Image,
  StyleSheet,
  Dimensions
} from 'react-native'

import Login from './components/Login'
import { observer } from 'mobx-react/native'

@observer //notify class every time it needs to refresh due to data change.
export default class LoginScene extends Component {

  constructor() {
    super()

  }

  render() {
    console.log(this.props)
    const { store } = this.props.navigation.state.params.state
    return (
      <Container>
          <Content scrollEnabled={false}>
            <Image resizeMode='cover' style={style.loginBackground} source={store.settings.LoginBG}>
              <View style={style.loginForeground}>
                <Login {...this.state} {...this.props}/>
              </View>
            </Image>

          </Content>
      </Container>

    )
  }
}

const style = {
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0
  },
  loginBackground: {
    flex: 1,
    height: (Dimensions.get('window').height),
    width: undefined
  },
  loginForeground: {
    marginTop: (Dimensions.get('window').height/1.75),
    paddingTop: 20,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 90,
    bottom: 0,
    flex: 1
  }
}
