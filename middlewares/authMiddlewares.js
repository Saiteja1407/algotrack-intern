import  Jwt  from "jsonwebtoken";

//protect routes based on token

export const requireSignIn=async(req,res,next)=>{
     try {
        const decode= await Jwt.verify(req.headers.authorization,process.env.JWT_SECRET);
        req.user=decode;
        next();
     } catch (error) {
        console.log(error);
     }
}