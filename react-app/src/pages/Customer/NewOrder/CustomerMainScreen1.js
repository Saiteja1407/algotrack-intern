import React,{useState,useEffect} from 'react'
import { city } from '../../../dummyData';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './CustomerMainScreen1.css';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import SearchBar from '../../../components/SearchBar';

const CustomerMainScreen1 = () => {
  // const [errState, setErrState] = useState(0);
  const navigate=useNavigate();
  const {id}=useParams();
  const [cityData,setCityData]=useState();   // Holds all cities
  const [filteredOrders, setFilteredOrders] = useState([]);// Holds filtered cities
  const [searchQuery, setSearchQuery] = useState("");      // Holds the search query

    
    useEffect(()=>{
      async function fetchData(){
        const response= await axios.get(`${process.env.REACT_APP_API}/citydata`);
        setCityData(response.data.data);
        setFilteredOrders(response.data.data);
        console.log(response.data.data);
      }
      fetchData();
    },[]);


  const handleCardClick=(cityName)=>{
    navigate(`/customer/${id}/mainscreen2?location=${cityName}`);
  }

  const handleSearchChange = (e) => {
    const searchQuery = e.target.value;
    setSearchQuery(searchQuery);
    filterOrders(searchQuery);
  };

  // Filter orders based on the search query
  const filterOrders = (searchQuery) => {
    const uppercaseSearchQuery = searchQuery.toUpperCase();
    const filteredOrders = cityData.filter((city) =>
      city.City.includes(uppercaseSearchQuery)
    );
    setFilteredOrders(filteredOrders);
  };

  return (
    <>
       <div className='container mb-5'>
       <div className='customer-mainScreen1 rounded'>
       <div className='city-search'>
              <SearchBar PlaceHolder="search by city" value={searchQuery} onChange={handleSearchChange} />

       </div>
       

          <div className='row g-3 p-3'>
          {filteredOrders&&filteredOrders.map(city=>{
            return (
              <div className='col-12 col-md-4 col-lg-3'>
              <div  className='rounded text-center p-1 mainscreen-city-card' onClick={()=>{handleCardClick(city.City)}}>
              <p className='customer-mainscreen1h2'>{city.City}</p>
              <h5 className='customer-mainscreen1h5'>{city.CityCount} warehouses</h5>
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

export default CustomerMainScreen1;