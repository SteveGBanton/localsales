import { action } from 'mobx'
import firebase from 'firebase'
import MobxFirebaseStore from 'mobx-firebase-store'
import uuidv4 from 'uuid/v4'
import RNFetchBlob from 'react-native-fetch-blob'

const Blob = RNFetchBlob.polyfill.Blob // RN has no built in support for blobs, so this will give it to us.
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
window.Blob = Blob

const postBase = 'posts'

export default class PostStore extends MobxFirebaseStore {

  constructor() {
    super(firebase.database().ref())
    firebase.auth().onAuthStateChanged((user) => {
      this.user = user //collecting user
    })
  }

  subs() {
    return  [{
      subKey: postBase,
      asList: true,
      path: postBase
    }]
  }

  //method takes a text and url and creates a post object out of it and send to database.
  @action
  add(data, url) {
    console.log("starting update to DB")
    let post = {
      currentVote: 0,
      upvotes: 0,
      downvotes: 0,
      location: data.location ? data.location : null,
      longitude: data.longitude ? data.longitude : null,
      latitude: data.latitude ? data.latitude : null,
      productName: data.productName ? data.productName : null,
      percentOff: data.percentOff ? data.percentOff : null,
      normalPrice: data.normalPrice ? data.normalPrice : null,
      dollarsOff: data.dollarsOff ? data.dollarsOff : null,
      storeType: data.storeType ? data.storeType : null,
      description: data.description ? data.description : null,
      tags: data.tags ? data.tags : null,
      photoURL: url,
      createdDate: Date.now(),
      user: this.user.uid
    }

    let key = this.fb.child(postBase).push().key //pushed an empty post onto the base node and get back a unique key for it. Doing this so we can have all the keys and make updates to all of them atomically - at the same time.

    //setting up the updates to the database.
    let updates = {}
    updates['/' + postBase + '/' + key] = post
    updates['/' + this.user.uid + '/history/' + key] = true
    this.fb.update(updates) //actually makes the updates.
    console.log("possibly updated to DB")
  }

  @action
  postImage(img, cb) {
    const filePath = img.uri.substring(7)
    let uri = RNFetchBlob.wrap(filePath)
    console.log(img)
    Blob.build(uri).then((blob) => {
        console.log('blob built. now add to storage.')
        firebase.storage().ref().child(this.user.uid)
          .child(uuidv4())
          .put(blob)
            .then((snap) => {
              console.log('now added to storage.')
              cb(snap)
              blob.close()
            })
      })
  }

  getImage(location) {
    return this.storage.child(location).getDownloadURL()
  }

}
