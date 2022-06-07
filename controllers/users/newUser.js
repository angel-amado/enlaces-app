const insertUserQuery = require('../../db/usersQueries/insertUserQuery');
const { generateError } = require('../../helpers');

const newUser = async (req, res, next) => {
    try {
        // Obtenemos los campos del body.
        const {
            alias,
            name,
            firstName,
            lastName,
            email,
            password,
            biography,
            picture,
        } = req.body;

        // Si faltan campos lanzamos un error.
        if (!alias || !name || !firstName || !lastName || !email || !password) {
            throw generateError('Faltan campos', 400);
        }

        // Creamos un usuario en la base de datos y obtenemos su id.
        const idUser = await insertUserQuery(
            alias,
            name,
            firstName,
            lastName,
            email,
            password,
            biography,
            picture
        );

        res.send({
            status: 'ok',
            message: `Usuario con id ${idUser} creado`,
        });
    } catch (error) {
        next(error);
        //Si el usuario ya existe, lo redirigimos a la página de login.
        //res.redirect(307, '/login');
    }

    /* res.send({
        status: 'error',
        message: 'Usuario ya existente, redirigiendo al acceso',
    })*/
};

module.exports = newUser;
