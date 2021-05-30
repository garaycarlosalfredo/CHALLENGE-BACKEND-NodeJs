const express = require('express')
const router = express.Router()
const tareaController = require('../controllers/tareaController')
const auth = require('../middleware/auth')
const {check} = require('express-validator')

//Crear tarea
// api/tareas
router.post('/',
auth,
[
    check('nombre', 'El nombre es obligatorios').not().isEmpty(),
    check('proyecto', 'El proyecto es obligatorios').not().isEmpty()
],
tareaController.crearTarea
)

//Obtener tareas
router.get('/',
auth,
tareaController.obtenerTareas
)

//Actualizar tareas
router.put('/:id',
auth,
tareaController.actualizarTarea
)

//Eliminar tarea

router.delete('/:id',
    auth,
    tareaController.eliminarTarea
)

module.exports = router