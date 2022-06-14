const { Router } = require('express');
const { check } = require('express-validator');
const { getOrganizations, createdOrganization, getOrganizationById, updatedOrganization, deletedOrganization } = require('../controllers/organizationController');
const { IsExistIdOrganization } = require('../database/validatorDB');
const { IS_NOT_VALID_ID, NAME_REQUIRED } = require('../helpers/global_constante');


const { validateFied } = require('../middlewares');
const { validarJWT } = require('../middlewares/validarJwt');
const { isAdminRol } = require('../middlewares/validatorRol');


const router = Router();

router.get('/',[validarJWT,isAdminRol], getOrganizations);
router.get('/:id', [
        validarJWT,
        isAdminRol,
        check('id', IS_NOT_VALID_ID).isMongoId(),
        check('id').custom(IsExistIdOrganization),
        validateFied
], getOrganizationById);
router.post('/', [
        validarJWT,
        isAdminRol,
        check('name',NAME_REQUIRED).not().isEmpty(),
        validateFied
], createdOrganization);

router.put('/:id', [
        validarJWT,
        isAdminRol,
        check('id', IS_NOT_VALID_ID).isMongoId(),
        check('id').custom(IsExistIdOrganization),
        check('name', NAME_REQUIRED).not().isEmpty(),
        validateFied
], updatedOrganization);

router.delete('/:id', [
        validarJWT,
        isAdminRol,
        check('id', IS_NOT_VALID_ID).isMongoId(),
        check('id').custom(IsExistIdOrganization),
        validateFied
], deletedOrganization);


module.exports = router;