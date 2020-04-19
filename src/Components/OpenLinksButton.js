import React from 'react';
import 'rbx/index.css';
import { Button } from '@material-ui/core';
import LinkIcon from '@material-ui/icons/Link';
import { makeStyles } from '@material-ui/core/styles';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import Checkbox from '@material-ui/core/Checkbox';
import firebase from 'firebase/app';
import 'firebase/database';

const OpenLinksButton = ({ state }) => {

  const openLinks = () => {
    var id;
    for(id of state.selected.selectedItems)
    {
      var itemRef = firebase.database().ref("items/" + id);

      itemRef.child("url").once("value").then(function(snapshot) {
        var url = snapshot.val() || 'no url found';
        if (url != 'no url found')
        {
          window.open(url, "_blank");
          console.log("window opened");
        }
      });    
    }
  }

  return (
  <Button 
              
    onClick={ openLinks }
  >
    Open Links
  </Button>)
};

export default OpenLinksButton;