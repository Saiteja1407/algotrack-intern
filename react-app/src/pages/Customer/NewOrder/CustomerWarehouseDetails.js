import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Carousel,Modal } from 'react-bootstrap';
import './CustomerWarehouseDetails.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import { TiTick } from "react-icons/ti";
import { ImCross } from "react-icons/im";
const CustomerWarehouseDetails = () => {
  const {id,warehouseId}=useParams();
      const [warehouseDetails,setWarehouseDetails]=useState([]);
      const navigate=useNavigate();
      const location=useLocation();
      const {formData}=location.state;
      const [frozenTempData,setFrozenData]=useState();
      const [dryTempData,setDryData]=useState();
      const [chillerTempData,setChillerData]=useState();
      const [ErrorState,setErrorState]=useState(0);

      const [imageData,setWarehouseImages]=useState([]);//images
  //carousel full size
  const [showModal, setShowModal] = useState(false); 
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [modalCarouselIndex, setModalCarouselIndex] = useState(0);
  const [bufferData,setBufferData]=useState();

      useEffect(()=>{
        const fetchWarehouseDetails = async () => {
          try {
            const response = await axios.get(`${process.env.REACT_APP_API}/customer/${id}/${warehouseId}`,{withCredentials:true});
            console.log(response.data.data)
            setWarehouseDetails(response.data.data.results);
            setWarehouseImages(response.data.data.result);
            setBufferData(response.data.data.results[0]?.warehouse_license?.data)
            {response.data.data.sensorData.map(sensor=>{
              if(sensor.sensor_warehouse_location==="frozen"){
                setFrozenData(sensor.temp_data);
                console.log(sensor.temp_data)
              }
              else if(sensor.sensor_warehouse_location==="dry"){
                setDryData(sensor.temp_data);
              }
              else if(sensor.sensor_warehouse_location==="chiller"){
                setChillerData(sensor.temp_data);
              }
            })}  
          } catch (error) {
            // console.error('Error fetching order details:', error);
            if (error.request&&error.request.status===401){
              setErrorState(1);
             }
          }
        };
    
        fetchWarehouseDetails();
      },
      [id,warehouseId]);
      const price=(item)=>{
        if(item==='Dry'){
          return warehouseDetails[0]&&warehouseDetails[0].warehouse_price_dry;
        }
        else if(item==='Frozen'){
         return warehouseDetails[0]&&warehouseDetails[0].warehouse_price_frozen;
        }
        else if(item==='Chiller'){
         return warehouseDetails[0]&&warehouseDetails[0].warehouse_price_chiller;
        }
       }
        const availableSpace=(item)=>{
          if(item==='Dry'){
            return warehouseDetails[0]&&warehouseDetails[0].available_dry_capacity;
          }
          else if(item==='Frozen'){
          return warehouseDetails[0]&&warehouseDetails[0].available_frozen_capacity;
          }
          else if(item==='Chiller'){
          return warehouseDetails[0]&&warehouseDetails[0].available_chiller_capacity;
          }
        }
    
    const bufferToBase64 = buffer => {
      return btoa(new Uint8Array(buffer).reduce((data, byte) => data + String.fromCharCode(byte), ''));
    };

    function handleContact(){
        const postData = async () => {
          try {
            const response = await axios.post(`${process.env.REACT_APP_API}/customer/${id}/${warehouseId}`, formData,{withCredentials:true});
            const responseData = response.data.data;
            navigate(`/customer/mainscreen/${id}`);
          } catch (error) {
            throw error;
          }
        };
         postData()
      }

      if(ErrorState===1){
        navigate('/unauthorizedpage');
      }

  

  return (
    <>
      <Container>
        <Card className="moredetails">
          <Card.Body>
            <Row>
              <Col xs={12} lg={5}>
              <Carousel className="carousel" data-bs-theme="dark">
                {imageData.length>0 && imageData.map((item, index) => {
                  
                  {/* console.log(item.warehouse_images.data); */}
                  //console.log(imageUrl);
                  return (
                    <Carousel.Item key={index} 
                    onClick={() => {
                          setSelectedImageIndex(index);
                          setModalCarouselIndex(index);
                          setShowModal(true);
                        }}
                          style={{ cursor: 'pointer' }}>
                      <img
                        className="d-block w-200 carousel-warehouse-imgs"
                        src={`data:image/jpeg;base64,${bufferToBase64(item.warehouse_images.data)}`}
                        alt="warehouseImage"
                        style={{
              objectFit: 'cover',
              width: '100%',
              height: '100%',
              maxHeight: '500px', // Set the maximum height if needed
            }}
                      />
                    </Carousel.Item>
                  );
                })}
              </Carousel>

              <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Body>
          <Carousel
            activeIndex={modalCarouselIndex}
            onSelect={(index) => setModalCarouselIndex(index)}
            interval={null}
          >
            {imageData.map((item, index) => (
              <Carousel.Item key={index}>
                <img
                  className="w-100"
                  src={`data:image/jpeg;base64,${bufferToBase64(item.warehouse_images.data)}`}
                  style={{ maxHeight: '80vh', objectFit: 'contain' }}
                />
              </Carousel.Item>
            ))}
          </Carousel>
          <Button variant="secondary" onClick={() => setShowModal(false)} className="mt-2">
            Close
          </Button>
        </Modal.Body>
      </Modal>
              </Col>
              <Col xs={12} lg={7}>
                <Card className="detailsinfo">
                  <ListGroup variant="flush">
                    {warehouseDetails[0]&& (
                      <React.Fragment>
                        <ListGroup.Item>Warehouse name: {warehouseDetails[0].warehouse_name}</ListGroup.Item>
                        <ListGroup.Item>Warehouse location: {`${warehouseDetails[0].city},${warehouseDetails[0].pincode}`}</ListGroup.Item>
                        <ListGroup.Item>{`${formData.temperatureRange} Space price: ${price(formData.temperatureRange)}`}</ListGroup.Item>
                        <ListGroup.Item>
                          {`Available ${formData.temperatureRange} space:${availableSpace(formData.temperatureRange)}`}
                        </ListGroup.Item>
                        <ListGroup.Item>Frozen Space Temperature: {frozenTempData&& frozenTempData}</ListGroup.Item>
                        <ListGroup.Item>Dry Space Temperature: {dryTempData&& dryTempData} </ListGroup.Item>
                        <ListGroup.Item>Chiller Space Temperature: {chillerTempData&& chillerTempData} </ListGroup.Item>
                        <ListGroup.Item>License document:{bufferData&&bufferData ? <TiTick style={{ fontSize: 40 }}/>:<ImCross />}</ListGroup.Item>
                      </React.Fragment>
                    )}
                  </ListGroup>

                  <Button onClick={handleContact} className="contact-now col-5 col-sm-4 col-md-3 m-2" variant="secondary">
                    Place Order
                  </Button>
                </Card>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default CustomerWarehouseDetails;