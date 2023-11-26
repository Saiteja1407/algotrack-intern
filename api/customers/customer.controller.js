import { compareSync, genSaltSync, hashSync } from 'bcrypt';
import { create, checkCustomerByMobile, checkCustomerByEmail, getCustomerByEmail, CustomerOrdersDashboard, getCustomerOrderDetails, getCustomerInventoryDashboard,
    getCustomerInventoryDetails, getSearchedLocations, getCustomerWarehouseDetails, 
    placeOrderToWarehouse, getWarehouseNameAndPartnerId, getCutomerWarehouseImages,
     getCityData, getCustomerSensorData, getCustomerProfileDetails } from './customer.services.js';
import Jwt from "jsonwebtoken";
export const createUser = (req, res) => {
   const body = req.body;
   const salt = genSaltSync(10);
   body.password = hashSync(body.password, salt);
   console.log(body);
   create(body, (err, results) => {
      if (err) {
         console.log(err);
         return res.send({
            message: "error in customer registration",
         });
      }
      return res.send({
         data: results.insertId
      });

   });
}

export const signUpMobileController = (req, res) => {
   const body = req.body;
   checkCustomerByMobile(body, (err, results) => {
      if (err) {
         console.log(err);
         return res.send({
            message: "db connection error",
         });
      }
      if (results[0].user_exists) {
         return res.send({
            message: "this mobile number is already registerd, please login"
         });
      }
      //send otp should be handled here ---------------------------------

      return res.send({
         data: results
      });

   });
}

export const signUpEmailController = (req, res) => {
   const body = req.body;
   checkCustomerByEmail(body, (err, results) => {
      if (err) {
         console.log(err);
         return res.send({
            message: "error in check customer by email ",
         });
      }
      if (results[0].user_exists) {
         return res.send({
            message: "this email is already registerd, please login"
         });
      }
      //send otp should be handled here ---------------------------------

   });
}


// -------------  CUSTOMER LOGIN   --------------------
export const loginCustomerMobileController = (req, res) => {
   const body = req.body;
   checkCustomerByMobile(body, (err, results) => {
      if (err) {
         console.log(err);
         return res.send({
            message: "error in check customer by email ",
         });
      }
      if (results[0].user_exists) {
         //send otp should be handled here ---------------------------------
         return res.send({
            message: "otp will be sent"
         });
      }
      else {
         return res.send({
            message: "this number isn't registerd yet, please sign up"
         });
      }

   })
}

export const loginCustomerEmailController = (req, res) => {
   const body = req.body;
   getCustomerByEmail(body, (err, results) => {
      if (err) {
         console.log(err);
         return res.send({
            message: "error in customer email login"
         })
      }
      if (!results.length) {
         return res.status(403).send({
            message: "email isn't registered, please sign up"
         })
      }
      const result = compareSync(body.password, results[0].customer_password);
      if (result) {
         const user={
            id: results[0].customer_id,
            role:'customer'
         }
         // generation of cookie
         const token = Jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '2h' });
         res.cookie('token', token, { httpOnly: true,withCredentials:true });

      let customer={
             customerId:results[0].customer_id,
            customerName:results[0].customer_name
         }
         return (

            res.send({
               data:customer,   
             })
         )
      }
      return res.status(402).send({
         message: "incorrect email or password"
      })
   })

}

export const CustomerOrdersDashboardController = (req, res) => {
   const id = req.params.id;
   CustomerOrdersDashboard(id, (err, results) => {
      if (err) {
         console.log(err);
         return res.send({
            message: "error in customer orders dashboard"
         });
      }
      if (!results) {
         return res.send({
            message: "no orders placed yet"
         });
      }
      return res.send({
         data: results,
      })
   })
}

export const CustomerOrderDetailsController = (req, res) => {
   const id = req.params.orderId;
   console.log(id);
   getCustomerOrderDetails(id, (err, results) => {
      if (err) {
         console.log(err);
         return res.send({
            message: "error in customer order details"
         })
      }
      if (!results) {
         return res.send({
            message: "no order present with this id"
         })
      }
      return res.send({
         data: results
      });
   })
}

export const CustomerInventoryDashboardController = (req, res) => {
   const id = req.params.orderId;
   getCustomerInventoryDashboard(id, (err, results) => {
      if (err) {
         console.log(err);
         return res.send({
            message: "error in customer inventory dashboard"
         })
      }
      if (!results) {
         return res.send({
            message: "no inventory for this order yet"
         })
      }
      return res.send({
         data: results
      });
   })
}


