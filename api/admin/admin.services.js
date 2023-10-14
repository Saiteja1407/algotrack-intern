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

export const updateOrderDetails=(id,orderId,status,callBack)=>{
    // const {id,status}=obj;
    pool.query(
        `update order_details set order_status=? ,admin_id=? where order_id=?`,
        [status,id,orderId],
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
        `select * from customer where verification_status=1 and activity_status=1`,
        [],
        (err,results,fields)=>{
            if(err){
               return callBack(err);
            }
            return callBack(null,results);
        }
    );
}

export const DeleteCustomer=(adminId,customerId,callBack)=>{
    pool.query(
        `update customer set activity_status=0,admin_id=? where customer_id=?`,
        [adminId,customerId],
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
        `select * from customer where verification_status=0 and activity_status=1`,
        [],
        (err,results,fields)=>{
            if(err){
               return callBack(err);
            }
            return callBack(null,results);
        }
    );
}

export const VerifyCustomer=(body,adminId,callBack)=>{
    const id=body.CustomerId;
    const name=body.name;
    console.log(name);
    if(name=="verify"){
        pool.query(
            `update customer set verification_status=1,admin_id=? where customer_id=?`,
            [adminId,id],
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
            `update customer set activity_status=0 where customer_id=?`,
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


export const partnerOnboard=(body,adminId,callBack)=>{
  pool.query(
    `insert into partner values(?,?,?,?,?,?,?,?,?,?,?,?)`,
    [body.partnerID,
        body.spocName,
        body.spocPhoneNumber,
        body.companyName,
        body.spocDesignation,
        body.password,
        body.spocEmail,
        body.escalationName,
        body.escalationPhoneNumber,
        body.escalationDesignation,
        body.escalationEmail,
        adminId
        ],
    (err,results)=>{
        if(err){
            return callBack(err);
        }
        return callBack(null,results);
    }
  );
}

export const facilityOnboard=(body,adminId,partnerId,callBack)=>{
   pool.query(
    `
    insert into warehouse values(null,null,null,null,?,?,?,?,?,?,?,?,?,?,?,?,?,?,1,1,1)`,
    [
        body.UOM,
        body.totalFrozenCapacity,
        body.totalDryCapacity,
        body.totalChillerCapacity,
        body.availableFrozenCapacity,
        body.availableDryCapacity,
        body.availableChillerCapacity,
        body.complianceDocuments,
        partnerId,
        adminId,
        body.state,
        body.city,
        body.pincode,
        body.area,
    ],
    (err,results)=>{
        if(err){
            return callBack(err);
        }
        return callBack(null,results);
    }
   );
}


export const getPartners=(adminId,callBack)=>{
    pool.query(
        `select * from partner`,
        [],
        (err,results)=>{
            if(err){
                return callBack(err);
            }
            return callBack(null,results);
        }
    );
}


export const getAdminPartnerWarehouses=(adminId,partnerId,callBack)=>{
    pool.query(
        `select * from warehouse where partner_id=?`,
        [partnerId],
        (err,results)=>{
            if(err){
                return callBack(err);
            }
            return callBack(null,results);
        }
    );
}

export const getAdminWarehouseDetails=(adminId,partnerId,warehouseId,callBack)=>{
    pool.query(
        `select * from warehouse where warehouse_id=?`,
        [warehouseId],
        (err,results)=>{
            if(err){
                return callBack(err);
            }
            return callBack(null,results);
        }
    );
}

export const updateAdminWarehouseDetails=(adminId,warehouseId,body, callBack)=>{
    pool.query(
        ``,
        [],
        (err,results)=>{
            if(err){
                return callBack(err);
            }
            return callBack(null,results);
        }
    );
}