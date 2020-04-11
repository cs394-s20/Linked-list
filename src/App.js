import React from 'react';
import './App.css';
import firebase from 'firebase/app';
import 'firebase/database';
import AddLink from './AddLink';

// Karen Bao
var firebaseConfig = {
  apiKey: "AIzaSyCHyktJVGIzKbUvJTPGYfO2LOfuTtTYzDM",
  authDomain: "linx-22a8d.firebaseapp.com",
  databaseURL: "https://linx-22a8d.firebaseio.com",
  projectId: "linx-22a8d",
  storageBucket: "linx-22a8d.appspot.com",
  messagingSenderId: "420143947697",
  appId: "1:420143947697:web:0cd132179c292b91006790",
  measurementId: "G-S641Y5RGW1"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.database().ref();
//var FbApp = firebase.initializeApp(firebaseConfig);
//module.exports.FBApp = FbApp.database();

//const db = FbApp.database().ref();

function App() {

  return (
    <div>
      <AddLink/>
    </div>
   
  );
}

export default App;
