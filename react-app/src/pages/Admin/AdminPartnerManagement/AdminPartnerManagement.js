import React,{useState,useEffect} from "react";
import { Row,Col,Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import './AdminPartnerManagement.css';
import Table from 'react-bootstrap/Table';
import { verifiedcustomers } from "../../Customer/CustomerMainScreen/orderdummydata";
import {MdDelete} from 'react-icons/md'
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

let AdminPartnerManagement = () =>{

   const {id}=useParams();
   const [partnersData,setPartnersData]=useState([])
   const [ErrorState,setErrorState]=useState(0);
   const navigate=useNavigate();

   const fetchPartnerDetails = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API}/admin/${id}/partner/management`,{withCredentials:true});
        setPartnersData(response.data.data);
        console.log(response.data.data)
      } catch (error) {
        console.error(error);
        if (error.request.status===401){
          setErrorState(1)
         }
      }
    };

    useEffect(() => {

      fetchPartnerDetails();
    }, []);

     async function handleDelete(partnerId){
      // delete partner entry from data base
      const response= await axios.patch(`${process.env.REACT_APP_API}/admin/${id}/partner/management/${partnerId}`,{withCredentials:true});
      fetchPartnerDetails();
      console.log("partner deleted successfully:", response.data);
     }
     
        //View Warehouses
        const handleViewWarehouses=async(partnerId)=>{
            navigate(`/admin/${id}/${partnerId}/warehouses`);
        }
        if(ErrorState===1){
          navigate('/unauthorizedpage');
         }
    


    return(
        <>
          <Container>
             
              <Row>
                 <Row >
                    <Col xs={12} md={6} className="partnermanagementcoloumn mt-3">Partners Managment</Col>
                 </Row>
                 <Row className="mt-4">
                 
                 <Table bordered hover size="lg" variant="Secondary" responsive>
      
                    <thead size="lg" className="fs-4 table-secondary" >
                      <tr>
                         <th >Partner Id</th>
                         <th >Name    </th>
                         <th >Company Name</th>
                         <th >Mobile Number</th>
                         <th >Email ID</th>
                         <th>      </th>    
                         <th>    </th>
                       </tr>
                    </thead>
                     <tbody className="center" size="lg">
                     { partnersData.map((val) =>(
                           <tr>
                            <><td>{val.partner_id}</td>
                            <td>{val.spoc_name}</td>
                            <td>{val.patner_company_name}</td>  
                            <td>{val.spoc_mobile}</td> 
                            <td>{val.spoc_emailid}</td>
                            <td><Button onClick={()=>{handleViewWarehouses(val.partner_id)}} variant="danger">View Warehouses</Button></td>
                            <td className="col-1"><span className="ms-2" onClick={()=>{handleDelete(val.partner_id)}}><MdDelete/></span></td> </>  
                            </tr> 
                       ))} 
                     </tbody>
                   </Table>
                   
                 </Row>
              </Row>

          </Container>   

        </>
    );
}
export default AdminPartnerManagement;