const {Router}=require('express');
const {createUser, loginUser,validarEmail}=require('../controllers/user.controller');
const { route } = require('../config/app');


const router = Router();

router.post('/register',createUser);
router.post('/login',loginUser);
router.post('/validaremail', validarEmail)

module.exports = router;