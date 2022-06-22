const path = require('path');
const sharp = require('sharp');
const { nanoid } = require('nanoid');
const updateUserByIdQuery = require('../../db/usersQueries/updateUserByIdQuery');
const { createPathIfNotExists } = require('../../helpers');
const { generateError } = require('../../helpers');

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
            !biography
        ) {
            throw generateError('Falta uno de los campos para editar', 400);
        }

        //En caso de que exista una imagen, la guardamos
        // **Debemos poner el nombre 'image' a la imagen que estamos adjuntando desde el cliente**
        if (req.files && req.files.image) {
            //Creamos una ruta absoluta a la carpeta "uploads"
            const uploadsDir = path.join(__dirname, '/../../uploads');

            //Creamos la carpeta "uploads" en caso de que no exista previamente
            await createPathIfNotExists(uploadsDir);

            //Convertimos la imagen a tipo "Sharp"
            const sharpImage = sharp(req.files.image.data);

            //Usamos un método de "Sharp" para evitar que la imagen supere los 500 px
            sharpImage.resize(500);

            //Asignamos a esta imagen un nombre único de 24 caracteres, usando la librería "nanoid"
            const imgName = `${nanoid(24)}.jpg`;

            //Genero la ruta absoluta a la imagen
            const imgPath = path.join(uploadsDir, imgName);

            //Guardo la imagen en mi servidor
            await sharpImage.toFile(imgPath);

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
