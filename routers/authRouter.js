const { Router } = require('express');
const { check } = require('express-validator');
const { Login } = require('../controllers/authController');
const { validateFied } = require('../middlewares');


const router = Router();
router.post('/login',[
    check('email', 'El email es requerido').isEmail(),
    check('password', 'El password es requirida').not().isEmpty(),
    validateFied
],Login);


module.exports = router