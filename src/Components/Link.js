import React from 'react';
import 'rbx/index.css';
import { Button } from '@material-ui/core';
import LinkIcon from '@material-ui/icons/Link';
import { makeStyles } from '@material-ui/core/styles';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

const Link = ({ name, url }) => {
  const classes = useStyles();

  return (<Button 
              variant="contained"
              color="secondary"
              className={classes.button}
              startIcon={<OpenInNewIcon />}
              onClick={ () => window.open(url, "_blank") }
  >
    { name }
  </Button>)
};

export default Link;