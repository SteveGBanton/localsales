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
  Text,
  Input,
  Thumbnail,
  InputGroup,
  Spinner,
  Content
} from 'native-base'

import ImagePicker from 'react-native-image-picker'

const options = {
  title: 'Select Image',
  quality: 1.0,
  maxWidth: 500,
  maxHeight: 500,
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
}
class PostDeal extends Component {

  constructor(props) {
    super(props)
    this.state = {
      image: null,
      text: '',
      uploading: false,
      data: null
    }
  }

  componentDidMount() {
    ImagePicker.showImagePicker(options, (res) =>{
      this.setState({image: {uri: res.uri}, data:res})
    })
  }

  updateText(text) {
    this.setState({text})
  }

  post() {
    const { posts } = this.props.navigation.state.params.state.store
    this.setState({uploading: true})
    console.log("Initial")
    console.log(this.state)
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
          {this.state.image ? <Thumbnail style={{alignSelf: 'center'}} size={150} source={this.state.image} /> : null }
          <InputGroup borderType='underline'>
              <Input style={{color: 'black'}}
              placeholderTextColor='black'
              placeholder='Enter Title'
              onChangeText={(text) => this.updateText(text)}
              value={this.state.text}
              />
          </InputGroup>
          <Button rounded block
            onPress={this.post.bind(this)}>
            <Text>Share!</Text>
          </Button>

        </Content>
      </Container>
    )
  }
}

export default PostDeal;
