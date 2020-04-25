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
      // for (item of pathItems) {
      //   var found = false
      //   for (selectedItemId in selectedState.selected.selectedItems) {
      //       if (item.id == selectedItemId) {
      //           found = true
      //       }
      //   if (!found) {
      //     console.log("hi")
      //   }
      //   }
      // }
      //selectedState.setSelected({ selectedItems: []});
   }, [state.path])
    
   
    return (
      <Grid container justify="center" spacing="2">
        { 
          pathItems.map(item =>
            (item.type === "folder") ? 
              (<Folder item= {item} state={state} selectedState = {selectedState} />) :  
              (<Link item={item} state= { selectedState } userState = { userState }/> ))
          
        }
      </Grid>
    );
};

export default ItemList;