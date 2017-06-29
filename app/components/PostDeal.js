import React, { Component } from 'react'
import {
  Container,
  Header,
  Left,
  Body,
  Icon,
  Right,
  Button,
  Title,
  Input,
  Thumbnail,
  InputGroup,
  Spinner,
  Content,
  Picker,
  Item
} from 'native-base'
import {
  Text
} from 'react-native'

import ImagePicker from 'react-native-image-picker'

class PostDeal extends Component {

  constructor(props) {
    super(props)
    this.state = {
      image: null,
      text: '',
      percentOrDollarsOff: 'click',
      selectedStoreType: 'click',
      uploading: false,
      data: null,
      dealData: {
        location: '',
        longitude: '',
        latitude: '',
        productName: '',
        percentOff: null,
        dollarsOff: null,
        normalPrice: null,
        storeType: '',
        description: '',
        tags: []
      }
    }
  }

  takePhoto() {

    const options = {
      title: 'Select Image',
      quality: 0.75,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    }

    ImagePicker.launchCamera(options, (res) =>{
      this.setState({image: {uri: res.uri}, data:res})
    })
    console.log(this.state.image)
  }

  updateDealData(toUpdate, data) {
    this.setState({dealData: {toUpdate: data}})
  }

  onChangeStoreType(value) {
    this.setState({selectedStoreType: value})
  }

  onChangeDealType(value) {
    this.setState({percentOrDollarsOff: value})
  }

  post() {
    const { posts } = this.props.navigation.state.params.state.store
    this.setState({uploading: true})
    console.log("clicked post")
    posts.postImage(this.state.data, (snap) => {
      console.log("posted to storage")
      posts.add(this.state.text, snap.downloadURL)
      this.setState({uploading: false})
      this.props.navigation.goBack()
    })
  }

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
              <Title>Post A Deal</Title>
          </Body>
          <Right />
        </Header>
        <Content>

          <InputGroup borderType='underline'>
            <Input style={{color: 'black'}}
            placeholderTextColor='grey'
            placeholder='Product Name'
            onChangeText={(data) => this.updateDealData('productName', data)}
            value={this.state.dealData.productName}
            />
          </InputGroup>

          <Text>Select Deal Type:</Text>
          <Picker
            supportedOrientations={['portrait','landscape']}
            iosHeader="Select one"
            headerBackButtonText="Go Back"
            mode="dropdown"
            selectedValue={this.state.percentOrDollarsOff}
            onValueChange={this.onChangeDealType.bind(this)}>
            <Item label="Click To Select Deal Type" value="click" />
            <Item label="Percent Off" value="percent" />
            <Item label="Dollars Off" value="dollars" />
         </Picker>

          {this.state.percentOrDollarsOff === 'percent' ? <InputGroup borderType='underline'>
            <Input style={{color: 'black'}}
            placeholderTextColor='grey'
            placeholder='Percent Off'
            onChangeText={(data) => this.updateDealData('percentOff', data)}
            value={this.state.dealData.percentOff}
            />
          </InputGroup> : this.state.percentOrDollarsOff === 'dollars' ? <InputGroup borderType='underline'>
          <Input style={{color: 'black'}}
          placeholderTextColor='grey'
          placeholder='Dollars Off'
          onChangeText={(data) => this.updateDealData('dollarsOff', data)}
          value={this.state.dealData.dollarsOff}
          />
          </InputGroup> : null}

          <InputGroup borderType='underline'>
          <Input style={{color: 'black'}}
          placeholderTextColor='grey'
          placeholder='Normal Price'
          onChangeText={(data) => this.updateDealData('normalPrice', data)}
          value={this.state.dealData.normalPrice}
          />
          </InputGroup>

          <InputGroup borderType='underline'>
          <Input style={{color: 'black'}}
          placeholderTextColor='grey'
          placeholder='Description'
          onChangeText={(data) => this.updateDealData('normalPrice', data)}
          value={this.state.dealData.normalPrice}
          />
          </InputGroup>

          <InputGroup borderType='underline'>
          <Input style={{color: 'black'}}
          placeholderTextColor='grey'
          placeholder='Tags'
          onChangeText={(data) => this.updateDealData('normalPrice', data)}
          value={this.state.dealData.normalPrice}
          />
          </InputGroup>

          <Text>Select Your Store Type:</Text>
          <Picker
            supportedOrientations={['portrait','landscape']}
            iosHeader="Select one"
            headerBackButtonText="Go Back"
            mode="dropdown"
            selectedValue={this.state.selectedStoreType}
            onValueChange={this.onChangeStoreType.bind(this)}>
            <Item label="Click To Select Store Type" value="click" />
            <Item label="Restaurant" value="restaurant" />
            <Item label="Grocery Store" value="grocery" />
            <Item label="Department Store" value="department" />
            <Item label="Other" value="other" />
         </Picker>


          {this.state.uploading === true ? <Spinner /> : this.state.image && this.state.image.uri ? <Thumbnail style={{alignSelf: 'center'}} size={150} source={this.state.image} /> : null }

          <Button onPress={() => this.takePhoto()}>
            <Text><Icon name='camera'></Icon>Take Photo Proof!</Text>
          </Button>

          {this.state.image && this.state.image.uri ?
          <Button rounded block
            onPress={this.post.bind(this)}>
            <Text>Share!</Text>
          </Button> : null
          }

        </Content>
      </Container>
    )
  }
}

export default PostDeal;
