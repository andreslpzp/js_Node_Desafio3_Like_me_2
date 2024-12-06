
//Importamos la libreria para administrar las rutas:
const {Router} = require('express');

//Importamos las funciones desde Controles
const {AgregarPostDB, ListarPostDB, likePost, eliminarPost} = require('../controles/functPost');

const router = Router();

router.get('/', (req, res)=> {
    res.send('Inicio !!');
}
);

router.get('/home', (req, res)=> {
    res.send('Hola mundo !!');
}
);

//Manejo de rutas por medio de funciones que admninistran el (req, res)

// Agregar un nuevo post
router.post('/posts', AgregarPostDB);

// Obtener todos los posts
router.get('/posts', ListarPostDB);

// Dar like a un post
router.put('/posts/like/:id', likePost);

// Eliminar un post
router.delete('/posts/:id', eliminarPost);

module.exports = router;