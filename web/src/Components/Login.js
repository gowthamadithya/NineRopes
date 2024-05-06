import { Link, useNavigate } from "react-router-dom";
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Container from "react-bootstrap/esm/Container";
import Button from 'react-bootstrap/Button';

function Login() {
  //const navigate = useNavigate();
  return (

    <Container>
      {/* <button onClick= { () => navigate("/create")}>
                Create a blog
            </button> */}
      <Row>
        <h1> KlipBook </h1>
      </Row>
      <Link to='/create'>
        Create
      </Link>
      <Row>

        <Col>
          <>
            <Form.Floating className="mb-3">
              <Form.Control
                id="floatingInputCustom"
                type="email"
                placeholder="name@example.com"
              />
              <label htmlFor="floatingInputCustom">Email address</label>
            </Form.Floating>
            <Form.Floating>
              <Form.Control
                id="floatingPasswordCustom"
                type="password"
                placeholder="Password"
              />
              <label htmlFor="floatingPasswordCustom">Password</label>
            </Form.Floating>
          </>
        </Col>

        <Col>
        </Col>
      </Row>
      <Button variant="secondary">Login</Button>{' '}


    </Container>

  )
}

export default Login;