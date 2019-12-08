import firebase from 'firebase'

const app = firebase.initializeApp({
  apiKey: 'AIzaSyBJMQJzfuoWSgVx86NO8DGqsM6kIz8Exx0',
  authDomain: 'elegant-zodiac-260323.firebaseapp.com',
  databaseURL: 'https://elegant-zodiac-260323.firebaseio.com',
  projectId: 'elegant-zodiac-260323',
  storageBucket: 'elegant-zodiac-260323.appspot.com',
  messagingSenderId: '277705425034',
  appId: '1:277705425034:web:0167766faa32a830faed73'
})

const db = app.database()
export default db
