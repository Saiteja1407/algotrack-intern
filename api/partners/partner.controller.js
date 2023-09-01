import { genSaltSync, hashSync,compareSync } from "bcrypt";
import { getPartnerById,PartnerOrdersDashboard } from "./partner.services.js";
import { pool } from "../../config/db.js";

export const partnerLoginController=(req,res)=>{
    const body=req.body;
    const salt=genSaltSync(10);
    body.password=hashSync(body.password,salt);
    
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
        console.log(body.password)
        if(result){
         return res.send({message:"partner login is successful"});
        }
        return res.send({
         message:"incorrect partnerId or password"
        })
    })

}


export const partnerMainscreenController=(req,res)=>{
    PartnerOrdersDashboard((err,results)=>{
        if(err){
           console.log(err);
           return res.send({
              message:"error in partner orders dashboard"
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