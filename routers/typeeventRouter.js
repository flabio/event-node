const { Router } = require('express');
const { check } = require('express-validator');
const { getTypeEvents, createdTypeEvent, getTypeEventById, updatedTypeEvent, deletedTypeEvent } = require('../controllers/typeEventController');
const { validateFied } = require('../middlewares');
const { IS_NOT_VALID_ID, NAME_REQUIRED } = require('../helpers/global_constante');
const { IsExistIdTypeEvent } = require('../database/validatorDB');
const { validarJWT } = require('../middlewares/validarJwt');


const router = Router();

router.get('/',[validarJWT],getTypeEvents);
router.get('/:id',[
        validarJWT,
        check('id',IS_NOT_VALID_ID).isMongoId(),
        check('id').custom(IsExistIdTypeEvent),
        validateFied
],getTypeEventById);

router.post('/',[
        validarJWT,
        check('name',NAME_REQUIRED).not().isEmpty(),
       validateFied
],createdTypeEvent);


router.put('/:id',[
        validarJWT,
        check('id',IS_NOT_VALID_ID).isMongoId(),
        check('id').custom(IsExistIdTypeEvent),
        check('name',NAME_REQUIRED).not().isEmpty(),
        validateFied
],updatedTypeEvent);

router.delete('/:id',[
        validarJWT,
        check('id',IS_NOT_VALID_ID).isMongoId(),
        check('id').custom(IsExistIdTypeEvent),
        validateFied
],deletedTypeEvent);

module.exports = router;