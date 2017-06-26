import { action } from 'mobx'
import firebase from 'firebase'
import MobxFirebaseStore from 'mobx-firebase-store'

export default class DealStore extends MobxFirebaseStore {
  constructor() {
    super(firebase.database().ref())
    firebase.auth().onAuthStateChanged((user) => {
      this.user = user //collecting user
    })
  }
  
  resolveFirebaseQuery(sub) { //sub represents subscription object.
    return this.user ? this.fb.child(sub.path).orderByChild('currentVote').limitToLast(10) : [] //queries the data we want. this.fb is provided by MobxFirebaseStore
    //order results if user has seen it or not. Also, check if user has loaded before making the query - use this.user ? query : [].
  }

  @action //actions will have an affect on the data itself in the backend. Going to tell database whether user viewed it.
  markViewed(post) {
    let updates = {}
    updates['viewedBy/'+this.user.uid] = true
    this.fb.child('posts').child(post).update(updates)

    // update database using the object we just created. Could pass it an object with multiple properties and update many database fields at one time using the updates function. Updates all fields atomically.
  }

  subs() { // MobxFirebaseStore specific method. Returns array of objects.
    return [{
      subKey: 'deals',
      path: 'posts',
      asList: true,
      user: this.user
    }]
  }
}
