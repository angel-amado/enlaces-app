const path = require('path');
const sharp = require('sharp');
const { nanoid } = require('nanoid');
const { createPathIfNotExists } = require('../../helpers');
const insertUserQuery = require('../../db/usersQueries/insertUserQuery');
const { generateError } = require('../../helpers');

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
            imgName = `${nanoid(24)}.jpg`;

            //Genero la ruta absoluta a la imagen
            const imgPath = path.join(uploadsDir, imgName);

            //Guardo la imagen en mi servidor
            await sharpImage.toFile(imgPath);

            //Añadimos este nombre de imagen al objeto body
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
