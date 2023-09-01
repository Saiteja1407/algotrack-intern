import React, { useState } from "react";
import { Card, Container, FloatingLabel } from "react-bootstrap";
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import "./CustomerRegistration.css"

const CustomerRegistration = ({ prevEmail, prevPhoneNumber }) => {
    const [name, setName] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [email, setEmail] = useState(prevEmail || "");
    const [phoneNumber, setPhoneNumber] = useState(prevPhoneNumber || "");
    const [password, setPassword] = useState("");
    const [designation, setDesignation] = useState("");
    
    const handleSubmit = (e) => {
      e.preventDefault();
  
      // Validate phone number (accepts only 10 digits)
      const phoneNumberRegex = /^\d{10}$/;
      if (!phoneNumberRegex.test(phoneNumber)) {
        alert("Please enter a valid 10-digit phone number.");
        return;
      }
  
      // Validate password (at least 8 characters long)
      if (password.length < 8) {
        alert("Password must be at least 8 characters long.");
        return;
      }
  
      const formData = {
        name,
        companyName,
        email,
        phoneNumber,
        password,
        designation,
      };
      console.log(formData);
    };
  
    return (
      <div className="customer-registration-maindiv">
        <Container className="p-3" >
          <Row>
            
            <Col xs={12} md={8} lg={6} className="m-auto">
              <Card className="shadow-lg black-white-theme">
               
                <Card.Header className="mx-5 my-3"  style={{ textAlign: "center", backgroundColor: "lightgrey" }}>
                  <h4>Register</h4>
                </Card.Header>
               
                              
                <Card.Body>
                  <Form onSubmit={handleSubmit}>
                    <Row className="p-3">
                      <Col xs={2}></Col>
                      <Col xs={12} md={8}>
                        <Form.Group>
                          
                          <FloatingLabel controlId="floatingInput" label="Name" className="mb-3">
                          <Form.Control
                          placeholder="name"
                          type="text"
                            size="lg"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                          />
                          </FloatingLabel>
                        </Form.Group>
                      </Col>
                    </Row>
  
                
  
                    <Row className="p-3">
                    <Col xs={2}></Col>
                      <Col xs={12} md={8}>
                        <Form.Group>
                          
                          <FloatingLabel  controlId= "flotingInput" label="Company Name"  className="mb-3">
                          <Form.Control
                            size="lg"
                            placeholder="abc entrprises"
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                            required
                          />
                          </FloatingLabel>
                        </Form.Group>
                      </Col>
                    </Row>
  
                    <Row className="p-3">
                    <Col xs={2}></Col>
                      <Col xs={12} md={8}>
                        <Form.Group>
                         <FloatingLabel controlId= "flotingInput" label="Email ID"  className="mb-3">
                          <Form.Control
                            size="lg"
                            type="email"
                            placeholder="Mail iD"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                          />
                          </FloatingLabel>
                        </Form.Group>
                      </Col>
                    </Row>
  
                    <Row className="p-3">
                    <Col xs={2}></Col>
                      <Col xs={12} md={8}>
                        <Form.Group>
                          <FloatingLabel controlId= "flotingInput" label="Phone Number"  className="mb-3">
                          <Form.Control
                            size="lg"
                            type="number"
                            placeholder="Phone Number"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            required
                          />
                          </FloatingLabel>
                        </Form.Group>
                      </Col>
                    </Row>
  
                    <Row className="p-3">
                    <Col xs={2}></Col>
                      <Col xs={12} md={8}>
                        <Form.Group>
                          <FloatingLabel  controlId= "flotingInput" label="Password"  className="mb-3">
                          <Form.Control
                            size="lg"
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                          />
                          <Form.Text id="passwordHelpBlock" muted>
                            Your password must be at least 8 characters long
                          </Form.Text>
                          </FloatingLabel>
                        </Form.Group>
                      </Col>
                    </Row>
  
                    <Row className="p-3">
                    <Col xs={2}></Col>
                      <Col xs={12} md={8}>
                        <Form.Group className="mb-3">
                          
                          <FloatingLabel  controlId= "flotingInput" label="Designation"  className="mb-3">
                          <Form.Select
                            aria-label="Default select example"
                            value={designation}
                            onChange={(e) => setDesignation(e.target.value)}
                            required
                            size="lg"
                          >
                            <option value="">Select The Designation</option>
                            <option value="One">One</option>
                            <option value="Two">Two</option>
                            <option value="Three">Three</option>
                          </Form.Select>
                          </FloatingLabel>
                        </Form.Group>
                      </Col>
                    </Row>
  
                    <div className="p-3">
                      <Row>
                    <Col xs={4}></Col>
                    <Col xs={12} md={8} className="center">
                    <Button variant="primary" type="submit" className="submitbutton center">
                        Submit
                      </Button>
                    </Col>
                    </Row> 
                    </div>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }

export default CustomerRegistration