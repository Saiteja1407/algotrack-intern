import {AdminOrdersDashboard, CustomerManagement, CustomerVerification, DeleteCustomer, VerifyCustomer,
   getPartners, facilityOnboard, getAdminById, getAdminOrderDetails, partnerOnboard, updateOrderDetails, getAdminPartnerWarehouses, getAdminWarehouseDetails, updateAdminWarehouseDetails} from './admin.services.js'
import {  compareSync, genSaltSync, hashSync } from 'bcrypt';
export const adminLoginController = (req, res) => {
    const body = req.body;

    getAdminById(body, (err, results) => {
        if (err) {
            console.log(err);
            return res.send({
                message: "error in admin login"
            })
        }
        if (!results) {
            return res.send({
                message: "you are not registered as admin, please sign up if you are a customer"
            })
        }

        const result = compareSync(body.password, results[0].admin_password);

        if (result) {
            return res.send({
                message: "admin login is successful",
                data: results[0].admin_id
            });
        }
        return res.send({
            message: "incorrect adminId or password"
        })
    })
}

export const adminOrdersDashboardController=(req,res)=>{
    const id=req.params.id;
    AdminOrdersDashboard(id,(err,results)=>{
       if(err){
          console.log(err);
          return res.send({
             message:"error in admin orders dashboard"
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

 export const adminOrderDetailsController=(req,res)=>{
    const {id,orderId}=req.params;
    console.log(orderId);
    getAdminOrderDetails(orderId,(err,results)=>{
      if(err){
         console.log(err);
         return res.send({
            message:"error in admin order details"
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


 export const updateOrderDetailsController=(req,res)=>{
       const {id,orderId}=req.params;
       console.log(orderId);
       const status=req.body.status;
    //    const obj={id, status}
       updateOrderDetails(id,orderId,status,(err,results)=>{
        if(err){
            console.log(err);
            return res.send({
               message:"error in updating order status"
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



 export const customerManagementController=(req,res)=>{
   CustomerManagement((err,results)=>{
      if(err){
         console.log(err);
         return res.send({
            message:"error in admin customer management screen"
         });
      }
      if(!results){
         return res.send({
            message:"no verified customers yet"
         });
      }
      return res.send({
         data:results,
      })
   })
}

export const deleteCustomerController=(req,res)=>{
   const {id,customerId}=req.params;
   DeleteCustomer(id,customerId,(err,results)=>{
      if(err){
          console.log(err);
          return res.send({
             message:"error in deleting customer entry"
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

export const customerVerificationController=(req,res)=>{
   CustomerVerification((err,results)=>{
      if(err){
         console.log(err);
         return res.send({
            message:"error in admin customer verification screen"
         });
      }
      if(!results){
         return res.send({
            message:"no un-verified customers yet"
         });
      }
      return res.send({
         data:results,
      })
   })
}

export const verifyCustomerController=(req,res)=>{
   const body=req.body;
   const adminId=req.params.id;
   console.log(body)
   VerifyCustomer(body,adminId,(err,results)=>{
      if(err){
         console.log(err);
         return res.send({
            message:"error in changing customer to verified"
         });
      }
      return res.send({
         data:results,
      })
   })
}

export const partnerOnboardingController=(req,res)=>{
   const adminId=req.params.id;
   const body=req.body;
   const salt=genSaltSync(10);
   body.password=hashSync(body.password,salt);
   partnerOnboard(body,adminId,(err,results)=>{
      if(err){
         console.log(err);
         return res.send({
            message:"error in partnerOnboarding"
         });
      }
      return res.send({
         data:results.insertId,
      })
   })
}

export const facilityOnboardingController=(req,res)=>{
   const {id,partnerId}=req.params;
   const body=req.body;
   console.log(body);
   facilityOnboard(body,id,partnerId,(err,results)=>{
      if(err){
         console.log(err);
         return res.send({
            message:"error in facility Onboarding"
         });
      }
      return res.send({
         data:results,
      })
   })
}

export const partnerManagementController=(req,res)=>{
   const {id}=req.params;
   getPartners(id,(err,results)=>{
      if(err){
         console.log(err);
         return res.send({
            message:"error in admin partner management"
         });
      }
      if(!results){
         return res.send({
            message:"no partners yet"
         });
      }
      return res.send({
         data:results,
      })
   })
}

export const adminWarehousesController=(req,res)=>{
   const {id,partnerId}=req.params;
   getAdminPartnerWarehouses(id,partnerId,(err,results)=>{
      if(err){
         console.log(err);
         return res.send({
            message:"error in admin partner warehouses"
         });
      }
      if(!results){
         return res.send({
            message:"no partner's warehouses yet"
         });
      }
      return res.send({
         data:results,
      })
   })
}

export const adminWarehouseDetailsController=(req,res)=>{
   const {id,partnerId,warehouseId}=req.params;
   getAdminWarehouseDetails(id,partnerId,warehouseId,(err,results)=>{
      if(err){
         console.log(err);
         return res.send({
            message:"error in admin partner warehouse details"
         });
      }
      if(!results){
         return res.send({
            message:"no warehouse with this Id yet"
         });
      }
      return res.send({
         data:results,
      })
   })
}

export const adminUpdateWarehouseDetailsController=(req,res)=>{
     const {id,warehouseId}=req.params;
     const body=req.body;
     console.log(body);
     updateAdminWarehouseDetails(id,warehouseId,body,(err,results)=>{
      if(err){
         console.log(err);
         return res.send({
            message:"error in admin update warehouse details"
         });
      }
      if(!results){
         return res.send({
            message:"no warehouse with this Id yet"
         });
      }
      return res.send({
         data:results,
      })
     })
}