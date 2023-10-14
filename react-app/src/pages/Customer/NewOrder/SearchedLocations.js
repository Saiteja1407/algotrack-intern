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
      
      
      // const arr=responseData.map((item,warehouse_id)=>{
      //     if(formData.temperatureRange==='Dry'){
      //       return item.warehouse_price_dry;
      //     }
      //     else if(formData.temperatureRange==='Frozen'){
      //       return item.warehouse_price_frozen;
      //     }
      //     else{
      //       return item.warehouse_price_chiller;
      //     }
      // })
      // console.log(arr);

  const WarehousesData = [
    {
      images: [
        'https://www.shutterstock.com/shutterstock/photos/1929800966/display_1500/stock-photo-interior-of-a-modern-warehouse-storage-of-retail-shop-with-pallet-truck-near-shelves-1929800966.jpg',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNsAVdYMq7cyBor4lgiY8m6PE5SrlJHdBR4g&usqp=CAU',
        'https://thumbs.dreamstime.com/b/warehouse-industrial-logistics-companies-commercial-huge-distribution-high-shelves-bottom-view-191288522.jpg'],
      warehouseName: 'uncle warehouse',
      warehouseLocation: 'Delhi',
      warehousePrice: 'dho sav',
    },
    
    // Add more data objects as needed
  ]

  function moreDetails(warehouseId)
  {
    navigate(`/customer/${id}/${warehouseId}`,{state:{formData:formData}});
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
                      <Button variant="secondary">Place order</Button>
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