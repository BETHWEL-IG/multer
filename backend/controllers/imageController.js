const path = require('path');
const fs = require('fs');

function upload(req, res) {
    if(req.file.filename){
        res.status(200).json({
            message:'image upload successfully',
            url:req.file.filename
        })
    }else{
        res.status(500).json({
            message:'something went wrong'
        })
    }
} 

const deleteImage=(req, res)=>{
    const filename = req.params.filename;
    const filePath = path.join('uploads', filename);
    console.log(filePath)
    
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error(err);
        res.status(500).send({error: 'Failed to delete file', filePath});
      } else {
        res.send('File deleted successfully');
      }
    });
}


module.exports={
    upload:upload,
    deleteImage
}