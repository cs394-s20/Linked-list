import React from 'react';
import 'rbx/index.css';
import { Button } from '@material-ui/core';
import LinkIcon from '@material-ui/icons/Link';
import { makeStyles } from '@material-ui/core/styles';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import Checkbox from '@material-ui/core/Checkbox';
import firebase from 'firebase/app';
import 'firebase/database';

const DeleteLinksButton = ({ state }) => {

  const deleteLinks = () => {
    var id;
    for(id of state.selected.selectedItems)
    {
      console.log(id);
      var itemRef = firebase.database().ref("items/" + id);
      console.log(itemRef)
      itemRef.remove();    
    }
  }

  return (
  <Button 
              
    onClick={ deleteLinks }
  >
    Delete Links
  </Button>)
};

export default DeleteLinksButton;