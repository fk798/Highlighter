import React, { useState } from 'react';
import Notes from "./components/Notes/Notes";
import TextBox from './components/TextBox/TextBox';
import Login from './components/Login/Login';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("fk798");
  return (
    <React.Fragment>
      {isLoggedIn ? (<Notes username = {username} />) : (<Login setIsLoggedIn = {setIsLoggedIn}/>)}
    {/*<div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
  </div>*/}
  </React.Fragment>
  );
}

export default App;
