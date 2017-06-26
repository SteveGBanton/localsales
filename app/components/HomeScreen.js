import React, { Component } from 'react'
import { View, Button, Container, Header, Left, Body, Right, Content, Footer, Icon, Title } from 'native-base'
import { Text } from 'react-native'



export default class HomeScreen extends Component {

  render() {
    const { navigate } = this.props.navigation

    return (
      <Container>
        <Header>
          <Left>
            <Button transparent>
              <Icon name='menu' onPress={() => navigate('DrawerOpen')} />
            </Button>
          </Left>
          <Body>
              <Title>Home Screen</Title>
          </Body>
          <Right>
          </Right>
        </Header>
        <Content>
          <Text>Hello, Navigation!</Text>
          <Button onPress={() => navigate('DrawerOpen')}>
            <Text>Open Drawer</Text>
          </Button>
          <Button onPress={() => navigate('PostDeal')}>
            <Text>Post To DB</Text>
          </Button>
        </Content>
        <Footer>
        </Footer>
      </Container>
    )
  }
}
