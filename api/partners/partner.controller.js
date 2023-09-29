import { genSaltSync, hashSync,compareSync } from "bcrypt";
import { getPartnerById,PartnerOrdersDashboard,
getPartnerOrderDetails,getPartnerInventoryDashboard,getPartnerInventoryDetails,getPartnerInventoryHistoryDetails, createInventoryHistory } from "./partner.services.js";


export const partnerLoginController=(req,res)=>{
    const body=req.body;
    
    getPartnerById(body,(err,results)=>{
        if(err){
            console.log(err);
            return res.send({
               message:"error in parnter login"
            })
         }
         if(!results){
            return res.send({
               message:"you are not registered as partner, please sign up if you are a customer"
            })
         }
         console.log(results[0].spoc_password);
         
        const result=compareSync(body.password,results[0].spoc_password);
        
        if(result){
         return res.send({message:"partner login is successful",
                       data:results[0].partner_id
       });
        }
        return res.send({
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
   const id=req.params.id;
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
   const id=req.params.id;
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
   const id=req.params.id;
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
   const id=req.params.id;
   console.log(id)
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



export const partnerInventoryHistoryCreationController=(req,res)=>{
   const body=req.body;
   const inventoryId=req.params.id;
   createInventoryHistory(inventoryId,body,(err,results)=>{
      if(err){
         console.log(err);
         return res.send({
             message:"error in inventory history creation",
         });
       }
       return res.send({
          data:results,
          message:"inventory history created successfully"
       });
   })
   

}