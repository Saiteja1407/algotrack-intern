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
    `insert into Inventory_history values
    (null,now(),?,?,(SELECT balance_inventory_units FROM Inventory_details WHERE inventory_id = ?),null);`,
    [
     body.unitsDispatched,
     inventoryId,
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

export const updateUnitsAfterDispatch=(callBack)=>{
    pool.query(
        `UPDATE Inventory_history AS ih
        JOIN (
        SELECT ih_sub.inventory_id, MAX(ih_sub.dispatched_date_time) AS max_dispatched_date_time
        FROM Inventory_history AS ih_sub
        GROUP BY ih_sub.inventory_id
        ) AS max_dates ON ih.inventory_id = max_dates.inventory_id AND ih.dispatched_date_time = max_dates.max_dispatched_date_time
        JOIN inventory_details AS id ON ih.inventory_id = id.inventory_id
        SET ih.units_after_dispatch = (id.balance_inventory_units - ih.dispatched_units)`,
        [],
        (err,results)=>{
            if(err){
                return callBack(err);
            }
            else{
               return callBack(null,results);
            }
        }
    )
}


export const updateBalanceInventoryUnits=(callBack)=>{
    pool.query(
        `UPDATE Inventory_details as id, Inventory_history as ih
        set id.balance_inventory_units=id.total_inventory_units-ifnull((select sum(dispatched_units) from Inventory_history as ih where  ih.inventory_id=id.inventory_id),0)
        where id.inventory_id=ih.inventory_id;`,
        [],
        (err,results)=>{
            if(err){
                return callBack(err);
            }
            return callBack(null,results);
        }
    )
}

export const  getOrderIdUsingInventoryId=(inventoryId,callBack)=>{
    pool.query(`select order_id from inventory_details where inventory_id=?`,
    [inventoryId],
    (err,results)=>{
        if(err){
            return callBack(err);
        }
        //console.log(results[0].order_id);
        return callBack(null,results);
    }
    )
}
export const createInventory=(body,callBack)=>{
    pool.query(
        `INSERT INTO Inventory_details (
            inventory_temp_data,
            total_inventory_units,
            balance_inventory_units,
            batch_number,
            inventory_arrived_date_time,
            ageing,
            space_remaining_order,
            order_id
            )
          VALUES (null,?,?,?,?,0,null,?   );`,
        [body.productUnits,
        body.productUnits,
        body.batchNumber,
        body.arrivedDateTime,
        body.orderId],
        (err,results)=>{
            if(err){
                return callBack(err);
            }
            return callBack(null,results);
        }
    )
}
export const updateAgeing=()=>{
    pool.query(
        `UPDATE Inventory_details
        SET ageing = CAST(TIMESTAMPDIFF(DAY, inventory_arrived_date_time, NOW()) AS SIGNED)`,
        [],
        (err,results)=>{
            if(err){
                console.log(err);
            }
            else{
                console.log(results)
            }
        }
    )
}
export const updateSpaceRemainingForOrder=(orderId,callBack)=>{
    pool.query(
        `UPDATE Inventory_details AS t1
           JOIN (
           SELECT
           o.order_id,
           (o.product_units - IFNULL(SUM(i.balance_inventory_units), 0)) AS new_space_remaining_order
           FROM order_details AS o
           LEFT JOIN Inventory_details AS i ON o.order_id = i.order_id
		   WHERE o.order_id = ?
           GROUP BY o.order_id
           ) AS subquery ON t1.order_id = subquery.order_id
      SET t1.space_remaining_order = subquery.new_space_remaining_order
      WHERE t1.order_id = ?`,
        [orderId,
        orderId],
        (err,results)=>{
            if(err){
               return callBack(err);
            }
            return  callBack(results);
        }
    )
}

export const getPartnerWarehouses=(id,callBack)=>{
    pool.query(
        `select * from warehouse where partner_id=?`,
        [id],
        (err,results)=>{
            if(err){
                return callBack(err);
            }
            return callBack(null,results);
        }
    );
}

export const getPartnerWarehouseDetails=(warehouseId,callBack)=>{
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

export const getPartnerWarehouseImages=(warehouseId,callBack)=>{
    pool.query('select warehouse_images from warehouse_images where warehouse_id=?',[warehouseId],
    (err,results,feilds)=>{
        if(err){
           return callBack(err);
        }
        return callBack(null,results);
    });
};
export const updateWarehouseSpace=(body,warehouseId,callBack)=>{
   pool.query(`update warehouse set available_frozen_capacity=?,available_dry_capacity=?,available_chiller_capacity=? where warehouse_id=?`,
   [body.frozenSpace,body.drySpace,body.chillerSpace,warehouseId],
   (err,results,feilds)=>{
    if(err){
        return callBack(err);
    }
    return callBack(null,results)
   }
   )
};

export const getSensorData=(warehouseId,callBack)=>{
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
export const getPartnerProfileDetails=(partnerId,callBack)=>{
    pool.query(
        `select * from partner where partner_id=?`,
        [partnerId],
        (err,results)=>{
            if(err){
                return callBack(err);
            }
            //console.log(results);
            return callBack(null,results);
        }
    )
 }