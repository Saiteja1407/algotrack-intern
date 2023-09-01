import {createPool} from 'mysql';

export const pool=createPool({
    host:"localhost",
    port:3306,
    user:"root",
    password:"famousDB",
    database:"algotrack",
    connectionLimit:10
});                 
// console.log(process.env.DB_HOST);
pool.getConnection((err)=>{
    if(err){
        console.log(err)
    }
})