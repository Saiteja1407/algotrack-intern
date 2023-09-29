import {AdminOrdersDashboard, CustomerManagement, CustomerVerification, DeleteCustomer, VerifyCustomer, getAdminById, getAdminOrderDetails, updateOrderDetails} from './admin.services.js'
import { compareSync } from 'bcrypt';
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
    const id=req.params.id;
    console.log(id);
    getAdminOrderDetails(id,(err,results)=>{
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
       const id=req.params.id;
       const status=req.body.status;
    //    const obj={id, status}
       updateOrderDetails(id,status,(err,results)=>{
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
   const customerId=req.params.id;
   DeleteCustomer(customerId,(err,results)=>{
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
   console.log(body)
   VerifyCustomer(body,(err,results)=>{
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