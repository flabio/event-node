const { Router } = require('express');
const { check } = require('express-validator');
const { getUsers, createdUser, updatedUser, getUserById, deletedUser } = require('../controllers/userController');
const { IsExistEmail, IsExistIdRol, IsExistIdUser } = require('../database/validatorDB');
const { IS_NOT_VALID_ID, LAST_NAME_REQUIRED, FIRST_NAME_REQUIRED, EMAIL_REQUIRED, PASSWORD_MORE_6_REQUIRED } = require('../helpers/global_constante');
const { validateFied } = require('../middlewares');
const { validarJWT } = require('../middlewares/validarJwt');
const { isAdminRol } = require('../middlewares/validatorRol');


const router = Router();
//ruoter user
router.get('/',[validarJWT,isAdminRol], getUsers);
router.get('/:id', [
        validarJWT,
        isAdminRol,
        check('id', IS_NOT_VALID_ID).isMongoId(),
        check('id').custom(IsExistIdUser),
        validateFied
], getUserById);

router.post('/', [
        validarJWT,
        isAdminRol,
        check('first_name', LAST_NAME_REQUIRED).not().isEmpty(),
        check('last_name', FIRST_NAME_REQUIRED).not().isEmpty(),
        check('email', 'The email not is valid.').isEmail(),
        check('email').custom(IsExistEmail),
        check('password',PASSWORD_MORE_6_REQUIRED).isLength({ min: 6 }),
        check('rol_id').custom(IsExistIdRol),
        // check('rol','El rol no es valido.').isIn(['admin','user']),
        validateFied
], createdUser);
router.post('/create_voluter', [
        validarJWT,
        isAdminRol,
        check('first_name', LAST_NAME_REQUIRED).not().isEmpty(),
        check('last_name', FIRST_NAME_REQUIRED).not().isEmpty(),
        check('email', EMAIL_REQUIRED).isEmail(),
        check('email').custom(IsExistEmail),
        check('password',PASSWORD_MORE_6_REQUIRED).isLength({ min: 6 }),
        check('rol_id').custom(IsExistIdRol),
        // check('rol','El rol no es valido.').isIn(['admin','user']),
        validateFied
], createdUser);
router.put('/:id', [
        validarJWT,
        check('id', IS_NOT_VALID_ID).isMongoId(),
        check('id').custom(IsExistIdUser),
        check('first_name', FIRST_NAME_REQUIRED).not().isEmpty(),
        check('last_name', LAST_NAME_REQUIRED).not().isEmpty(),
        check('email', EMAIL_REQUIRED).isEmail(),
        check('password', PASSWORD_MORE_6_REQUIRED).isLength({ min: 6 }),
        check('rol_id').custom(IsExistIdRol),
        validateFied
], updatedUser);
router.delete('/:id', [
        validarJWT,
        isAdminRol,
        check('id', IS_NOT_VALID_ID).isMongoId(),
        check('id').custom(IsExistIdUser),
        validateFied
], deletedUser);



module.exports = router;