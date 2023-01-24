const express = require('express');
const router = express.Router();

const {
    getUsers,
    addUser,
    getUser,
    updateUser,
    removeUser,
    getEmail
 } = require('../controllers/users.controller')

// const {
//     isAdminRole,
//     isTheSameUser,
//     isAdminOrSameUser,
//     isAnyRoleByList
// } = require('../middlewares/auth.checkers') // requerimos la función

/* 
 Ideen una manera que sea modular, limpia y escalable.
 Si hacen muchas funciones como isAdminOrSameUser para cada situación,
 mientras se pueda leer claramente y escalar, está bien.
*/
//Solo cuiden la escalabilidad, esta son unas ideas

// router.get('/', isAnyRoleByList(['admin']), getUsers) //
// router.post('/', isAdminRole, addUser) // 
// router.get('/:id', isAdminOrSameUser, getUser) //
// router.put('/:id', isTheSameUser, updateUser) //
// router.delete('/:id', removeUser) //

router.get('/', getUsers)
router.post('/', addUser)
router.get('/mail/', getEmail)
router.get('/:id', getUser)
router.put('/:id', updateUser)
router.delete('/:id', removeUser)

module.exports = router;