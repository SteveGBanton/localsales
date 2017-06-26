import React, { Component } from 'react'
import {
  Button,
  InputGroup,
  Input,
  Icon,
  View,
  Spinner,
  Text
} from 'native-base'

import { Dimensions } from 'react-native'
import { observer } from 'mobx-react/native'



@observer
export default class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      loading: null
    }
  }
  updateEmail(email) { this.setState({email: email}) }
  updatePassword(password) { this.setState({password: password}) }

  signIn() {
    const { auth } = this.props.navigation.state.params.state.store
    const { email, password } = this.state

    this.setState({loading: true}, () => {
      auth.signIn({email, password})
      .then(() => {
        this.props.navigation.navigate('Drawer', {
          screenProps: 'hello'
        })
      })
    })
  }

  render() {
    const { loading } = this.state
    const { auth } = this.props.navigation.state.params.state.store
    return (
      <View theme={this.props.theme}>
        <InputGroup style={{marginBottom:10}} borderType='round'>
          <Icon style={{color: "#FFF"}} name="mail"/>
          <Input style={{color: "#FFF"}}
          placeholder="Email"
          placeholderTextColor="#FFF"
          onChangeText={(email) => {
            this.updateEmail(email)}}
          />
        </InputGroup>
        <InputGroup style={{marginBottom:10}} borderType='round'>
          <Icon style={{color: "#FFF"}} name="lock"/>
          <Input style={{color: "#FFF"}}
          placeholder="Password"
          placeholderTextColor="#FFF"
          secureTextEntry={true}
          onChangeText={(pass) => {
            this.updatePassword(pass)}}
          />
        </InputGroup>
        <Button block style={{justifyContent: 'center'}}
        onPress={this.signIn.bind(this)}>
          <Text>Login</Text>
        </Button>
      </View>


    )

  }
}
