import React from 'react';
import { Button } from '@material-ui/core';
import LinkIcon from '@material-ui/icons/Link';
import { makeStyles } from '@material-ui/core/styles';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import Checkbox from '@material-ui/core/Checkbox';
import firebase from 'firebase/app';
import 'firebase/database';

const useStyles = makeStyles((theme) => ({
  openbutton: {
    border: "solid",
    borderWidth: "1px",
  },
}));

const empty = (selected_len) => {
  if (selected_len > 0){
    return (
      false
    )
  }
  else{
    return (
      true
    )
  }
}

const OpenLinksButton = ({ state, itemState, userState }) => {
  const classes = useStyles();
  const openLinks = (itemRef) => {
    itemRef.child("url").once("value").then(function(snapshot) {
      var url = snapshot.val() || 'no url found';
      if (url != 'no url found')
      {
        window.open(url, "_blank");
        console.log("window opened");
        console.log(url);
      }
    }); 
  }

  const handleLinks = () => {
    var id;
    for(id of state.selected.selectedItems) {
      var itemRef = firebase.database().ref("users/" + userState.user.uid + "/" + id);
 
      itemRef.child("type").on("value", function(snapshot) {
        console.log(id);
        var itemType = snapshot.val() || 'no type found';
        //console.log(itemType);
        if (itemType == "link") {
          
          //console.log(id);
          itemRef = firebase.database().ref("users/" + userState.user.uid + "/" + id);
          console.log(itemRef);
          openLinks(itemRef);
          state.setSelected({ selectedItems: []});
          
        } else {
          //get everything that starts with folder pathname
          itemRef.child("path").on("value", function(snapshot) {
            var folderPath = snapshot.val() || 'no path found';

            itemRef.child("name").on("value", function(snapshot) {
              var folderName = snapshot.val() || 'no name found';

              var items = Object.values(itemState.data);
              var currItems = items.filter(item => item.path.includes(folderPath + "/" + folderName));
              //NOTE! when we delete, we also need to include the current folder
              for(var item of currItems) {
                if (item.type == "link") {
                  console.log("opening a link inside of a folder");
                  var currItemRef = firebase.database().ref("users/" + userState.user.uid + "/" + item.id);
                  openLinks(currItemRef);
                }
              }
            });
          });
          state.setSelected({ selectedItems: []});
        } 
      });  
    }
  }

  return (
  <Button 
    disabled = {empty(state.selected.selectedItems.length)}
    className={classes.openbutton}      
    onClick={ handleLinks }
  >
    Open Links
  </Button>)
};

export default OpenLinksButton;