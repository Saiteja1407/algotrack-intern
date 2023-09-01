import bcrypt from 'bcrypt';

export const hashPassword= async (password)=>{
    try {
        //hash password
        const saltRounds=10;
        const hashedPassword= await bcrypt.hash(password,saltRounds);
        return hashedPassword;
    } catch (error) {
        console.log(error);
    }
}

export const comparePassword= async (password,hashedPassword)=>{
    //verify password
   return bcrypt.compare(password,hashedPassword);
}