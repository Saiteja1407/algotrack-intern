import {pool} from "../../config/db.js"

export const create=(data,callBack)=>{
      pool.query(
        // sql string or query
        `insert into customer(customer_name,customer_company_name,customer_designation,customer_mobile,customer_emailid,customer_password) values(?,?,?,?,?,?)`, //que marks=no.of fields in table to create
        [
            data.name,
            data.companyName,
            data.designation,
            data.phoneNumber,
            data.email,
            data.password
        ],
        (error,results,fields)=>{
            if(error){
                return callBack(error);
            }
            return callBack(null,results);
        }           
      );
   }

   export const checkCustomerByMobile = (body, callBack) => {
    pool.query(
        // SQL query
        `SELECT COUNT(*) > 0 AS user_exists
        FROM customer
        WHERE customer_mobile = ?`,
        [body.number],
        (error, results, fields) => {
            if (error) {
                return callBack(error);
            }
            return callBack(null, results);
        }
    );
};

export const checkCustomerByEmail=(body,callBack)=>{
  pool.query(
    `SELECT COUNT(*) > 0 AS user_exists
    FROM customer
    WHERE customer_emailid = ?`,
    [body.email],
    (error, results, fields) => {
        if (error) {
            return callBack(error);
        }
        return callBack(null, results);
    }
  );
}

//--------------   get customer details 
export const getCustomerByEmail=(body,callBack)=>{
    pool.query(
        `select customer_emailid,customer_password,customer_id from customer where customer_emailid=?`,
        [body.email],
        (err,results,fields)=>{
            if(err){
               return callBack(err);
            }
            return callBack(null,results);
        }
    );

}

export const verifyCustomerMobileOtp=()=>{}

export const CustomerOrdersDashboard=(id,callBack)=>{
    pool.query(
        `select * from order_details where customer_id=?`,
        [id],
        (err,results,fields)=>{
            if(err){
               return callBack(err);
            }
            return callBack(null,results);
        }
    );
}

export const getCustomerOrderDetails=(id,callBack)=> {
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


export const getCustomerInventoryDashboard=(id,callBack)=>{
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

export const getCustomerInventoryDetails=(id,callBack)=>{
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


export const getSearchedLocations=(body,callBack)=>{
    const storageType='available_dry_capacity';
    if(body.temperatureRange=='Frozen'){
        storageType='available_frozen_capacity'
    }
    else if(body.temperatureRange=='Chiller'){
      storageType='available_chiller_capacity'
    }
    pool.query(
        `select * from warehouse where city=? and warehouse_UOM=? and ?>=?`,
        [body.city,
         body.uom,
         storageType,
         body.numberOfUnits
        ],
        (err,results)=>{
            if(err){
                return callBack(err);
            }
            return callBack(null,results);
        }
    );
}


export const getCustomerWarehouseDetails=(warehouseId,callBack)=>{
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

export const placeOrderToWarehouse=(body,id,warehouseId,warehouseName,partnerId,callBack)=>{
   pool.query(
    `insert into order_details values(null,default,now(),STR_TO_DATE(?,'%m/%d/%Y'),NULL,NULL,?,?,?,?,?,?,?,?,?,?,?)`,
    [ body.selectedDate,
      warehouseId,
      warehouseName,
      id,
      body.productDetails,
      body.productType,
      body.temperatureRange,
      body.storageType,
      body.uom,
      body.numberOfUnits,
      body.duration,
      partnerId
    ],
    (err,results)=>{
        if(err){
            return callBack(err);
        }
        return callBack(null,results);
    }
   );
}

export const getWarehouseNameAndPartnerId=(warehouseId,callBack)=>{
   pool.query(
    `select warehouse_name,partner_id from warehouse where warehouse_id=?`,
    [warehouseId],
    (err,results)=>{
        if(err){
            return callBack(err);
        }
        return callBack(null,results);
    }
   );
}