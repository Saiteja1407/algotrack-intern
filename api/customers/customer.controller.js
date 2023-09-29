import {  compareSync, genSaltSync, hashSync } from 'bcrypt';
import {create,checkCustomerByMobile,checkCustomerByEmail, getCustomerByEmail, CustomerOrdersDashboard,getCustomerOrderDetails, getCustomerInventoryDashboard, getCustomerInventoryDetails, getSearchedLocations, getCustomerWarehouseDetails} from './customer.services.js';

export const createUser=(req,res)=>{
   const body=req.body;
   const salt=genSaltSync(10);
   body.password=hashSync(body.password,salt);
   console.log(body);
   create(body,(err,results)=>{
      if(err){
        console.log(err);
        return res.send({
            message:"error in customer registration",
        });
      }
      return res.send({
         data:results.insertId
      });

   });
} 

export const signUpMobileController=(req,res)=>{
   const body=req.body;
   checkCustomerByMobile(body,(err,results)=>{
      if(err){
         console.log(err);
         return res.send({
             message:"db connection error",
         });
       }
       if(results[0].user_exists){
         return res.send({
            message:"this mobile number is already registerd, please login"
         });
       }
       //send otp should be handled here ---------------------------------

       return res.send({
          data:results
       });
 
   });
}

export const signUpEmailController=(req,res)=>{
   const body=req.body;
   checkCustomerByEmail(body,(err,results)=>{
      if(err){
         console.log(err);
         return res.send({
             message:"error in check customer by email ",
         });
       }
       if(results[0].user_exists){
         return res.send({
            message:"this email is already registerd, please login"
         });
       }
       //send otp should be handled here ---------------------------------

   });
}


// -------------  CUSTOMER LOGIN   --------------------
export const loginCustomerMobileController=(req,res)=>{
   const body=req.body;
   checkCustomerByMobile(body,(err,results)=>{
      if(err){
         console.log(err);
         return res.send({
             message:"error in check customer by email ",
         });
       }
       if(results[0].user_exists){
          //send otp should be handled here ---------------------------------
         return res.send({
            message:"otp will be sent"
         });
       }
       else{
         return res.send({
            message:"this number isn't registerd yet, please sign up"
         });
       }

   })
}

export const loginCustomerEmailController=(req,res)=>{
   const body=req.body;
  
   getCustomerByEmail(body,(err,results)=>{
      if(err){
         console.log(err);
         return res.send({
            message:"error in customer email login"
         })
      }
      if(!results){
         return res.send({
            message:"email isn't registered, please sign up"
         })
      }
      console.log(results[0]);
      const result=compareSync(body.password,results[0].customer_password);
      if(result){
         return res.send({message:"login via email is successful",
                     data:results[0].customer_id
      });
      }
      return res.send({
         message:"incorrect email or password"
      })
   })

}

export const CustomerOrdersDashboardController=(req,res)=>{
   const id=req.params.id;
   CustomerOrdersDashboard(id,(err,results)=>{
      if(err){
         console.log(err);
         return res.send({
            message:"error in customer orders dashboard"
         });
      }
      if(!results){
         return res.send({
            message:"no orders placed yet"
         });
      }
      return res.send({
         data:results,
      })
   })
}

export const CustomerOrderDetailsController=(req,res)=>{
    const id=req.params.id;
    console.log(id);
    getCustomerOrderDetails(id,(err,results)=>{
      if(err){
         console.log(err);
         return res.send({
            message:"error in customer order details"
         })
      }
      if(!results){
         return res.send({
            message:"no order present with this id"
         })
      }
      return res.send({
         data:results
      });
    })
}

export const CustomerInventoryDashboardController=(req,res)=>{
   const id=req.params.id;
   getCustomerInventoryDashboard(id,(err,results)=>{
      if(err){
         console.log(err);
         return res.send({
            message:"error in customer inventory dashboard"
         })
      }
      if(!results){
         return res.send({
            message:"no inventory for this order yet"
         })
      }
      return res.send({
         data:results
      });
   })
}


export const CustomerInventoryHistoryController=(req,res)=>{
   const id=req.params.id;
   getCustomerInventoryDetails(id,(err,results)=>{
      if(err){
         console.log(err);
         return res.send({
            message:"error in customer inventory history"
         })
      }
      if(!results){
         return res.send({
            message:"no inventory history for this inventory yet"
         })
      }
      return res.send({
         data:results
      });
   }) 
}

export const CustomerMainscreen1Controller=(req,res)=>{
   
}

export const CustomerMainscreen2Controller=(req,res)=>{
   const id=req.params.id;
   const body=req.body;
   console.log(body)
   getSearchedLocations(body,(err,results)=>{
      
      if(err){
         console.log(err);
         return res.send({
            message:"error in getting searched locations"
         })
      }
      if(!results){
         return res.send({
            message:"no warehouse available with your requirements"
         })
      }
      return res.send({
         data:results
      });
   })
}

export const CustomerWarehouseDetailsController=(req,res)=>{
    const warehouseId=req.params.warehouseId;
    console.log(warehouseId);
    getCustomerWarehouseDetails(warehouseId,(err,results)=>{
      if(err){
         console.log(err);
         return res.send({
            message:"error in customer warehouse details"
         })
      }
      if(!results){
         return res.send({
            message:"no warehouse available with this Id"
         })
      }
      return res.send({
         data:results
      });
    })
}