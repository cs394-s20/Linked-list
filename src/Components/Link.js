import React from 'react';
import 'rbx/index.css';
import { Button } from '@material-ui/core';
import LinkIcon from '@material-ui/icons/Link';
import { makeStyles } from '@material-ui/core/styles';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import Checkbox from '@material-ui/core/Checkbox';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

const Link = ({ name, url }) => {
  const classes = useStyles();

  return (
  <Button 
              variant="contained"
              color="secondary"
              className={classes.button}
              startIcon={
                <Button onClick={ () => window.open(url, "_blank") }> 
                  <OpenInNewIcon /> 
                </Button>}
              //onClick={ () => window.open(url, "_blank") }
  >
    <Checkbox color="default">
    </Checkbox>
    { name }
  </Button>)
};

export default Link;