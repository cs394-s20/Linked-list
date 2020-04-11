import React from 'react';
import 'rbx/index.css';
import { Button } from 'rbx';

const Link = ({ name, url }) => {
	console.log("Link")
  return (<Button color={ "light" }
    onClick={ () => window.open(url, "_blank") }
  >
    { name }
  </Button>)
};

export default Link;