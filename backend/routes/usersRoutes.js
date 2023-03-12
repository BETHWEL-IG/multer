const express=require('express')
const router=express.Router()
const usersControllers=require('../controllers/usersControllers')
const requireAuth=require('../middleware/requireAuth')


router.post('/signup', usersControllers.signupUsers)
router.post('/login', usersControllers.loginUsers)

//authentication required for one to login
router.use(requireAuth)
router.get('/', usersControllers.getUsers)
router.post('/', usersControllers.postUsers)
router.delete('/:id', usersControllers.deleteUsers)
router.patch('/:id', usersControllers.patchUsers)
router.get('/:id', usersControllers.singleUser)



module.exports=router