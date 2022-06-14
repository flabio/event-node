const { Router } = require('express');
const { check } = require('express-validator');
const { getEvents, getEventById, createdEvent, changeStateEvent, getKanban } = require('../controllers/eventController');
const { IsExistIdUser, IsExistIdOrganization, IsExistIdTypeEvent, IsExistIdEvent } = require('../database/validatorDB');
const { IS_NOT_VALID_ID, TITLE_REQUIRED, DESCRIPTION_REQUIRED, TYPE_EVENT_ID_REQUIRED, ORGANIZATION_ID_REQUIRED, STATE_REQUIRED, DUE_DATE_REQUIRED, END_DATE_REQUIRED, ADDRESS_REQUIRED, PLACE_REQUIRED, USER_ID_REQUIRED } = require('../helpers/global_constante');
const { validateFied } = require('../middlewares');
const { validarJWT } = require('../middlewares/validarJwt');
const { hasRol } = require('../middlewares/validatorRol');


const router = Router();
//ruoter user
router.get('/', getEvents);
router.get('/kanban',[  validarJWT,
    hasRol('Admin', 'Shepherd', 'Higher'),validateFied], getKanban);
router.get('/:id', [
    validarJWT,
    hasRol('Admin', 'Shepherd', 'Higher'),
    check('id', IS_NOT_VALID_ID).isMongoId(),
    check('id').custom(IsExistIdUser),
    validateFied
], getEventById);

router.post('/', [
    validarJWT,
    hasRol('Admin', 'Shepherd', 'Higher'),
    check('title', TITLE_REQUIRED).not().isEmpty(),
    check('description', DESCRIPTION_REQUIRED).not().isEmpty(),
    check('place', PLACE_REQUIRED).not().isEmpty(),
    check('address', ADDRESS_REQUIRED).not().isEmpty(),
    check('start_date', STATE_REQUIRED).not().isEmpty(),
    check('end_date', END_DATE_REQUIRED).not().isEmpty(),
    check('due_date', DUE_DATE_REQUIRED).not().isEmpty(),
    check('state', STATE_REQUIRED).not().isEmpty(),
    // check('user_id').custom(IsExistIdUser),
    // check('user_id', USER_ID_REQUIRED).not().isEmpty(),
    check('organization_id').custom(IsExistIdOrganization),
    check('organization_id', ORGANIZATION_ID_REQUIRED).not().isEmpty(),
    check('type_event_id').custom(IsExistIdTypeEvent),
    check('type_event_id', TYPE_EVENT_ID_REQUIRED).not().isEmpty(),

    // check('rol','El rol no es valido.').isIn(['admin','user']),
    validateFied
], createdEvent);

router.put('/:id', [
    validarJWT,
    hasRol('Admin', 'Shepherd', 'Higher'),
    check('id', IS_NOT_VALID_ID).isMongoId(),
    check('id').custom(IsExistIdEvent),
    check('title', TITLE_REQUIRED).not().isEmpty(),
    check('description', DESCRIPTION_REQUIRED).not().isEmpty(),
    check('place', PLACE_REQUIRED).not().isEmpty(),
    check('address', ADDRESS_REQUIRED).not().isEmpty(),
    check('start_date', STATE_REQUIRED).not().isEmpty(),
    check('end_date', END_DATE_REQUIRED).not().isEmpty(),
    check('due_date', DUE_DATE_REQUIRED).not().isEmpty(),
    check('state', STATE_REQUIRED).not().isEmpty(),
    // check('user_id').custom(IsExistIdUser),
    // check('user_id', USER_ID_REQUIRED).not().isEmpty(),
    check('organization_id').custom(IsExistIdOrganization),
    check('organization_id', ORGANIZATION_ID_REQUIRED).not().isEmpty(),
    check('type_event_id').custom(IsExistIdTypeEvent),
    check('type_event_id', TYPE_EVENT_ID_REQUIRED).not().isEmpty(),

    // check('rol','El rol no es valido.').isIn(['admin','user']),
    validateFied
], createdEvent);
router.put('/kanban/:id', [
    validarJWT,
    hasRol('Admin', 'Shepherd', 'Higher'),
    check('id', IS_NOT_VALID_ID).isMongoId(),
    check('id').custom(IsExistIdEvent),
    check('state', STATE_REQUIRED).not().isEmpty(),
    validateFied
], changeStateEvent);
// router.delete('/:id', [
//         check('id', IS_NOT_VALID_ID).isMongoId(),
//         check('id').custom(IsExistIdUser),
//         validateFied
// ], deletedUser);



module.exports = router;