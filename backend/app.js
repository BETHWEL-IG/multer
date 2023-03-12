const express=require('express')
const app=express()
const cors=require('cors')
const usersRoutes=require('./routes/usersRoutes')
const imageRoute =require('./routes/imageRoutes')
const galleryRoute=require('./routes/galleryRoutes')

app.use(cors())
app.use(express.json())

app.listen(3001,()=>{
    console.log('listening to port 3000')
})

app.use('/api/users', usersRoutes)
app.use('/image', imageRoute)
app.use('/', galleryRoute)