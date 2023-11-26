import dotenv from 'dotenv';
dotenv.config();
import  express from'express';
 import colors from 'colors';
//configure dotenv
import morgan from 'morgan';
import cors from 'cors';
import mysqlRouter from './api/customers/customer.routes.js';
import partnerRouter from './api/partners/partner.routes.js';
import adminRouter from './api/admin/admin.routes.js';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import request from 'request';
import { pool } from './config/db.js';
import { checkSensor } from './api/sensor/sensor.services.js';

//database connection --------------

const app=express();

//middlewares
app.use(session({
    secret: process.env.JWT_SECRET,
    resave:false,
    saveUninitialized:true,
    cookie:{secure:false},
}))
app.use(cookieParser());
app.use(cors({
    origin:'http://localhost:3000',
    credentials:true,
}));
app.use(express.json());
app.use(morgan('dev'));

//routes
// app.use('/',authRoutes);
app.use('/',mysqlRouter);
app.use('/',partnerRouter);
app.use('/',adminRouter)

//rest api
app.get('/',(req,res)=>{
     res.send({
        msg:"welcome",
     });
});
app.get('/logout', (req, res) => {
    
    try {
        // Clear the "token" cookie by setting its value to null and expiring it
        res.clearCookie('token');
        // Perform any additional logout logic, such as clearing the user's session
        // You may want to destroy the session if it's used for authentication
        req.session.destroy((err) => {
            if (err) {
                console.error('Error destroying session:', err);
            }
            res.status(200).json({ message: 'Logout successful' });
        });
    } catch (error) {
        console.error('Error clearing token cookie:', error);
        res.status(400).json({ message: 'Logout failed' });
    }
});


// //port
const PORT=process.env.PORT;

// //sensor api
const apiEndpoint=process.env.API_END_POINT;

// //function to call API and get temperature details
const getTemperatureDetails = async () => {
    const options = {
        uri: apiEndpoint,
        method: 'GET',
        json: true, // Automatically parses the JSON response
    };
    request(options, (error, response, body) => {
        if (error) {
            console.error(error);
            return;
        }

        // You can now access the response data in the 'body' variable
        //console.log(body.getTemperatureDetailsResult);
        const dataArr=body.getTemperatureDetailsResult;
        dataArr.forEach(item=>{
           //console.log(item);
           checkSensor(item.DeviceNo,(err,results)=>{
            if(err){
                console.log(err);
            }
            //console.log(results?.length);
            if(results&&results.length==0){
                pool.query(
                    `insert into sensor_data values(?,TIME(?),DATE(?),?)`,
                    [item.Temperature,
                     item.DateTime,
                     item.DateTime,
                     item.DeviceNo
                    ],
                    (err,results)=>{
                        if(err){
                            console.log(err);
                            return
                        }
                        //console.log(results);
                        
                    }
                   )
            }
            else{
                pool.query(
                    `update sensor_data set temp_data=?,temp_time=TIME(?),temp_date=DATE(?) where sensor_id=? `,
                    [item.Temperature,
                    item.DateTime,
                    item.DateTime,
                    item.DeviceNo],
                    (err,results)=>{
                         if(err){
                            return err;
                         }
                         return results;
                    }
                );
            }
           });
           
           
        })
        
        // Do something with the temperature details
    });
  };


setInterval(()=>{
    getTemperatureDetails();
},20000);


//   //call api every minute
// //   setInterval(async () => {
// //     const temperatureDetails = await getTemperatureDetails();
// //     console.log(temperatureDetails);
  
// //     // Store the temperature details on your backend server
// //   }, 10000);

app.listen(PORT,()=>{
    console.log(`server started on port ${PORT}`.bgCyan.white);
});