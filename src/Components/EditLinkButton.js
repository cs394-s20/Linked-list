import React, { useState, useEffect }from 'react';
import firebase from 'firebase/app';

const EditLinkButton = ({userState, item}) => {

	  const userUID = userState.user.uid;

	  var newItemKey = firebase.database().ref("users").child(userUID).push().key;
	  
	  var item = {
	    "name": document.getElementById('folderTitle').value,
	    "type": "folder",
	    "path": state.path,
	    "id": newItemKey
	  };

	  // Write the new post's data simultaneously in the posts list and the user's post list.
	  firebase.database().ref("users/" + userUID + "/" + newItemKey).set(item);



}






export default EditLinkButton;