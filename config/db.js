import {createPool} from 'mysql';

export const pool=createPool({
    host:'150.242.13.154',
    port:3306,
    user:"root",
    password:"kN553VnK8$s",
    database:"algotrack",
    connectionLimit:10
});                 
// console.log(process.env.DB_HOST);
pool.getConnection((err)=>{
    if(err){
        console.log(err)
    }
})