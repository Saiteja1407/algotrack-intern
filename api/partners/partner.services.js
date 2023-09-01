import {pool} from "../../config/db.js"

export const getPartnerById=(body,callBack)=>{
    pool.query(
        `select partner_id,spoc_password from partner where partner_id=?`,
        [body.id],
        (err,results)=>{
            if(err){
                return callBack(err);
             }
             return callBack(null,results);
        }
    );
}

export const PartnerOrdersDashboard=(callBack)=>{
    pool.query(
        `select * from order_details where partner_id=?`,
        [],
        (err,results,fields)=>{
            if(err){
               return callBack(err);
            }
            return callBack(null,results);
        }
    );
}