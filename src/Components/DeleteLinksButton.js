import React from 'react';
import 'rbx/index.css';
import { Button, Fab } from '@material-ui/core';
import LinkIcon from '@material-ui/icons/Link';
import { makeStyles } from '@material-ui/core/styles';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import Checkbox from '@material-ui/core/Checkbox';
import firebase from 'firebase/app';
import 'firebase/database';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme) => ({
  button: {
    borderColor: "#F50257",
    borderWidth: "4px"
  },
}));

const DeleteLinksButton = ({ state, itemState, userState }) => {
  const classes = useStyles();

  const deleteLinks = () => {
    var id;
    for(id of state.selected.selectedItems) {
      console.log(id);
      var itemRef = firebase.database().ref("users/" + userState.user.uid + "/" + id);
      itemRef.child("type").once("value").then(function(snapshot) {
        var itemType = snapshot.val() || 'no type found';

        if (itemType == "link") {
          itemRef.remove();
          
        } else {
          //get everything that starts with folder pathname
          itemRef.child("path").once("value").then(function(snapshot) {
            var folderPath = snapshot.val() || 'no path found';

            itemRef.child("name").once("value").then(function(snapshot) {
              var folderName = snapshot.val() || 'no name found';
              var items = Object.values(itemState.data);
              var currItems = items.filter(item => item.path.includes(folderPath + "/" + folderName));
              //NOTE! when we delete, we also need to include the current folder
              for(var item of currItems) {
                var currItemRef = firebase.database().ref("users/" + userState.user.uid + "/" + id);
                currItemRef.remove();
              }
              var currFolder = items.filter(item => item.name == folderName);
              for (var fold of currFolder) {
                var currFolderRef = firebase.database().ref("users/" + userState.user.uid + "/" + id);
                currFolderRef.remove();
              }
              
            });
          });
        } 
      })
    }
  }

  return (
  <Button className={classes.button} id="delete-link" onClick={ deleteLinks }>
    <DeleteIcon/>
  </Button>)
};

export default DeleteLinksButton;