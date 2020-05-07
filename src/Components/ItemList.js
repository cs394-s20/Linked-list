import React, { useState, useEffect }from 'react';
import 'rbx/index.css';
import  Folder from './Folder';
import  Link from './Link';
import firebase from 'firebase/app';
import { Button, Grid, Box } from '@material-ui/core';


const chooseItem = (state,item) => {

  if(item.type === "Folder"){
    return (<Folder name= {item.name} />)
  }else{
    return (<Link name= {item.name} url={item.url}/>)
  }
}


const ItemList = ({ state,itemState, userState, selectedState }) => {
    const [selected, setSelected] = useState([]);

    var items = [];
    var pathItems = [];

    if(itemState.data){

    items = Object.values(itemState.data);
      
    pathItems = items.filter(item => item.path === state.path);

    }

    useEffect(() => {
      pathItems = items.filter(item => item.path === state.path);

   }, [state.path])
    
   
    return (
      <Grid container justify="center" spacing={4}>
        { 
          pathItems.map(item =>
            (item.type === "folder") ? 
              (
                <Grid item>
                  <Folder item= {item} state={state} selectedState = {selectedState} userState = {    userState } itemList = { items }/>
                </Grid>
              ) :  
              (
                <Grid item>
                  <Link item={item} state= { selectedState } userState = { userState }/>
                </Grid> ))
          
        }
      </Grid>
    );
};

export default ItemList;