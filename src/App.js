
import React, {useState, useEffect} from 'react';
import './App.css';
import firebase from 'firebase/app';
import 'firebase/database';
import  ItemList  from './Components/ItemList'
//import data from "./data.json"
import { Section, Title } from 'rbx';
import AddLink from './Components/AddLink';
import BackButton from './Components/BackButton';
import AddFolder from './Components/AddFolder';
import OpenLinksButton from './Components/OpenLinksButton';
import 'typeface-roboto';
import Fab from '@material-ui/core/Fab';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography, Container } from '@material-ui/core';
import { grey, blue } from '@material-ui/core/colors';
import logo from './logo.png';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { Button } from '@material-ui/core';



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

  const [data, setData] = useState({items: {}});

  const [selected, setSelected] = useState({ selectedItems: []});

  useEffect(() => {
    //console.log("running useEffect");
    const handleData = snap => {
      if (snap.val()) setData(snap.val());
    }
    db.on('value', handleData, error => alert(error));
    return () => { db.off('value', handleData); };
  }, []);

  return (
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
          <Box marginLeft={12} 
          borderRadius={10} height="600%" padding={1}
          bgcolor={ box_color}
          >
            <ItemList state = { {path, setPath} } itemState = { { data, setData } } selectedState={ { selected, setSelected } }/>
            <Box>
              <AddLink state = { {path, setPath} } />
              <AddFolder state = { {path, setPath} } />
            </Box>
          </Box>
        </Box>
      </Box>
      <Box>
        <OpenLinksButton state={ {selected, setSelected} }/>
      </Box>
    </Box>
  );
}

export default App;