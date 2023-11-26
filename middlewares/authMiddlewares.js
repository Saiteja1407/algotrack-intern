import Jwt from "jsonwebtoken";

//protect routes based on token

export const permitPartner = async (req, res, next) => {
  const token = req.cookies.token;
  const id=req.params.id;
  // if there is token we will verify it else we send them error
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized access' });
  }
  try{
    const decode=Jwt.verify(token,process.env.JWT_SECRET);
    if((decode.role==='partner' || decode.role==='admin') && decode.id==id){ 
        req.user = decode.data;
        next();
    }else{
       return res.status(401).json({message:'you dont have access to this page'})
    }
   
   }
   catch(error){
     return res.status(400).json({message:"got some error"}); 
   }
};
export const permitcustomer = async (req, res, next) => {
  const id=req.params.id;
  const token = req.cookies.token;
  // if there is token we will verify it else we send them error
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized access' });
  }
  try{
    const decode=Jwt.verify(token,process.env.JWT_SECRET);
    if((decode.role==='customer' || decode.role==='admin') && decode.id==id){ 
        req.user = decode.data;
        next();
    }else{
       return res.status(401).json({message:'you dont have access to this page'})
    }
   
   }
   catch(error){
     return res.status(400).json({message:"wrong token"}); 
   }
};
export const permitadmin = async (req, res, next) => {
  const token = req.cookies.token;
  // if there is token we will verify it else we send them error
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized access' });
  }
  try{
    const decode=Jwt.verify(token,process.env.JWT_SECRET);
    if(decode.role==='admin'){ 
        req.user = decode.data;
        next();
    }else{
       return res.status(401).json({message:'you dont have access to this page'})
    }
   
   }
   catch(error){
     return res.status(400).json({message:"wrong token"}); 
   }
};