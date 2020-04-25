
import React, {useState, useEffect} from 'react';
import './App.css';
import firebase from 'firebase/app';
import 'firebase/database';
import  ItemList  from './Components/ItemList'
//import data from "./data.json"
import AddLink from './Components/AddLink';
import BackButton from './Components/BackButton';
import AddFolder from './Components/AddFolder';
import Authentication from './Components/Authentication';
import OpenLinksButton from './Components/OpenLinksButton';
import DeleteLinksButton from './Components/DeleteLinksButton';
import 'typeface-roboto';
import { makeStyles } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';
import logo from './logo.png';
import { Button, Grid, Box } from '@material-ui/core';
import 'firebase/auth';
import { DndProvider } from 'react-dnd'
import Backend from 'react-dnd-html5-backend'

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

const useStyles = makeStyles((theme) => ({
  corner_box: {
    margin: theme.spacing.unit, // You might not need this now
    position: "fixed",
    bottom: theme.spacing(10),
    right: theme.spacing(5)
  },
}));

const box_color = grey[400];

function App() {
  const classes = useStyles();

  const [path, setPath] = useState('/home');

  const [data, setData] = useState({});

  const [user, setUser] = useState(null);

  const [selected, setSelected] = useState({ selectedItems: []});

  useEffect(() => {
    //console.log("running useEffect");
    const handleData = snap => {

      if(user != null){
        if (snap.val()){ 
          const uid = user.uid;
          setData(snap.val().users[uid]);
      }
    }}
    db.on('value', handleData, error => alert(error));
    return () => { db.off('value', handleData); };
  }, [user]);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(setUser);

  }, []);

  if (user == null) {
    return (
      <Authentication state={ {user, setUser} } />
    )}
  
  else {

  return ( 
    <div>
      <Authentication state={ {user, setUser} } />
    <Box margin={15} justifyContent="center">
      <Box textAlign="center" justifyContent="center" height="100px">
        <img src={logo} alt="Logo"/>
      </Box>
      <Box>
        <Box component="div" display="inline">
            <BackButton display="inline" state={ {path, setPath} }/>
        </Box>
        <Box display="inline">
          <Box fontSize={24} fontWeight={1000} display="inline" marginLeft={5}>
            Current directory: 
            <Box fontSize={24} display="inline" fontColor="grey"> { path } </Box>
          </Box>
          <Grid container justify="center" spacing='2'>
            <Grid item key="add-link-button">
              <AddLink state = { {path, setPath} } userState= {{user, setUser}} />
            </Grid>
            <Grid item key="add-folder-button">
              <AddFolder state = { {path, setPath}} userState = {{user, setUser}} />
            </Grid>
            <Grid item key="delete-link-button">
              <DeleteLinksButton state={ {selected, setSelected} } itemState = { { data, setData } } userState = { {user, setUser} }/>
            </Grid>
          </Grid>
          <Box 
          marginLeft={12} 
          borderRadius={10}
          padding={1}
          bgcolor={ box_color}
          >
          <DndProvider backend={Backend}>
            <ItemList state = { {path, setPath} } itemState = { { data, setData } } userState = { {user, setUser} } selectedState={ { selected, setSelected } }/>
          </DndProvider>
          </Box>
        </Box>
      </Box>
      <Box>
        <OpenLinksButton state={ {selected, setSelected} } itemState = { { data, setData } } userState = { {user, setUser} }/>
      </Box>
    </Box>
    </div>
  );}
}

export default App;