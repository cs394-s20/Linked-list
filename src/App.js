
import React, {useState, useEffect} from 'react';
import './App.css';
import firebase from 'firebase/app';
import 'firebase/database';
import  ItemList  from './Components/ItemList'
//import data from "./data.json"
import { Container, Section, Title } from 'rbx';
import AddLink from './Components/AddLink';

const firebaseConfig = {
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
  
function App() {

  const [path, setPath] = useState('/home');

  const [data, setData] = useState({});

  useEffect(() => {
    console.log("running useEffect");
    const handleData = snap => {
      if (snap.val()) setData(snap.val());
    }
    db.on('value', handleData, error => alert(error));
    return () => { db.off('value', handleData); };
  }, []);

  console.log(data.items);


  return (
    <Container>
      <Section>
        <AddLink/>
      </Section>
      <Section>
        <Title>Current Directory: { path }</Title>
        <ItemList state = { {path, setPath} } itemState = { { data, setData } }/>
      </Section>
    </Container>
  );
}

export default App;
