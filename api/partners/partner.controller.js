import { genSaltSync, hashSync,compareSync, genSalt } from "bcrypt";
import { getPartnerById,PartnerOrdersDashboard,
getPartnerOrderDetails,getPartnerInventoryDashboard,getPartnerInventoryDetails,getPartnerInventoryHistoryDetails, createInventoryHistory, getPartnerWarehouses, getPartnerWarehouseDetails, createInventory, updateAgeing, updateSpaceRemainingForOrder, updateUnitsAfterDispatch, updateBalanceInventoryUnits, getOrderIdUsingInventoryId, getPartnerWarehouseImages, getSensorData, updateWarehouseSpace, getPartnerProfileDetails } from "./partner.services.js";
import  Jwt  from "jsonwebtoken";
export const partnerLoginController=(req,res)=>{
    const body=req.body;
    
    getPartnerById(body,(err,results)=>{
        if(err){
            console.log(err);
            return res.send({
               message:"error in parnter login"
            })
         }
         if(!results.length){
            return res.status(403).send({
               message:"you are not registered as partner, please sign up if you are a customer"
            })
         }
        console.log(results[0].spoc_password);
      
        const result=compareSync(body.password,results[0].spoc_password);

        if(result){
         console.log(result);
         const user={
            id:results[0].partner_id,
            role:'partner',
         }
         const token = Jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '2h' });
         console.log(token)
         res.cookie('token', token, { httpOnly: true,withCredentials:true });
         return res.send({message:"partner login is successful",
                       data:results[0].partner_id
       });
        }
        return res.status(402).send({
         message:"incorrect partnerId or password"
        })
    })

}


export const partnerMainscreenController=(req,res)=>{
   const id=req.params.id;
    PartnerOrdersDashboard(id,(err,results)=>{
        if(err){
           console.log(err);
           return res.send({
              message:"error in partner orders dashboard"
           });
        }
        if(!results){
           return res.send({
              message:"no orders placed for your warehouses yet"
           });
        }
        return res.send({
           data:results,
        })
     })
}

export const partnerOrderDetailsController=(req,res)=>{
   const id=req.params.orderId;
   console.log(id);
   getPartnerOrderDetails(id,(err,results)=>{
     if(err){
        console.log(err);
        return res.send({
           message:"error in partner order details"
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


export const partnerInventoryDashboardController=(req,res)=>{
   const id=req.params.orderId;
   getPartnerInventoryDashboard(id,(err,results)=>{
      if(err){
         console.log(err);
         return res.send({
            message:"error in partner inventory dashboard"
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

export const partnerInventoryHistoryController=(req,res)=>{
   const id=req.params.inventoryId;
   getPartnerInventoryHistoryDetails(id,(err,results)=>{
      if(err){
         console.log(err);
         return res.send({
            message:"error in partner inventory history"
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

export const partnerInventoryDetailsController=(req,res)=>{
   const id=req.params.inventoryId;
   getPartnerInventoryDetails(id,(err,results)=>{
      if(err){
         console.log(err);
         return res.send({
            message:"error in partner update inventory history"
         })
      }
      if(!results){
         return res.send({
            message:"no inventory with this inventory_id"
         })
      }
      return res.send({
         data:results
      });
   })
}

setInterval(() => {
   updateAgeing();
}, 86400000);

export const partnerInventoryHistoryCreationController=(req,res)=>{
   const body=req.body;
   const inventoryId=req.params.inventoryId;
   createInventoryHistory(inventoryId,body,(err,results)=>{
      if(err){
         console.log(err);
         return res.send({
             message:"error in inventory history creation",
         });
       }
       let orderId=null;
       getOrderIdUsingInventoryId(inventoryId,(err,result)=>{
         if(err){
            console.log(err);
         }
         else{
          updateUnitsAfterDispatch((err,results)=>{
            if(err){
               console.log(err)
            }
            else{
               //console.log(results);
               orderId=result[0].order_id;
               console.log(orderId);
               updateBalanceInventoryUnits((err,resultss)=>{
                  if(err){
                     console.log(err);
                  }
                  else{
                     //console.log(resultss);
                     updateSpaceRemainingForOrder(orderId,(err,results)=>{
                        if(err){
                           console.log(err);
                         }
                         else{
                           console.log(results);
                         }
                      })
                  }
               });
            }
          });
           
         }
       })
      
       
       //updateSpaceForRemainingOrder(orderId);
       

       return res.send({
          data:results,
          message:"inventory history created successfully"
       });
   })
   

}

export const partnerWarehousesController=(req,res)=>{
   const {id}=req.params;
   getPartnerWarehouses(id,(err,results)=>{
      if(err){
         console.log(err);
         return res.send({
             message:"error in partner warehouses",
         });
       }
       return res.send({
          data:results,
          message:"partner warehouses fetched successfully"
       });

   })
}

export const PartnerWarehouseDetailsController=(req,res)=>{
   const {id,warehouseId}=req.params;
   getPartnerWarehouseDetails(warehouseId,(err,results)=>{
      if(err){
         console.log(err);
         return res.send({
             message:"error in partner warehouse details",
         });
       }

       getPartnerWarehouseImages(warehouseId,(err,result)=>{
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

         getSensorData(warehouseId,(err,sensorData)=>{
            if(err){
               console.log(err);
               return res.send({message:"error in partner sensor data"})
            }
            return res.send({
               data:{results,result,sensorData},
            })
         })
        
      })
   })
}

export const partnerInventoryCreationController=(req,res)=>{
   const body=req.body;
   console.log(body);
   createInventory(body,(err,results)=>{
      if(err){
         console.log(err);
         return res.send({
             message:"error in inventory creation",
         });
       }
       updateSpaceRemainingForOrder(body.orderId,(err,result)=>{
         if(err){
            console.log(err);
          }
          else{
            console.log(result);
          }
       })
       return res.send({
          data:results,
          message:"inventory  created successfully"
       });
   })
}
export const updateSpaceWarehouse=(req,res)=>{
   const warehouseId=req.params.warehouseId;
   const body=req.body;
   updateWarehouseSpace(body,warehouseId,(err,result)=>{
      if(err){
         console.log(err);
         return res.send({
             message:"error in space updation",
         });
       }
       return res.send({
          data:result,
          message:"partner warehouses space has been updated successfully"
       });
   })
}
export const PartnerProfileDetailsController=(req,res)=>{
   const {id}=req.params;
   getPartnerProfileDetails(id,(err,results)=>{
      if(err){
         console.log(err,"error in customer profile");
      }
      return res.send({
         data:results
      })

   })
}