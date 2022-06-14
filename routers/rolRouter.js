const { Router } = require('express');
const { check } = require('express-validator');
const { getRols, createRol, getRolById, updatedRol, deletedRol } = require('../controllers/rolController');
const { IsExistIdRol } = require('../database/validatorDB');
const { NAME_REQUIRED, IS_NOT_VALID_ID } = require('../helpers/global_constante');

const { validateFied } = require('../middlewares');
const { validarJWT } = require('../middlewares/validarJwt');


const router = Router();

router.get('/',[validarJWT], getRols);
router.get('/:id', [
        validarJWT,
        check('id', IS_NOT_VALID_ID).isMongoId(),
        check('id').custom(IsExistIdRol),
        validateFied
], getRolById);

router.post('/', [
        validarJWT,
        check('name', NAME_REQUIRED).not().isEmpty(),
        validateFied
], createRol);

router.put('/:id', [
        validarJWT,
        check('id', IS_NOT_VALID_ID).isMongoId(),
        check('id').custom(IsExistIdRol),
        check('name', NAME_REQUIRED).notEmpty(),
        validateFied
], updatedRol);

router.delete('/:id', [
        validarJWT,
        check('id', IS_NOT_VALID_ID).isMongoId(),
        check('id').custom(IsExistIdRol),
        validateFied
], deletedRol);


module.exports = router;