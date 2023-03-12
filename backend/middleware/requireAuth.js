const jwt=require('jsonwebtoken')
require('dotenv').config()

const requireAuth=(req, res, next)=>{
    //getting authoriation from the headers
    const {authorization}=req.headers 
    if(!authorization) return res.status(400).json({error:'Authorization token required'})
    //split the authorization token
    const token=authorization.split(' ')[1]
    //grab id from the token
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET,(err, decoded)=>{
        if(err)return res.status(400).json({error:'Invalid Token'})
        req.user=decoded.id
        next() 
    })
    
    
}
module.exports=requireAuth