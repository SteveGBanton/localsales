import React, { Component } from 'react'
import {
  Container,
  List,
  ListItem,
  Content,
  Header,
  Left,
  Body,
  Icon,
  Right,
  Button,
  Title,
  Text,
  Spinner,
View } from 'native-base'

import { observer } from 'mobx-react/native'
import { autoSubscriber } from 'firebase-nest'

 //makes component subscribe and unsub from correct firebase queries automatically

const items = [


]

class SearchByDeal extends Component {

  constructor(props) {
    super(props)
    this.state = {
      fetching: true
    }
  }

//for autoSubscriber
  static getSubs(props, state) {
    return props.navigation.state.params.state.store.deals.subs() //gives firebase nest our stores sub object
  }

  subscribeSubs(subs, props, state) {
    const { deals } = props.navigation.state.params.state.store
    const { unsubscribe, promise } = deals.subscribeSubsWithPromise(subs)
    promise.then(() => {
      this.setState({fetching: false})
    })
    return unsubscribe
  }

  markViewed(match) {
    this.props.stores.matches.markViewed(match[0])
  }

  render() {

    const { navigate } = this.props.navigation
    const { params } = this.props.navigation.state
    const { store } = params.state
    const { deals } = store
    const postList = deals.getData('deals')
    const list = postList ? postList.entries().map((val)=>{
      return val[1]
    }) : null
    console.log(list)
    const { fetching } = this.state


    return (
      <Container>

        <Header>
          <Left>
            <Button transparent>
              <Icon name='menu' onPress={() => navigate('DrawerOpen')}/>
            </Button>
          </Left>
          <Body>
              <Title>Top Deals</Title>
          </Body>
          <Right />
        </Header>
        <Content>
        { fetching ? <Spinner/> :
          <List dataArray={list}
            renderRow={(data) =>
              <ListItem onPress={() => {
                navigate('DealPage', {
                  title: data.title,
                  user: data.user,
                  description: data.description,
                  location: data.location,
                  photo: data.photo,
                  tags: data.tags,
                  currentVote: data.currentVote,
                  state: {...params.state}
                })

              }}>
                <Text>{data.title}</Text>
              </ListItem>
            }>
          </List>
        }
        </Content>

      </Container>
    )

  }



}



export default autoSubscriber(observer(SearchByDeal));
