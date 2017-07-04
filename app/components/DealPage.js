import React, { Component } from 'react'
import { Image } from 'react-native'
import firebase from 'firebase'
import { Text, View, Card, Thumbnail, CardItem, Container, Content, Header, Left, Body, Icon, Right, Button, Title } from 'native-base'
import { NavigationActions } from 'react-navigation'
import { observer } from 'mobx-react/native'

import SettingsStore from '../stores/SettingsStore'

const settings = new SettingsStore()

@observer
class DealPage extends Component {

  render() {

    const { navigate } = this.props.navigation
    const { params } = this.props.navigation.state

    const image = {
      uri: params.photoURL
    }
    console.log(params.photoURL)

    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
              <Title>Deal Detail</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <View>
            <Card style={{ flex: 0 }}>
              <CardItem>
                <Left>
                    <Thumbnail source={image}/>
                    <Body>
                        <Text>{params.productName}</Text>
                        <Text note>{params.description}</Text>
                    </Body>
                </Left>
              </CardItem>
              <CardItem cardBody>
                  <Image resizeMode='contain' style={{ height: 250, flex: 1, flexGrow: 1, flexBasis: 0 }} source={image} />
              </CardItem>
              <CardItem>
                <Button transparent onPress={() => {
                  console.log('test data change w this button - should reload state on change.')
              }}>
                    <Icon active name="thumbs-up" />
                    <Text>1 Like</Text>
                </Button>
                <Button transparent>
                    <Icon active name="chatbubbles" />
                    <Text>4 Comments</Text>
                </Button>
                <Text>11 hours ago</Text>
              </CardItem>
            </Card>
          </View>
        </Content>

      </Container>
    )
  }
}



export default DealPage;
