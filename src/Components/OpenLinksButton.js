import React from 'react';
import 'rbx/index.css';
import { Button } from '@material-ui/core';
import LinkIcon from '@material-ui/icons/Link';
import { makeStyles } from '@material-ui/core/styles';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import Checkbox from '@material-ui/core/Checkbox';
import firebase from 'firebase/app';
import 'firebase/database';

const OpenLinksButton = ({ state, itemState }) => {
  const openLinks = (itemRef) => {
    itemRef.child("url").once("value").then(function(snapshot) {
      var url = snapshot.val() || 'no url found';
      if (url != 'no url found')
      {
        window.open(url, "_blank");
        console.log("window opened");
      }
    }); 
  }

  const handleLinks = () => {
    var id;
    for(id of state.selected.selectedItems)
    {
      var itemRef = firebase.database().ref("items/" + id);
      var itemType = itemRef.child("type").once("value").then(function(snapshot) {
         return snapshot.val() || 'no type found';
      });

      if (itemType == "link") {
        openLinks(itemRef);
      }
      else {
        //get everything that starts with folder pathname
        var folderPath = itemRef.child("path").once("value").then(function(snapshot) {
           return snapshot.val() || 'no path found';
        });
        var folderName = itemRef.child("name").once("value").then(function(snapshot) {
           return snapshot.val() || 'no name found';
        });

        var items = Object.values(itemState.data.items);
        var currItems = items.filter(item => item.path.includes(folderPath + "/" + folderName));
        for(var item of currItems) {
          if (item.type == "link") {
            openLinks(itemRef);
          }
        }
      }   
    }
  }

  return (
  <Button 
              
    onClick={ handleLinks }
  >
    Open Links
  </Button>)
};

export default OpenLinksButton;