// LLamada a los modulos necesarios
require('dotenv').config();
const express = require('express');
const fileUpload = require('express-fileupload');
const morgan = require('morgan');

const { PORT } = process.env;

const app = express();

//Usamos el middleware "morgan" para llevar un registro de peticiones http
app.use(morgan('dev'));

//Deserializamos un body con formato "raw"
app.use(express.json());

//Deserializamos un body con formato "form-data"
app.use(fileUpload());

/**
 * ########################
 * ## Endpoints Usuarios ##
 * ########################
 */
const authUser = require('./middlewares/authUser');
const { newUser, loginUser, editUser } = require('./controllers/users');

// Crear un nuevo usuario
app.post('/users', newUser);

// Acceder con el usuario.
app.post('/login', loginUser);

//Editar el perfil del usuario.   ** Necesita token **
app.put('/editprofile', authUser, editUser);

/**
 * #############################
 * ## Endpoints Publicaciones ##
 * #############################
 */

const {
    newArticle,
    deleteArticle,
    listArticles,
} = require('./controllers/article');

// Crea una nueva publicación.  ** Necesita token **
app.post('/article', authUser, newArticle);

// Seleccion de TODAS las publicaciones.  ** Necesita token **
app.get('/articles', authUser, listArticles);

// Elimina una publicación si eres el dueño.   ** Necesita token **
app.delete('/delete/:idArticle', authUser, deleteArticle);

/**
 * ############################
 * ## Endpoint Valoraciones ##
 * ############################
 */

const newRating = require('./controllers/ratings/newRating');

//Votar publicaciones SOLO de otros usuarios y SOLO se permite una votación por publicación/usuario. ** Necesita token **
app.post('/rating/:idArticle', authUser, newRating);

/**
 * ######################
 * ## Middleware Error ##
 * ######################
 */

app.use((err, req, res, next) => {
    console.error(err);

    res.status(err.statusCode || 500).send({
        status: 'error',
        message: err.message,
    });
});

/**
 * ##########################
 * ## Middleware Not Found ##
 * ##########################
 */

app.use((req, res) => {
    res.status(404).send({
        status: 'error',
        message: 'Not found!',
    });
});

app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`);
});