export const CustomerInventoryHistoryController = (req, res) => {
   const id = req.params.inventoryId;
   getCustomerInventoryDetails(id, (err, results) => {
      if (err) {
         console.log(err);
         return res.send({
            message: "error in customer inventory history"
         })
      }
      if (!results) {
         return res.send({
            message: "no inventory history for this inventory yet"
         })
      }
      return res.send({
         data: results
      });
   })
}

export const CustomerMainscreen1Controller = (req, res) => {

}

export const CustomerMainscreen2Controller = (req, res) => {
   const id = req.params.id;
   const body = req.body;
   getSearchedLocations(body, (err, results) => {

      if (err) {
         console.log(err);
         return res.send({
            message: "error in getting searched locations"
         })
      }
      if (!results) {
         return res.send({
            message: "no warehouse available with your requirements"
         })
      }
      
      return res.send({
         data: results
      });
   })
}

export const CustomerWarehouseDetailsController = (req, res) => {
   const warehouseId = req.params.warehouseId;
   console.log(warehouseId);
   getCustomerWarehouseDetails(warehouseId, (err, results) => {
      if (err) {
         console.log(err);
         return res.send({
            message: "error in customer warehouse details"
         })
      }
      if (!results) {
         return res.send({
            message: "no warehouse available with this Id"
         })
      }


      getCutomerWarehouseImages(warehouseId,(err,result)=>{
         if(err){
            console.log(err);
            return res.send({
               message:"error in admin partner warehouse details"
            });
         }
         if(!results){
            return res.send({
               message:"no warehouse images yet"
            });
         }

         getCustomerSensorData(warehouseId,(err,sensorData)=>{
            if(err){
               console.log(err);
               return res.send({message:"error in customer sensor data"})
            }
            return res.send({
               data:{results,result,sensorData},
            })
         })
      })
   })
}

export const CustomerWarehouseSelectionController = (req, res) => {
   const body = req.body;
   console.log(req.body)
   const { id, warehouseId } = req.params;
   console.log(body);
   let warehouseName, partnerId;
   getWarehouseNameAndPartnerId(warehouseId, (err, results) => {
      if (err) {
         console.log(err);
         return res.send({
            message: "error in getting partnerId and warehouseName"
         })
      }
      if (!results) {
         return res.send({
            message: "no warehouse available with this Id"
         })
      }
      warehouseName = results[0].warehouse_name;
      partnerId = results[0].partner_id;

      placeOrderToWarehouse(body, id, warehouseId, warehouseName, partnerId, (err, results) => {
         if (err) {
            console.log(err);
            return res.send({
               message: "error in placing order"
            })
         }
         if (!results) {
            return res.send({
               message: "no warehouse available with this Id"
            })
         }
         return res.send({
            data: results
         });
      });


   })

}

export const CustomerPlaceorderController = (req, res) => {
   const body = req.body;
   const { id, warehouseId } = req.params;
   let warehouseName, partnerId;
   getWarehouseNameAndPartnerId(warehouseId, (err, results) => {
      if (err) {
         console.log(err);
         return res.send({
            message: "error in getting partnerId and warehouseName"
         })
      }
      if (!results) {
         return res.send({
            message: "no warehouse available with this Id"
         })
      }
      warehouseName = results[0].warehouse_name;
      partnerId = results[0].partner_id;

      placeOrderToWarehouse(body, id, warehouseId, warehouseName, partnerId, (err, results) => {
         console.log(body)
         if (err) {
            console.log(err);
            return res.send({
               message: "error in placing order"
            })
         }
         if (!results) {
            return res.send({
               message: "no warehouse available with this Id"
            })
         }
         return res.send({
            data: results
         });
      });


   })

}
export const CityDataController=(req,res)=>{
   getCityData((err,results)=>{
      if(err){
         console.log(err);
      }
      return res.send({
         data:results
      })
   })
}


export const CustomerProfileDetailsController=(req,res)=>{
   const {id}=req.params;
   console.log(req.params)
   getCustomerProfileDetails(id,(err,results)=>{
      if(err){
         console.log(err,"error in customer profile");
      }
      return res.send({
         data:results
      })

   })
}