import { pool } from "../../config/db.js";

export const getAdminById=(body,callBack)=>{
    pool.query(
        `select admin_id,admin_password from company_admin where admin_id=?`,
        // `select customer_emailid,customer_password,customer_id from customer where customer_emailid=?`,
        [body.adminId],
        (err,results)=>{
            if(err){
                return callBack(err);
             }
             return callBack(null,results);
        }
    );
}

export const AdminOrdersDashboard=(id,callBack)=>{
    pool.query(
        `select * from order_details where admin_id=?`,
        [id],
        (err,results,fields)=>{
            if(err){
               return callBack(err);
            }
            return callBack(null,results);
        }
    );
}

export const getAdminOrderDetails=(id,callBack)=> {
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

export const updateOrderDetails=(id,status,callBack)=>{
    // const {id,status}=obj;
    pool.query(
        `update order_details set order_status=? where order_id=?`,
        [status,id],
        (err,results,fields)=>{
            if(err){
                return callBack(err);
             }
             return callBack(null,results);
         }
    );
}


export const CustomerManagement=(callBack)=>{
    pool.query(
        `select * from customer where verification_status=1`,
        [],
        (err,results,fields)=>{
            if(err){
               return callBack(err);
            }
            return callBack(null,results);
        }
    );
}

export const DeleteCustomer=(customerId,callBack)=>{
    pool.query(
        `delete from customer where customer_id=?`,
        [customerId],
        (err,results,fields)=>{
            if(err){
               return callBack(err);
            }
            return callBack(null,results);
        }
    );
}

export const CustomerVerification=(callBack)=>{
    pool.query(
        `select * from customer where verification_status=0`,
        [],
        (err,results,fields)=>{
            if(err){
               return callBack(err);
            }
            return callBack(null,results);
        }
    );
}

export const VerifyCustomer=(body,callBack)=>{
    const id=body.CustomerId;
    const name=body.name;
    if(name=="verify"){
        pool.query(
            `update customer set verification_status=1 where customer_id=?`,
            [id],
            (err,results,fields)=>{
                if(err){
                    return callBack(err);
                 }
                 return callBack(null,results);
            }
          );
    }
    else{
        pool.query(
            `update customer set active_status=0 where customer_id=?`,
            [id],
            (err,results,fields)=>{
                if(err){
                    return callBack(err);
                 }
                 return callBack(null,results);
            }
          );
    }
  
}