import React from 'react';
import { useReducer, useContext } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.css';
import InputGroup from 'react-bootstrap/InputGroup';
import Image from 'react-bootstrap/Image';
import { NewPostContext, NewPostDispatchContext, NewPostProvider } from './NewPostContext';
import axios from 'axios';

export function NewPostWrapper() {
  return (
    <NewPostProvider>
      <NewPost />
    </NewPostProvider>
  );
}

function NewPost() {
  const PostData = useContext(NewPostContext);
  const dispatch = useContext(NewPostDispatchContext);
  console.log(PostData);

  async function post(values) {
    console.log('post clicked');
    console.log(values);
    try {
      const response = await axios.post(
        'https://ominous-orbit-rp4wvjrvw4whxpv9-3000.app.github.dev/blogs',
        [{ title: "inputtitle" }, { poster: "image path" }, { description: "userinputdescription" }],
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTZjMGRiZmJiOWE0Mzc5MmVkMWJmZjAiLCJlbWFpbCI6InB2bkBnbWFpbC5jb20iLCJpYXQiOjE3MDIwNDc4MTIsImV4cCI6MTcwMjA1MTQxMn0.nYVoybaWD-zvYKa2I9TRuPDhfVnDR0-pWj3g9QSzpd0',
          },
        }
      );
      console.log('Post Request Successful:', response.data);
    } catch (error) {
      console.error('Error making POST request:', error);
    }
  
    // Dispatch your action using the Formik values
    // [{title: "inputtitle"}, {poster: "image path"}, {description: "userinputdescription"}] -> dynamic
  }

  const initialValues = {
    title: '',
    poster: null,
    description: '',
  };

  return (
    <div>
      <Container fluid="xxl">
        <Row>
          <Col></Col>
          <Col className="text-title">Create A Blog</Col>
          <Col></Col>
        </Row>
      </Container>



      <Container>
        <Formik
          initialValues={initialValues}
          onSubmit={(values) => post(values)}
        >
          {({ handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <Row>
              <InputGroup className="mb-3">
                    <Field
                      type="text"
                      name="heading"
                      placeholder="Enter the Heading here"
                      aria-label="Enter the Heading here"
                      aria-describedby="basic-addon2"
                      as={Form.Control}
                    />
                  </InputGroup>
                <Col>
                  <InputGroup className="mb-3">
                    <Field
                      type="text"
                      name="title"
                      placeholder="Enter the Title here"
                      aria-label="Enter the Title here"
                      aria-describedby="basic-addon2"
                      as={Form.Control}
                    />
                  </InputGroup>
                </Col>

                <Col>
                  <label>
                    Poster:
                    <Field type="file" name="poster" />
                  </label>
                </Col>

                <Col>
                  <InputGroup>
                    <Field
                      as="textarea"
                      name="description"
                      placeholder="Description"
                      aria-label="Description"
                      aria-describedby="basic-addon2"
                      style={{ height: '60vh' }}
                      component={Form.Control}
                    />
                  </InputGroup>
                </Col>
              </Row>

              <Row style={{ textAlign: 'center' }}>
                <Button type="submit" variant="outline-secondary" style={{ width: '100px' }}>
                  Post
                </Button>
                <Button type="reset" variant="outline-secondary" style={{ width: '100px' }}>
                  Cancel
                </Button>
              </Row>
            </Form>
          )}
        </Formik>
      </Container>
    </div>
  );
}


