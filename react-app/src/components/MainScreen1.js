import React from 'react'
import { city } from '../dummyData'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './MainScreen1.css';
import { useNavigate } from 'react-router-dom';

const MainScreen1 = () => {
    const navigate=useNavigate();
  const handleCardClick=(cityName)=>{
    navigate(`/customer/mainscreen2/${cityName}`);
  }
  return (
    <>
          <div className='container mb-5'>
       <div className='mainScreen1 rounded'>
       <div className='city-search'>
            <Form className="d-flex ms-auto  search col-md-8 col-lg-6 col-xl-5">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-4 ms-5"
              aria-label="Search"
            />
            <Button variant="dark">Search</Button>
          </Form>
       </div>
       

          <div className='row g-3 p-3'>
          {city.map(val=>{
            return (
              <div className='col-6 col-md-4 col-lg-3'>
              <div  className='rounded text-center p-1 mainscreen-city-card' onClick={()=>{handleCardClick(val.courseName)}}>
              <h2>{val.courseName}</h2>
                <img src={val.hoverCover} alt='monument'/>
                <h5>{val.course}</h5>
              </div>
              </div>
               

            )
           })}


          </div>
          
        </div>
       </div>
        
        
    </>
  )
}

export default MainScreen1