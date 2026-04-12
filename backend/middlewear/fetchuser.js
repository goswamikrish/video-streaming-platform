const jwt = require('jsonwebtoken');
const TOKEN="shhh";
const fetchuser=(req,res,next)=>{
    //get the user from the jwt token
    const  token=req.header('auto-token');
    if(!token){
        res.status(401).send({error :"please authenticate apparent token"});
    }
   
    try {
        const data=jwt.verify(token,TOKEN);
        req.user=data.user;
        next();
    } catch (error) {
        res.status(401).send({error :"please authenticate apparent"});
    }
}
module.exports=fetchuser;