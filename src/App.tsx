import React from 'react';
import './App.css';
import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';
import { withAuthenticator } from 'aws-amplify-react';
import Body from "./components/Body";

Amplify.configure(awsconfig);

function App() {
  return (
    <div className="App">
      <Body />
      <footer className="footer">
          <img id="logo" src={require("./assets/nuvalence_logo.png")} alt="nuvalence logo"/>
      </footer>
    </div>
  );
}

export default withAuthenticator(App, true);
