import React, { useState, useEffect }from 'react';
import 'rbx/index.css';
import { Button } from 'rbx';

const buttonColor = selected => (
  selected ? 'success' : null
);

const Folder = ({ name, state }) => {
	console.log("Folder");

  return (<Button onClick={ () => state.setPath(state.path + "/" + name) } >
       { name }
  </Button>)

};

// const Folder = ({ name }) => {
// 	console.log("Folder");
//   return (<Button  >
//        { name }
//   </Button>)

// };

export default Folder;