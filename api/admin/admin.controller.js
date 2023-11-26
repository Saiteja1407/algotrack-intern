import {AdminOrdersDashboard, CustomerManagement, CustomerVerification, DeleteCustomer, VerifyCustomer,
   getPartners, facilityOnboard, getAdminById, getAdminOrderDetails, partnerOnboard, updateOrderDetails, getAdminPartnerWarehouses, getAdminWarehouseDetails, updateAdminWarehouseDetails, DeletePartner,saveImageToDatabase, getWarehouseImages, getAdminSensorData, updateWarehouseImages} from './admin.services.js'
import {  compareSync, genSaltSync, hashSync } from 'bcrypt';
import  Jwt from 'jsonwebtoken';
import multer from 'multer';

// Set up multer storage
const storage = multer.memoryStorage(); // This stores the files in memory
const upload = multer({ storage: storage });
export const adminLoginController = (req, res) => {
    const body = req.body;

    getAdminById(body, (err, results) => {
        if (err) {
            console.log(err);
            return res.send({
                message: "error in admin login"
            })
        }
        if (!(results.length)) {
            return res.status(403).send({
                message: "you are not registered as admin, please sign up if you are a customer"
            })
        }


        const result = compareSync(body.password, results[0].admin_password);
        
        if (result) {
         const user={
            id: results[0].admin_id,
            role:'admin'
         }
         // generation of cookie
         const token = Jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '2h' });
         res.cookie('token', token, { httpOnly: true,withCredentials:true });
            return res.send({
                message: "admin login is successful",
                data: results[0].admin_id
            });
        }
        return res.status(402).send({
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
   const image1 = req.files['facilityImages1'][0];
    const image2 = req.files['facilityImages2'][0];
    const image3 = req.files['facilityImages3'][0];
    const document = req.files['complianceDocuments'][0];
    const imgData1=image1.buffer;
    const imgData2=image2.buffer;
    const imgData3=image3.buffer;
    const docData=document.buffer;
    console.log(docData);
   // console.log(body.facilityImages1,body.facilityImages2,body.facilityImages3,body.complianceDocuments);
   facilityOnboard(body,id,partnerId,docData,(err,results)=>{
      if(err){
         console.log(err);
         return res.send({
            message:"error in facility Onboarding"
         });
      }
      var data={results}
      const facilityId = results.insertId;
      // Save images to the database
    saveImageToDatabase(facilityId, imgData1, (err, result1) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: "Error in facility images 1" });
      }

      saveImageToDatabase(facilityId, imgData2, (err, result2) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ message: "Error in facility images 2" });
        }

        saveImageToDatabase(facilityId, imgData3, (err, result3) => {
          if (err) {
            console.log(err);
            return res.status(500).json({ message: "Error in facility images 3" });
          }

          // Combine results and send the response
          const data = {
            facility: results,
            image1: result1,
            image2: result2,
            image3: result3,
          };

          return res.status(200).json({ data });
        });
      });
    });
  });
};
   

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
   const warehouseId=req.params.warehouseId;
   console.log(warehouseId);
   getAdminWarehouseDetails(warehouseId,(err,results)=>{
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
      getWarehouseImages(warehouseId,(err,result)=>{
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
         getAdminSensorData(warehouseId,(err,sensorData)=>{
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

export const adminUpdateWarehouseDetailsController=(req,res)=>{
     const {id,warehouseId}=req.params;
     const body=req.body;
     console.log(body);
     const image1 = req.files['facilityImages1'][0];
     const image2 = req.files['facilityImages2'][0];
     const image3 = req.files['facilityImages3'][0];
     const document = req.files['complianceDocuments'][0];
     const imgData1=image1.buffer;
     const imgData2=image2.buffer;
     const imgData3=image3.buffer;
     const docData=document.buffer;
     updateAdminWarehouseDetails(id,warehouseId,body,docData,(err,results)=>{
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
      // Save images to the database
      getImageIdsByWarehouseId(warehouseId,(err,results)=>{
         if(err){
            console.log(err,"error in getting img Ids from warehouseId")
         }
         console.log(results);
         updateWarehouseImages(imgId1, imgData1, (err, result1) => {
            if (err) {
              console.log(err);
              return res.status(500).json({ message: "Error in facility images 1" });
            }
      
            updateWarehouseImages(imgId2, imgData2, (err, result2) => {
              if (err) {
                console.log(err);
                return res.status(500).json({ message: "Error in facility images 2" });
              }
      
              updateWarehouseImages(imgId3, imgData3, (err, result3) => {
                if (err) {
                  console.log(err);
                  return res.status(500).json({ message: "Error in facility images 3" });
                }
      
                // Combine results and send the response
                const data = {
                  facility: results,
                  image1: result1,
                  image2: result2,
                  image3: result3,
                };
      
                return res.status(200).json({ data });
              });
            });
          });
      })
   
     })
}

export const deletePartnerController=(req,res)=>{
   const {id,partnerId}=req.params;
   DeletePartner(id,partnerId,(err,results)=>{
      if(err){
          console.log(err);
          return res.send({
             message:"error in deleting partner entry"
          })
       }
       if(!results){
          return res.send({
             message:"no partner present with this id"
          })
       }
       return res.send({
          data:results
       });
     })
}