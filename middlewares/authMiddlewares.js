import Jwt from "jsonwebtoken";

//protect routes based on token

export const requireSignIn = async (req, res, next) => {
  console.log(req.headers.authorization);
  const token = req.cookies.token;
  console.log(token);
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized access' });
  }
  Jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }
    req.user = decoded.data;
    // console.log(req.user);
    
    next();
  })
};
