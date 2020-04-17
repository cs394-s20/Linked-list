import React, {useState, useEffect} from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { Title, Message} from 'rbx';
import logo from '../logo.png';
import { Box, Button } from '@material-ui/core';

const uiConfig = {
    signInFlow: 'popup',
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      signInSuccessWithAuthResult: () => false
    }
  };
  
  const Welcome = ({ user }) => {
      console.log("in welcome")
    return(
    <Message color="grey">
      <Message.Header>
        Welcome, {user.displayName}
        <Button primary onClick={() => firebase.auth().signOut()}>
          Log out
        </Button>
      </Message.Header>
    </Message>
  );}
  
  const SignIn = () => {
    console.log("at sign in page")
    return (
    <Box textAlign="center" justifyContent="center" height="100px">
    <img src={logo} alt="Logo"/>
    <StyledFirebaseAuth
      uiConfig={uiConfig}
      firebaseAuth={firebase.auth()}
    />
    </Box>
    );}

  const Authentication = ({state}) => {

    console.log(state.user)
    return (
    <React.Fragment>
      { state.user ? <Welcome user={ state.user } /> : <SignIn /> }
    </React.Fragment>
  );
}

  export default Authentication;