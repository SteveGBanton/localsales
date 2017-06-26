import React, { Component } from 'react'
import { Text } from 'react-native'
import { Container, Header, Left, Body, Icon, Right, Button, Title, Content } from 'native-base'

class Info extends Component {

  render() {
    const { navigate } = this.props.navigation
    const testing = this.props.navigation
    console.log(testing)
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
              <Title>Nne</Title>
          </Body>
          <Right />
        </Header>
          <Content padder>
            <Button onPress={() => this.props.navigation.goBack()}>
              <Text>Back</Text>
            </Button>
          </Content>

      <Text onPress={() => this.props.navigation.navigate('HomeScreen')}>Info Page</Text>
      </Container>
    )
  }
}



export default Info;
