const pool= require('../models/database')


const postGallery=(req, res)=>{
    const path=req.file.filename
    const { user_id, caption } = req.body; //assuming you are receiving userId, path and caption from request body
    const createdAt = new Date(); //assuming you want to add the current timestamp as the time created

    const sql = 'INSERT INTO gallery (user_id, path, caption, time_created) VALUES (?, ?, ?, ?)';
    pool.query(sql, [user_id, path, caption, createdAt], (err, result) => {
        if (err) {
        console.error(err);
        res.status(500).send('Error inserting image into gallery');
        } else {
        res.status(201).json(result); 
        }
    });
}
 
module.exports={
    postGallery
}