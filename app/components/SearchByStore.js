import React, { Component } from 'react'
import { Text } from 'react-native'
import { Container, Header, Left, Body, Icon, Right, Button, Title } from 'native-base'

class SearchByStore extends Component {
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
          <Button transparent>
            <Icon name='menu' onPress={() => navigate('DrawerOpen')}/>
          </Button>
        </Left>
        <Body>
            <Title>Stores</Title>
        </Body>
        <Right />
      </Header>
      <Text onPress={() => this.props.navigation.navigate('HomeScreen')}>Anatomy Test</Text>
      </Container>
    )
  }
}



export default SearchByStore;
