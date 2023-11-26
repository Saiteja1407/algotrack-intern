import {createPool} from 'mysql';
import dotenv from "dotenv";
dotenv.config()

export const pool=createPool({
    host:process.env.DB_HOST,
    port:process.envDB_PORT,
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database:process.env.MYSQL_DB,
    connectionLimit:10
});                 
// console.log(process.env.DB_HOST);
pool.getConnection((err)=>{
    if(err){
        console.log(err)
    }
})