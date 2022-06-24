const insertUserQuery = require('../../db/usersQueries/insertUserQuery');
const {
    generateError,
    storingPhoto,
    createPathIfNotExists,
} = require('../../helpers');
const path = require('path');
const sharp = require('sharp');
const newUser = async (req, res, next) => {
    try {
        // Obtenemos los campos del body.
        const { alias, name, firstName, lastName, email, password, biography } =
            req.body;

        // Si faltan campos lanzamos un error.
        if (!alias || !name || !firstName || !lastName || !email || !password) {
            throw generateError('Faltan campos', 400);
        }

        //En caso de que exista una imagen, la guardamos
        // **Debemos poner el nombre 'image' a la imagen que estamos adjuntando desde el cliente**
        //Si el usuario no ha subido una imagen, añadiremos una imagen por defecto
        if (req.files && req.files.imageg) {
            const imgName = await storingPhoto(req.files.image);
            //Añadimos el nombre de imagen al objeto body
            req.body.picture = imgName;
        } else {
            const uploadsDir = path.join('./', 'uploads');
            await createPathIfNotExists(uploadsDir);
            const image = sharp('public/avatar.png').resize(500);
            const imgName = `default_${alias}_image.jpg`;
            const imgPath = path.join(uploadsDir, imgName);
            await image.toFile(imgPath);
            req.body.picture = imgName;
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
            req.body.picture
        );

        res.send({
            status: 'ok',
            message: `Usuario con id ${idUser} creado`,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = newUser;
