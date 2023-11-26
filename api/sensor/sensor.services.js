import { pool } from "../../config/db.js "

export const checkSensor=(sensorId,callBack)=>{
    pool.query(
        `select sensor_id from sensor_data where sensor_id=?`,
        [sensorId],
        (err,results)=>{
            if(err){
                console.log(err);
                return callBack(err);
            }
            //console.log(results);
            return callBack(null,results);
        }
    )
}