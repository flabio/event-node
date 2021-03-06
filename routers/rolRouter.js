const { Router } = require('express');
const { check } = require('express-validator');
const { getRols, createRol, getRolById, updatedRol, deletedRol } = require('../controllers/rolController');
const { IsExistIdRol } = require('../database/validatorDB');
const { NAME_REQUIRED, IS_NOT_VALID_ID } = require('../helpers/global_constante');

const { validateFied } = require('../middlewares');
const { validarJWT } = require('../middlewares/validarJwt');
const { isAdminRol } = require('../middlewares/validatorRol');


const router = Router();

router.get('/',[validarJWT, isAdminRol], getRols);
router.get('/:id', [
        validarJWT,
        isAdminRol,
        check('id', IS_NOT_VALID_ID).isMongoId(),
        check('id').custom(IsExistIdRol),
        validateFied
], getRolById);

router.post('/', [
        validarJWT,
        isAdminRol,
        check('name', NAME_REQUIRED).not().isEmpty(),
        validateFied
], createRol);

router.put('/:id', [
        validarJWT,
        isAdminRol,
        check('id', IS_NOT_VALID_ID).isMongoId(),
        check('id').custom(IsExistIdRol),
        check('name', NAME_REQUIRED).notEmpty(),
        validateFied
], updatedRol);

router.delete('/:id', [
        validarJWT,
        isAdminRol,
        check('id', IS_NOT_VALID_ID).isMongoId(),
        check('id').custom(IsExistIdRol),
        validateFied
], deletedRol);


module.exports = router;