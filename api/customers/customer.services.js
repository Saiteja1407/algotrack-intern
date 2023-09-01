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