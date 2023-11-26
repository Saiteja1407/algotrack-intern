import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './SearchedLocations.css';
import {  useLocation, useNavigate, useParams } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';
import SearchBar from '../../../components/SearchBar';


const SearchedLocations = () => {
      const {id}=useParams();
       const navigate=useNavigate();
       const location=useLocation();
       const {formData,responseData}=location.state;
      console.log(formData,responseData);
      
      
     

  

  function moreDetails(warehouseId)
  {
    navigate(`/customer/${id}/${warehouseId}`,{state:{formData:formData}});
  }
  function handleClick(warehouseId,warehousePrice){
    navigate(`/customer/${id}/${warehouseId}/placeOrder`,{state:{formData:formData,warehousePrice:warehousePrice}})
  }
  
  const price=(item)=>{
       if(formData.temperatureRange==='Dry'){
         return item.warehouse_price_dry;
       }
       else if(formData.temperatureRange==='Frozen'){
        return item.warehouse_price_frozen;
       }
       else{
        return item.warehouse_price_chiller;
       }
  }
  if (!responseData){
    return(
      <h1 style={{width:"100vh",height:"60vh",textAlign:"center"}}>you dont have any warehouses matching your requirement</h1>
    )
  }
  return (
    <>
    <div className="searchingwarehouse">
      <SearchBar PlaceHolder="search by warehouse ID"/>
      </div>  
      <div className="container mb-4 mt-4 ">
        <div className="row g-2 " >
          {responseData.map((item, index) => {
            return (
              <div className="col-sm-12 col-lg-6" key={index}>
                <Card style={{ width: '26rem', borderRadius:'2rem' }} className="card shadow">
                  <div className="carousel-container">
                    {/* <Carousel controls={true} interval={100}>
                      {item.images.map((image, imgIndex) => (
                        <Carousel.Item key={imgIndex}>
                          <div className="image-container">
                            <img
                              className="d-block w-100 rounded-top"
                              src={image}
                              alt={`Warehouse  ${imgIndex}`}
                            />
                          </div>
                        </Carousel.Item>
                      ))}
                    </Carousel> */}
                  </div>
                  <Card.Body>
                    <Card.Text>Id: {item.warehouse_id}</Card.Text>
                    <Card.Text><h1>{item.warehouse_name}</h1> </Card.Text>
                    <Card.Text>₹{price(item)}</Card.Text>
                    <div className="m-1">
                      <Button onClick={()=>{moreDetails(item.warehouse_id)}} variant="secondary">More details</Button>
                    </div>
                    <div className="m-1">
                      <Button variant="secondary" onClick={()=>{handleClick(item.warehouse_id,price(item))}}>Place order</Button>
                    </div>
                  </Card.Body>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default SearchedLocations;