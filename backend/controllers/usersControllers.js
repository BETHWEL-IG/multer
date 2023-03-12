const pool= require('../models/database')
const bcrypt= require('bcrypt')
const validator=require('validator')
const jwt=require('jsonwebtoken')
require('dotenv').config()

const createToken=(id)=>{
    return jwt.sign({id}, process.env.ACCESS_TOKEN_SECRET, {expiresIn:'1d'})
}
// const refreshToken=(id)=>{
//     return jwt.sign({id}, process.env.REFRESH_TOKEN_SECRET, {expiresIn:'1d'})
// }


const getUsers=((req,res)=>{
    const sql= `select * from users`
    pool.query(sql, (err, result)=>{
        if(err){
            return res.status(400).json(err)
        }else
        res.status(200).json(result)
        
    })
})
const postUsers=((req,res)=>{
    const {email, password}=req.body
    const sql=`insert into users (email, password) values(?,?)`
    pool.query(sql, [email, password], (err,result)=>{
        if(err){
            return res.status(400).json(err)
        }else
        res.status(200).json(result)
    })
})
const patchUsers=((req,res)=>{
    res.status(200).json({msg:'updating Users'})
})
const deleteUsers= ((req,res)=>{
    const id=req.params.id
    const sql=`DELETE FROM USERS WHERE USER_ID=?`
    pool.query(sql,[id], (err,result)=>{
        if(err){
            return res.status(400).json(err)
        }else
        res.status(200).json(result)
    })
})

const signupUsers=((req,res)=>{
    const {email, password}=req.body
    //validation
    if(! email || ! password) return res.status(400).json({status:'error', error:'Please enter email and password'})
    //email validation
    if(!validator.isEmail(email)) return res.status(400).json({status:'error', error:'This is not a valid email'})
    //password validation
    if(!validator.isStrongPassword(password)) return res.status(400).json({status:'error', error:'Password is not strong enough'})
        
    //fetching data
    const sql1=`SELECT * FROM USERS WHERE email=?`
    pool.query(sql1,[email], async(err,result)=>{
        if(err) throw err;
        if(result[0]) {
            return res.status(400).json({status:'error', error:'The email already exists'})
        }else{
            const salt=await bcrypt.genSalt(10)
            const hash=await bcrypt.hash(password, salt)         
            const sql=`insert into users (email, password) values(?,?)`
            pool.query(sql, [email, hash], (error,results)=>{
                if(error) throw error
                //create token
                const token=createToken(results.insertId)
                return res.status(200).json({ email, token})
            })   
        }
    })
        
    
})
const loginUsers=((req,res)=>{
    const {email, password}=req.body
    //validation
    if(!email || !password) return res.status(400).json({status:'error', error:'Please enter email and password'})
    
    //fetching data
    const sql1=`SELECT * FROM USERS WHERE email=?`
    pool.query(sql1,[email], async(err,result)=>{
        if(err) throw err;
        if(!result[0]) {
            return res.status(400).json({status:'error', error:'The email does not exist'})
        }else{        
            const match=await bcrypt.compare(password, result[0].password) 
            if(!match){
                res.status(400).json({status:"error", error:"Incorrect password "})
            }else{
                const token= createToken(result[0].user_id)
                res.status(200).json({ email, token})
            } 
        }
    })
        
    
})
const singleUser=((req,res)=>{
    const id =req.params.id
    const sql=`SELECT * FROM USERS WHERE USER_ID=${id}`
    const data=pool.query(sql, (err,result)=>{
        if(err){
            res.json({Error:'Could not get the specified user'})
        }else
        res.status(200).json(result)
       
    })
})

module.exports={
    getUsers,
    deleteUsers,
    patchUsers,
    postUsers, 
    signupUsers,
    loginUsers,
    singleUser
}