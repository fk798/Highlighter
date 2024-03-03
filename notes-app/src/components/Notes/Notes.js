import React, { useRef, useState } from 'react';
import TextBox from '../TextBox/TextBox';
import axios from "axios";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function Notes({username}) {
  
    const [title, setTitle] = useState("")

    const handleTitle = (event) => {
        setTitle(event.target.value)
      }

  const handleSave = (event) => {
    event.preventDefault();
    
  }

  return (
    <Container>
        <Row>
            <Col><h1>Welcome {username}!</h1></Col>
        </Row>
        <h3>Begin typing your notes here.</h3>
        <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Title</Form.Label>
                <Form.Control type="title" placeholder="Enter title of your notes here!" onChange={handleTitle}/>
            </Form.Group>
        </Form>
        <Button onClick = {handleSave}>Save</Button>
        <TextBox />
    </Container>
  );
}