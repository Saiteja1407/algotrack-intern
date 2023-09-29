import {pool} from "../../config/db.js"

export const getPartnerById=(body,callBack)=>{
    pool.query(
        `select partner_id,spoc_password from partner where partner_id=?`,
        // `select customer_emailid,customer_password,customer_id from customer where customer_emailid=?`,
        [body.partnerId],
        (err,results)=>{
            if(err){
                return callBack(err);
             }
             return callBack(null,results);
        }
    );
}

export const PartnerOrdersDashboard=(id,callBack)=>{
    pool.query(
        `select * from order_details where partner_id=?`,
        [id],
        (err,results,fields)=>{
            if(err){
               return callBack(err);
            }
            return callBack(null,results);
        }
    );
}


export const getPartnerOrderDetails=(id,callBack)=> {
    pool.query(
        `select * from order_details where order_id=?`,
        [id],
        (err,results,fields)=>{
            if(err){
               return callBack(err);
            }
            return callBack(null,results);
        }
    );
}

export const getPartnerInventoryDashboard=(id,callBack)=>{
    pool.query(
        `select * from inventory_details where order_id=?`,
        [id],
        (err,results,fields)=>{
            if(err){
               return callBack(err);
            }
            return callBack(null,results);
        }
    )
}

export const getPartnerInventoryHistoryDetails=(id,callBack)=>{
    pool.query(
        `select * from inventory_history where inventory_id=?`,
        [id],
        (err,results,fields)=>{
            if(err){
               return callBack(err);
            }
            return callBack(null,results);
        }
    )
}



export const getPartnerInventoryDetails=(id,callBack)=>{
    pool.query(
        `select * from inventory_details where inventory_id=?`,
        [id],
        (err,results,fields)=>{
            if(err){
               return callBack(err);
            }
            console.log(results)
            return callBack(null,results);
        }
    )
}


export const createInventoryHistory=(inventoryId,body,callBack)=>{
   pool.query(
    `insert into inventory_history(dispatched_date_time,dispatched_units,inventory_id) values(?,?,?)`,
    [body.dispatchedDateTime,
     body.unitsDispatched,
     inventoryId
     ],
     (error,results,fields)=>{
        if(error){
            return callBack(error);
        }
        return callBack(null,results);
    } 
   );
}