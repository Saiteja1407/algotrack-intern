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
        `select * from order_details `,
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

export const facilityOnboard=(body,adminId,partnerId,doc,callBack)=>{
   pool.query(
    `
    insert into warehouse values(null,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,1,1,1)`,
    [   
        body.warehouseName,
        body.frozenPrice,
        body.dryPrice,
        body.chillerPrice,
        body.UOM,
        body.totalFrozenCapacity,
        body.totalDryCapacity,
        body.totalChillerCapacity,
        body.availableFrozenCapacity,
        body.availableDryCapacity,
        body.availableChillerCapacity,
        doc,
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
export const saveImageToDatabase=(warehouseId,imageData,callBack)=>{
   
    pool.query(
        `insert into warehouse_images values (null,?,?)`,
        [
            warehouseId,
            imageData
        ],
        (err,results)=>{
            if(err){
                return callBack(err);
            }
            return callBack(null,results);
        }
    )
}
// export const addWarehouseImages = (warehouseId, files, callBack) => {
//     const values = files.map((file) => [warehouseId, file.buffer]);

//     pool.query(
//         'INSERT INTO warehouse_images (warehouse_id, warehouse_image) VALUES ?',
//         [values],
//         (err, results) => {
//             if (err) {
//                 return callBack(err);
//             }
//             return callBack(null, results);
//         }
//     );
// };
// Update the facilityOnboard function signature to accept files parameter
// export const facilityOnboard = (body, adminId, partnerId, files, callBack) => {
//     pool.query(
//         `
//         INSERT INTO warehouse values(null,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,1,1,1)`,
//         [   
//             body.warehouseName,
//             body.frozenPrice,
//             body.dryPrice,
//             body.chillerPrice,
//             body.UOM,
//             body.totalFrozenCapacity,
//             body.totalDryCapacity,
//             body.totalChillerCapacity,
//             body.availableFrozenCapacity,
//             body.availableDryCapacity,
//             body.availableChillerCapacity,
//             body.complianceDocuments,
//             partnerId,
//             adminId,
//             body.state,
//             body.city,
//             body.pincode,
//             body.area,
//         ],
//         (err, results) => {
//             if (err) {
//                 return callBack(err);
//             }
//             return callBack(null, results);
//         }
//     );
// };

// // Update the addWarehouseImages function signature to accept files parameter
// export const addWarehouseImages = (warehouseId, files, callBack) => {
//     const values = files.map((file) => [warehouseId, file.buffer]);
//     pool.query(
//         'INSERT INTO warehouse_images (warehouse_id, warehouse_image) VALUES ?',
//         [values],
//         (err, results) => {
//             if (err) {
//                 return callBack(err);
//             }
//             return callBack(null, results);
//         }
//     );
// };


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

export const getAdminWarehouseDetails=(warehouseId,callBack)=>{
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

export const updateAdminWarehouseDetails=(adminId,warehouseId,body,doc, callBack)=>{
    pool.query(
        `update warehouse set warehouse_name=?,warehouse_price_frozen=?,warehouse_price_dry=?,warehouse_price_chiller=?,warehouse_UOM=?,total_frozen_capacity=?,total_dry_capacity=?,total_chiller_capacity=?,available_frozen_capacity=?,available_dry_capacity=?,available_chiller_capacity=?,warehouse_license=?,admin_id=?,state=?,city=?,pincode=?,street=?,trading=1,sensors=1,transportation=1 where warehouse_id=?`,
        [body.warehouseName,
            body.frozenPrice,
            body.dryPrice,
            body.chillerPrice,
            body.UOM,
            body.totalFrozenCapacity,
            body.totalDryCapacity,
            body.totalChillerCapacity,
            body.availableFrozenCapacity,
            body.availableDryCapacity,
            body.availableChillerCapacity,
            doc,
            adminId,
            body.state,
            body.city,
            body.pincode,
            body.area,
        warehouseId],
        (err,results)=>{
            if(err){
                return callBack(err);
            }
            return callBack(null,results);
        }
    );
}

export const DeletePartner=(adminId,partnerId,callBack)=>{
    pool.query(
        `update partner set activity_status=0,admin_id=? where partner_id=?`,
        [adminId,partnerId],
        (err,results,fields)=>{
            if(err){
               return callBack(err);
            }
            return callBack(null,results);
        }
    );
}
export const getWarehouseImages=(warehouseId,callBack)=>{
    pool.query('select warehouse_images from warehouse_images where warehouse_id=?',[warehouseId],
    (err,results,feilds)=>{
        if(err){
           return callBack(err);
        }
        return callBack(null,results);
    });
};

export const getAdminSensorData=(warehouseId,callBack)=>{
    pool.query(
        `SELECT sd.sensor_id, sd.temp_data,s.sensor_warehouse_location FROM sensor_data sd
        JOIN sensors s ON sd.sensor_id = s.sensor_id
        WHERE s.warehouse_id = ?`,
     [warehouseId],
     (err,results)=>{
         if(err){
             return callBack(err);
         }
         return callBack(null,results);
     }
    )
 }


 export const updateWarehouseImages=(imgId,imgData,callBack)=>{
    pool.query(
        `update warehouse_images set warehouse_images=? where image_id=?`,
        [imgData,imgId],
        (err,results)=>{
            if(err){
                return callBack(err);
            }
            return callBack(null,results);
        }
    )
 }

export const getImageIdsByWarehouseId=(warehouseId,callBack)=>{
    pool.query(
        `select image_id from warehouse_images where warehouse_id=?`,
        [warehouseId],
        (err,results)=>{
            if(err){
                return callBack(err);
            }
            return callBack(null,results);
        }
    )
}