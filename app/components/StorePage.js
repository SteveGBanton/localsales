import React, { Component } from 'react'
import { Text } from 'react-native'
import { Container, Header, Left, Body, Icon, Right, Button, Title } from 'native-base'

class StorePage extends Component {
  static navigationOptions = {
    header: 'on',
    title: 'Anatomy',
  };

  render() {
    const { navigate } = this.props.navigation
    return (
      <Container>
      <Header>
        <Left>
          <Button transparent onPress={() => this.props.navigation.goBack()}>
            <Icon name="arrow-back" />
          </Button>
        </Left>
        <Body>
            <Title>Store Title</Title>
        </Body>
        <Right />
      </Header>
      <Text onPress={() => this.props.navigation.navigate('HomeScreen')}>Anatomy Test</Text>
      </Container>
    )
  }
}



export default StorePage;
