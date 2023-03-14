const express=require('express')
const router=express.Router()
const usersControllers=require('../controllers/usersControllers')
const requireAuth=require('../middleware/requireAuth')
const imageUploader=require('../helpers/image-uploader')

// request allowed without athentication
router.post('/signup', usersControllers.signupUsers)
router.post('/login', usersControllers.loginUsers)

//authentication required for one to login
router.use(requireAuth)
router.get('/', usersControllers.getUsers)
router.post('/', usersControllers.postUsers)
router.delete('/:id', usersControllers.deleteUsers)
router.patch('/:id', imageUploader.upload.single('profile'), usersControllers.patchUsers)
router.get('/:id', usersControllers.singleUser)



module.exports=router