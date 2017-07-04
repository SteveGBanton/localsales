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
  Item,
  List,
  ListItem
} from 'native-base'
import {
  Text,
  View
} from 'react-native'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
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
      possibleLocations: null,
      location: '',
      longitude: null,
      latitude: null,
      productName: '',
      percentOff: null,
      dollarsOff: null,
      normalPrice: null,
      normalPriceCents: null,
      storeType: '',
      description: '',
      category: '',
      possibleLocations: []
    }
  }

  getGeoLocation(storeType) {

    navigator.geolocation.getCurrentPosition(
          (position) => {
            //set state
            this.setState({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              error: null,
            });
            this.getPossibleLocations()
          },
          (error) => this.setState({ error: error.message }),
          { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
        );
  }

  getPossibleLocations(storeType='establishment') {
    return fetch(`https://maps.googleapis.com/maps/api/place/textsearch/json?location=${this.state.latitude},${this.state.longitude}&radius=110&type=establishment&key=AIzaSyDdXpGbfVridvKZd0iscW6h-2ioVNmZpFg`)
      .then((response) => response.json())
      .finally((responseJson) => {
        let locationArray = []
        for (let i = 0; i < responseJson.results.length ; i++) {
          locationArray.push({
            name: responseJson.results[i]['name'] ? responseJson.results[i]['name'] : null,
            latitude: responseJson.results[i]['geometry']['location']['lat'],
            longitude: responseJson.results[i]['geometry']['location']['lng']
          })

        }
        this.setState({
          possibleLocations: locationArray,
        })

      })
      .catch((error) => {
      console.error(error);
      });

  }



  takePhoto() {

    const options = {
      title: 'Select Image',
      quality: 0.8,
      maxWidth: 900,
      maxHeight: 900,
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    }

    ImagePicker.showImagePicker(options, (res) =>{
      this.setState({image: {uri: res.uri}, data:res})
    })

  }

  onChangeProductName(productName) {
    this.setState({productName})
  }

  onChangePercentOff(percentOff) {
    this.setState({percentOff})
  }

  onChangeCategories(categories) {
    this.setState({categories})
  }

  onChangeDollarsOff(dollarsOff) {
    this.setState({dollarsOff})
  }

  onChangeDescription(description) {
    this.setState({description})
  }

  onChangeStoreType(storeType) {
    this.setState({storeType})
  }

  onChangeNormalPrice(normalPriceInput) {
    let normalPrice = this.numericOnly(normalPriceInput)
    this.setState({normalPrice})
  }

  onChangeNormalPriceCents(normalPriceCentsInput) {
    let normalPriceCents = this.numericOnly(normalPriceCentsInput)
    this.setState({normalPriceCents})
  }

  onChangeStoreType(selectedStoreType) {
    this.setState({possibleLocations: null})
    this.setState({selectedStoreType})
    this.getPossibleLocations(selectedStoreType)

  }

  onChangeDealType(percentOrDollarsOff) {
    this.setState({percentOrDollarsOff})
  }

  numericOnly(changedInput) {
    return numberOnly = changedInput.replace(/[a-zA-Z,_\s-]/g, '')
  }

  setLocation(data) {
    this.setState({
      location: data.name,
    })
  }

  userChoosesStore(data) {

    console.log(data)

    this.setState({
      latitude: data.latitude,
      longitude: data.longitude
    })
  }

  post() {

    const dealData = {
      location: this.state.location,
      longitude: this.state.longitude,
      latitude: this.state.latitude,
      productName: this.state.productName,
      percentOff: this.state.percentOff,
      dollarsOff: this.state.dollarsOff,
      normalPrice: this.state.normalPrice,
      storeType: this.state.storeType,
      description: this.state.description,
      category: this.state.category
    }

    console.log('clicked post, dealData object:')
    console.log(dealData)

    const { posts } = this.props.navigation.state.params.state.store
    this.setState({uploading: true})
    posts.postImage(this.state.data, (snap) => {
      console.log("posted to storage")
      posts.add(dealData, snap.downloadURL)
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
            onChangeText={(data) => this.onChangeProductName(data)}
            value={this.state.productName}
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
            maxLength={10}
            placeholderTextColor='grey'
            placeholder='Percent Off'
            onChangeText={(data) => this.onChangePercentOff(data)}
            value={this.state.percentOff}
            />

          </InputGroup> : this.state.percentOrDollarsOff === 'dollars' ? <InputGroup borderType='underline'>
          <Input style={{color: 'black'}}
          maxLength={10}
          placeholderTextColor='grey'
          placeholder='Dollars Off'
          onChangeText={(data) => this.onChangeDollarsOff(data)}
          value={this.state.dollarsOff}
          />
          </InputGroup> : null}

          <InputGroup borderType='underline'>
          <Text>Everyday Price: $</Text>
          <Input style={{color: 'black'}}
          keyboardType='numeric'
          maxLength={5}
          placeholderTextColor='grey'
          placeholder='eg. 50'
          onChangeText={(data) => this.onChangeNormalPrice(data)}
          value={this.state.normalPrice}
          />
          <Text>.</Text>
          <Input style={{color: 'black'}}
          keyboardType='numeric'
          maxLength={2}
          placeholderTextColor='grey'
          placeholder='00'
          onChangeText={(data) => this.onChangeNormalPriceCents(data)}
          value={this.state.normalPriceCents}
          />
          </InputGroup>

          <InputGroup borderType='underline'>
          <Input style={{color: 'black'}}
          placeholderTextColor='grey'
          placeholder='Description'
          onChangeText={(data) => this.onChangeDescription(data)}
          value={this.state.description}
          />
          </InputGroup>

          <InputGroup borderType='underline'>
          <Input style={{color: 'black'}}
          placeholderTextColor='grey'
          placeholder='Categories'
          onChangeText={(data) => this.onChangeCategories(data)}
          value={this.state.tags}
          />
          </InputGroup>

            <Button block style={{width: '80%'}} onPress={() => this.getGeoLocation()}>
              <Text style={{color: 'white', fontSize: 21}}><Icon name='compass'></Icon> {this.state.latitude ? 'Get Location Again' : 'Get Location'}</Text>
            </Button>

            {this.state.latitude ? <View style={{
                                        position: 'relative',
                                        height: 300,
                                        justifyContent: 'flex-end',
                                        alignItems: 'center',
                                      }}>
                                  <MapView
                                      provider={PROVIDER_GOOGLE}
                                      style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                        bottom: 0,
                                      }}
                                      initialRegion={{
                                        latitude: this.state.latitude,
                                        longitude: this.state.longitude,
                                        latitudeDelta: 0.003,
                                        longitudeDelta: 0.003,
                                      }}
                                      >
                                        <MapView.Marker
                                          coordinate={{
                                            latitude: this.state.latitude,
                                            longitude: this.state.longitude
                                          }}
                                          title={'Location'}
                                        />
                                      </MapView>
                                      </View> : null }



          { this.state.possibleLocations ? <List dataArray={this.state.possibleLocations}
            renderRow={(data) =>
              <ListItem onPress={() => {
                this.userChoosesStore(data)
              }}>
                <Text>{data.name}</Text>
              </ListItem>
            }>
          </List> : null
          }

          {this.state.uploading === true ? <Spinner /> : this.state.image && this.state.image.uri ? <Thumbnail style={{alignSelf: 'center'}} size={150} source={this.state.image} /> : null }

          <Button onPress={() => this.takePhoto()}>
            <Text><Icon name='camera'></Icon>Take Photo!</Text>
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

// Picker Removed.
// { this.state.latitude && this.state.longitude ? <Picker
// supportedOrientations={['portrait','landscape']}
// iosHeader="Select one"
// headerBackButtonText="Go Back"
// mode="dropdown"
// selectedValue={this.state.selectedStoreType}
// onValueChange={this.onChangeStoreType.bind(this)}>
// <Item label="Click To Select Store Type" value="click" />
// <Item label="Restaurant" value="restaurant" />
// <Item label="Grocery Store" value="store" />
// <Item label="Department Store" value="store" />
// <Item label="Furniture" value="furniture_store" />
// <Item label="Other" value="establishment" />
// </Picker> : null }
