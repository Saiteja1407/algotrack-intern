import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import "./AdminWarehouses.css";
import { Link, useNavigate, useParams } from 'react-router-dom';
import SearchBar from '../../../components/SearchBar';
import axios from 'axios';

const AdminWarehouses = () => {
  const {id,partnerId}=useParams();
  const [warehouses,setWarehouses]=useState([]);
  const [ErrorState,setErrorState]=useState(0);
  const navigate=useNavigate();

  

  useEffect(()=>{
    const fetchPartnerWarehouses=async()=>{
      try {
        const response= await axios.get(`${process.env.REACT_APP_API}/admin/${id}/${partnerId}/warehouses`,{withCredentials:true});
        setWarehouses(response.data.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
        if (error.request.status===401){
          setErrorState(1)
         }
      }
    }
       fetchPartnerWarehouses();
  },[]);
    
     

      const handleWarehouseDetails=(warehouseId)=>{
          navigate(`/admin/${id}/${partnerId}/warehouse/${warehouseId}/details`);
      }

      const handleaddwarehouse=()=>{
        navigate(`/admin/${id}/${partnerId}/addwarehouse`)
      }
      if(ErrorState===1){
        navigate('/unauthorizedpage');
       }
       //console.log(warehouses)

  return (
    <>

       <div className="container">
          <SearchBar PlaceHolder='search by warehouse id'/>
        <div className="mb-4 me-4 d-flex justify-content-end ">
          <Button variant='primary' onClick={()=>{handleaddwarehouse()}}>Add Warehouse</Button>
        </div>
       
        <div className="row g-2 bg-secondary rounded">

          
        { warehouses.map(item => {
          return(
          <div className="col-sm-12 col-lg-6 ">
            <Card style={{ width: '26rem' }} className="admin-warehouses-card shadow">
              <Card.Img variant="top" src={item.img} />
              <Card.Body>
                <Card.Text>
                  Warehouse Name :{item.warehouse_name}
                </Card.Text>
                <Card.Text>
                  Warehouse ID :{`${item.warehouse_id}`}
                </Card.Text>
                <Card.Text>
                  Warehouse Location :{`  ${item.street}, ${item.city}, ${item.state} - ${item.pincode}`}
                </Card.Text>
                <div className="m-1">
                <Button onClick={()=>{handleWarehouseDetails(item.warehouse_id)}} variant="secondary">Moredetails</Button>
                </div>
                <div className="m-1"><Button variant="secondary">Submit</Button></div>
              </Card.Body>
            </Card>
          </div>
          )
        })}
        </div>
       </div>

     
       

    </>
  )
}

export default AdminWarehouses;