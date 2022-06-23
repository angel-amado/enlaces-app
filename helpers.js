const fs = require('fs/promises');
const path = require('path');
const sharp = require('sharp');
const { nanoid } = require('nanoid');

const generateError = (message, status) => {
    const error = new Error(message);
    error.statusCode = status;
    return error;
};

const createPathIfNotExists = async (path) => {
    try {
        await fs.access(path);
    } catch {
        await fs.mkdir(path);
    }
};

const deletePhoto = async (photoName) => {
    try {
        const photoPath = path.join(__dirname, 'uploads', photoName);
        await fs.unlink(photoPath);
    } catch (error) {
        throw generateError('Error al eliminar la imagen del servidor', 409);
    }
};

const storingPhoto = async (image) => {
    //Creamos una ruta absoluta a la carpeta "uploads"
    const uploadsDir = path.join(__dirname, 'uploads');

    //Creamos la carpeta "uploads" en caso de que no exista previamente
    await createPathIfNotExists(uploadsDir);

    //Convertimos la imagen a tipo "Sharp"
    const sharpImage = sharp(image.data);

    //Usamos un método de "Sharp" para evitar que la imagen supere los 500 px
    sharpImage.resize(500);

    //Asignamos a esta imagen un nombre único de 24 caracteres, usando la librería "nanoid"
    const imgName = `${nanoid(24)}.jpg`;

    //Genero la ruta absoluta a la imagen
    const imgPath = path.join(uploadsDir, imgName);

    //Guardo la imagen en mi servidor
    await sharpImage.toFile(imgPath);

    return imgName;
};

module.exports = {
    generateError,
    createPathIfNotExists,
    deletePhoto,
    storingPhoto,
};
