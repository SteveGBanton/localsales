import { action } from 'mobx'
import firebase from 'firebase'
import MobxFirebaseStore from 'mobx-firebase-store'

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
  add(text, url) {
    console.log("starting update to DB")
    let post = {
      text: text,
      created: Date.now(),
      user: this.user.uid,
      url: url
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
    console.log('starting post')
    const filePath = img.uri.substring(7)
    let uri = RNFetchBlob.wrap(filePath)
    console.log(img)
    console.log(filePath)
    console.log('now build blob')

    Blob.build(uri).then((blob) => {
        console.log('blob built. now add to storage.')

        firebase.storage().ref().child(this.user.uid)
          .child(img.fileName)
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
