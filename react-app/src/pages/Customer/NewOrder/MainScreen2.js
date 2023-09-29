import React, { useState } from "react";
import { Card, Container, FloatingLabel } from "react-bootstrap";
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useLocation, useParams,useNavigate } from "react-router-dom";
import axios from "axios";



const MainScreen2 = () => {
    const {id}=useParams();
    const location=useLocation();
    const navigate=useNavigate();
    const city=new URLSearchParams(location.search).get('location');
    const [selectedDate, setSelectedDate] = useState(null);
    const [productType, setProductType] = useState("Veg");
    const [productDetails, setProductDetails] = useState("");
    const [temperatureRange, setTemperatureRange] = useState("Dry");
    const [storageType, setStorageType] = useState("Pallets");
    const [uom, setUOM] = useState("Pallets");
    const [numberOfUnits, setNumberOfUnits] = useState("");
    const [duration, setDuration] = useState("");
  
    const handleDateChange = (date) => {
      setSelectedDate(date);
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
  
      // Form data should be added to database
      const formData = {
        city,
        productType,
        productDetails,
        temperatureRange,
        storageType,
        uom,
        numberOfUnits,
        duration,
        selectedDate: selectedDate ? selectedDate.toLocaleDateString() : "",
      };
  
      
  
      // Here you can perform any other actions with the form data, like sending it to a server, etc.
      const postData = async () => {
        try {
          const response = await axios.post(`${process.env.REACT_APP_API}/customer/${id}/mainscreen2`, formData);
          const responseData = response.data.data;

      // Navigate to SearchedLocations and pass the response data in the state
      navigate(`/customer/${id}/searchedlocations`,{state:{formData:formData,responseData:responseData}});

        } catch (error) {
          throw error;
        }
      };
       postData()
      
      
    };
  
    return (
      <>
     
       
        <div className="maindiv">
          <Container className="p-3">
            <Row>
              
              <Col xs={12} md={8} lg={6} className="m-auto">
                <Card className="shadow-lg" style={{borderRadius:20,backgroundColor:'whitesmoke'}}>
                  
                  <Card.Header className="p-2 mx-5 mt-4 mb-2" style={{ textAlign: "center", backgroundColor: "lightgrey", color: "black" }}>
                    <h4>Enter Product Details</h4>
                  </Card.Header>
                  
                  <Card.Body>
                    <Form onSubmit={handleSubmit}>
                      <Row className="p-3">
                      <Col xs={2}></Col>
                        <Col xs={12} md={8}>
                          <Form.Group>
                            <FloatingLabel controlId= "flotingInput" label="City Location"  className="mb-3">
                            <Form.Control type="text" placeholder="City Location" disabled readOnly value={city} size="lg" />
                            </FloatingLabel>
                          </Form.Group>
                        </Col>
                      </Row>
  
                      <Row className="p-3">
                      <Col xs={1}></Col>
                        <Col xs={12} md={10}>
                          <Form.Group className="mb-3">
                            <Form.Label><h5>Product Type:</h5></Form.Label>
                            <Form.Select aria-label="Default select example" value={productType} onChange={(e) => setProductType(e.target.value) } size="lg" required>
                              <option selected disabled value="">Select the Product type</option>
                              <option value="Veg">Veg</option>
                              <option value="Non-Veg">Non-Veg</option>
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">
                              Select a valid Product type
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                      </Row>
  
                      <Row className="p-3">
                      <Col xs={1}></Col>
                        <Col xs={12} md={10}>
                          <Form.Group>
                            <Form.Label><h5> Product Details:</h5></Form.Label>
                            <Form.Select aria-label="Default select example" value={productDetails} onChange={(e) => setProductDetails(e.target.value) } size="lg" required>
                              <option selected disabled value="">Select the Product details</option>
                              <option value="Product 1">Product 1</option>
                              <option value="Product 2">Product 2</option>
                              <option value="Product 3">Product 3</option>
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">
                              Select your Product details
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                      </Row>
  
                      <Row className="p-3">
                      <Col xs={1}></Col>
                        <Col xs={12} md={10}>
                          <Form.Group className="mb-3">
                            <Form.Label><h5>Temperature Range :</h5></Form.Label>
                            <Form.Select aria-label="Default select example" value={temperatureRange} onChange={(e) => setTemperatureRange(e.target.value)} size="lg" required>
                              <option selected disabled value="">Select the Temperature Range</option>
                              <option value="Dry">Dry</option>
                              <option value="Frozen">Frozen</option>
                              <option value="Chiller">Chiller</option>
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">
                              Select a valid Temperature Range
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                      </Row>
  
                      <Row className="p-3">
                      <Col xs={1}></Col>
                        <Col xs={12} md={10}>
                          <Form.Group className="mb-3">
                            <Form.Label><h5>Storage Type :</h5></Form.Label>
                            <Form.Select aria-label="Default select example" value={storageType} onChange={(e) => setStorageType(e.target.value)} size="lg" required>
                              <option selected disabled value="">Select the Storage Type</option>
                              <option value="Pallets">Pallets</option>
                              <option value="Floor Mezzanine">Floor Mezzanine</option>
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">
                              Select a valid Storage Type
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                      </Row>
  
                      <Row className="p-3">
                      <Col xs={1}></Col>
                        <Col xs={12} md={10}>
                          <Form.Group className="mb-3">
                            <Form.Label><h5>UOM :</h5></Form.Label>
                            <Form.Select aria-label="Default select example" value={uom} onChange={(e) => setUOM(e.target.value)} size="lg" required>
                              <option selected disabled value="">Select the UOM</option>
                              <option value="Pallets">Pallets</option>
                              <option value="Tons">Tons</option>
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">
                              Select a valid UOM
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                      </Row>
  
                      <Row className="p-3">
                      <Col xs={1}></Col>
                        <Col xs={12} md={10}>
                          <Form.Group>
                            <Form.Label><h5> Number Of Units:</h5></Form.Label>
                            <Form.Control type="number" placeholder="Enter the Number Of Units" value={numberOfUnits} onChange={(e) => setNumberOfUnits(e.target.value)} required  size="lg"/>
                            <Form.Control.Feedback type="invalid">
                              Enter the number of units
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                      </Row>
  
                      <Row className="p-3">
                      <Col xs={1}></Col>
                        <Col xs={12} md={10}>
                          <Form.Group>
                            <Form.Label><h5> Duration In Months:</h5></Form.Label>
                            <Form.Control type="number" placeholder="Enter the Number Of Months " value={duration} onChange={(e) => setDuration(e.target.value)} required size="lg" />
                            <Form.Control.Feedback type="invalid">
                              Enter a valid duration of months
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                      </Row>
  
                      <Row className="p-3">
                      <Col xs={1}></Col>
                        <Col xs={12} md={10}>
                          <Form.Group className="mb-3" size="lg">
                            <Form.Label><h5>Possesion:</h5></Form.Label>
                            <br />
                            <DatePicker
                              selected={selectedDate}
                              onChange={handleDateChange}
                              dateFormat="dd/MM/yyyy"
                              placeholderText="Select a date"
                              required
                              
                            />
                            <Form.Control.Feedback type="invalid">
                              Enter a valid date
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                      </Row>
  
                      <div className="p-3">
                        <Row>
                          
                          <Col className="m-auto text-center">
                        <Button variant="primary" type="submit" className="submitbutton w-75">
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
      </>
    );
  }

export default MainScreen2