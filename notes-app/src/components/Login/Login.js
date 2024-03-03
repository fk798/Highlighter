import React, { useState } from "react";
import axios from "axios";
import { Form, Button, Alert, Container } from "react-bootstrap";

const Login = ({setIsLoggedIn}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsername = (event) => {
    setUsername(event.target.value)
  }

  const handlePassword = (event) => {
    setPassword(event.target.value)
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    var loginInfo = {
        "username": username,
        "password": password
    }
    console.log(loginInfo)
    axios.post("/login", loginInfo)
    .then(response => setIsLoggedIn(response.data.result));
  };

  return (
    <Container>
        <Form>
        <Form.Group className="mb-3" controlId="formBasicUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control type="username" placeholder="Enter username" onChange={handleUsername}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" onChange={handlePassword}/>
        </Form.Group>
        <Button variant="primary" type="submit" onClick = {handleSubmit}>
            Login
        </Button>
        </Form>
    </Container>
  );
};

export default Login;
