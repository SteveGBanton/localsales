import { observable, action } from 'mobx'
import firebase from 'firebase'

export default class AuthStore {
  @observable authUser = null

  //the @observable decorator tells mobx that whenver this var changes, React must update any components that use it.
  constructor() {
    firebase.auth().onAuthStateChanged((user) => {
      this.authUser = user; //when user's state changes in firebase, its going to send us a new user reference.
    })
  }

  @action //tells mobx that this method will affect our backend. In this case, it will change authUser variable through the authstatechanged method.
  signIn({email, password}) {
    if(this.authUser) {
      return Promise.resolve(this.authUser)
      //if we are logged in, no reason to log in again.
    }
    return firebase.auth().signInWithEmailAndPassword(email, password)

     // this method will return another promise.
  }

  signOut() {
    return firebase.auth().signOut().then(function() {
    console.log('Sign-out successful.')
    }).catch(function(error) {
    console.log('error on sign out')
    });
  }

  isSignedIn() {
    if(this.authUser) {
      return true
    } else {
      return false
    }

  }
}
