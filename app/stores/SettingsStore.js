import firebase from 'firebase'
import MobxFirebaseStore from 'mobx-firebase-store'
import { observable, action } from 'mobx'

const config = {
    apiKey: "AIzaSyDGadetZN3mIyWtenjDA3CQs3qIWeSnmuQ",
    authDomain: "local-sales-bed21.firebaseapp.com",
    databaseURL: "https://local-sales-bed21.firebaseio.com",
    projectId: "local-sales-bed21",
    storageBucket: "local-sales-bed21.appspot.com",
    messagingSenderId: "357532200400"
  }

//initialize firebase sdk

    firebase.initializeApp(config)

export default class SettingsStore extends MobxFirebaseStore {

  constructor() {

    super(firebase.database().ref())

    this.splashTime = 500
    this.splashImg = require('../../img/splash.jpg')
    this.loginBG = require('../../img/login.jpg')

  }

  get SplashTime() {
    return this.splashTime
  }

  get SplashImg() {
    return this.splashImg
  }

  get LoginBG() {
    return this.loginBG
  }

}
