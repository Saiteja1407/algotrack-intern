import React, { useEffect, useState } from 'react'
import { city } from '../dummyData'
import './MainScreen1.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const MainScreen1 = () => {
    const navigate=useNavigate();
    const [cityData,setCityData]=useState();

    useEffect(()=>{
      async function fetchData(){
        const response= await axios.get(`${process.env.REACT_APP_API}/citydata`);
        setCityData(response.data.data);
        console.log(response.data.data);
      }
      fetchData();
    },[]);
    const getCityCount = (cityName) => {
      const city = cityData?.find((item) => item.City === cityName);
      return city ? city.CityCount : 0;
    };
  const handleCardClick=()=>{
    navigate(`/customer/login/cutomer/email`);
  }
  return (
    <>
          <div className='container mb-5'>
       <div className='mainScreen1 rounded'>
       <h2 className='cityCard-title'>We have our footprints across {cityData&& cityData.length} cities in India.</h2>

          <div className='row g-3 p-3'>

          <div className='col-6 col-md-4 col-lg-3'>
              <div  className='rounded text-center p-1 mainscreen-city-card' onClick={()=>{handleCardClick()}}>
              <h2>Mumbai</h2>
                <img className='mainscreen1-img' src="./Mumbai.jpg" alt='Indian gate'/>
                <h5>{`${getCityCount("Mumbai")} Warehouses`}</h5>
              </div>
              </div>

              <div className='col-6 col-md-4 col-lg-3'>
              <div  className='rounded text-center p-1 mainscreen-city-card' onClick={()=>{handleCardClick()}}>
              <h2>Hyderabad</h2>
                <img className='mainscreen1-img' src="./Hyderabad.jpg" alt='Charminar'/>
                <h5>{`${getCityCount("hyderabad")} Warehouses`}</h5>
              </div>
              </div>

              <div className='col-6 col-md-4 col-lg-3'>
              <div  className='rounded text-center p-1 mainscreen-city-card' onClick={()=>{handleCardClick()}}>
              <h2>Delhi</h2>
                <img className='mainscreen1-img' src='./Delhi.jpg' alt='Red Fort'/>
                <h5>{`${getCityCount("delhi")} Warehouses`}</h5>
              </div>
              </div>

              <div className='col-6 col-md-4 col-lg-3'>
              <div  className='rounded text-center p-1 mainscreen-city-card' onClick={()=>{handleCardClick()}}>
              <h2>Bangalore</h2>
                <img className='mainscreen1-img' src='Bangalore.jpg' alt='Bangalore Palace'/>
                <h5>{`${getCityCount("banglore")} Warehouses`}</h5>
              </div>
              </div>

          </div>
          
        </div>
       </div>
        
        
    </>
  )
}

export default MainScreen1;