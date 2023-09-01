import dotenv from 'dotenv';
dotenv.config();
import  express from'express';
import colors from 'colors';
//configure dotenv
import morgan from 'morgan';
import cors from 'cors';
import authRoutes from './routes/authRoute.js';
import mysqlRouter from './api/customers/customer.routes.js';
import partnerRouter from './api/partners/partner.routes.js';


//database connection --------------

const app=express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

//routes
// app.use('/',authRoutes);
app.use('/',mysqlRouter);
app.use('/',partnerRouter);

//rest api
app.get('/',(req,res)=>{
     res.send({
        msg:"welcome",
     });
});

console.log(process.env.PORT);
console.log(process.env.DB_PASSWORD);
//port
const PORT=process.env.PORT;

app.listen(PORT,()=>{
    console.log(`server started on port ${PORT}`.bgCyan.white);
});