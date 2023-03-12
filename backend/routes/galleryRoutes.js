const express=require('express')
const router=express.Router()
const galleryController=require('../controllers/galleryController')
const imageUploader=require('../helpers/image-uploader')

router.post('/post_gallery', imageUploader.upload.single('picture'), galleryController.postGallery)


module.exports=router