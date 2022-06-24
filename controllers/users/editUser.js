const updateUserByIdQuery = require('../../db/usersQueries/updateUserByIdQuery');
const selectUserByIdQuery = require('../../db/usersQueries/selectUserByIdQuery');
const { storingPhoto, generateError, deletePhoto } = require('../../helpers');

const editUser = async (req, res, next) => {
    try {
        //Hacemos destructuring del body.
        const { alias, name, firstName, lastName, email, password, biography } =
            req.body;

        //Como mínimo, el usuario debe modificar alguno de los campos permitidos. En caso contrario, lanzamos un error
        if (
            !alias &&
            !name &&
            !firstName &&
            !lastName &&
            !email &&
            !password &&
            !biography &&
            !req.files.image
        ) {
            throw generateError('Falta uno de los campos para editar', 400);
        }

        //En caso de que exista una imagen, la guardamos
        // **Debemos poner el nombre 'image' a la imagen que estamos adjuntando desde el cliente**
        if (req.files && req.files.image) {
            //Comprobamos si el usuario ya tiene una foto en su perfil
            const dataPicture = await selectUserByIdQuery(req.idUser);

            if (dataPicture.picture) await deletePhoto(dataPicture.picture); //Borramos la foto SI estaba almacenada anteriormente en nuestro servidor

            //Guardamos la imagen llamando a la fucion de helpers
            const imgName = await storingPhoto(req.files.image);

            //Añadimos este nombre de imagen al objeto body
            req.body.picture = imgName;
        }

        //Pasamos el id del usuario y el body a la función correspondiente en la base de datos.
        await updateUserByIdQuery(req.idUser, req.body);

        res.send({
            status: 'ok',
            message: 'Perfil actualizado correctamente',
        });
    } catch (err) {
        next(err);
    }
};

module.exports = editUser;
