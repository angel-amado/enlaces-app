const getConnection = require('../getConnection');
const { generateError } = require('../../helpers');

const insertRatingByIdQuery = async (idArticle, idUser, rating) => {
    let connection;

    try {
        connection = await getConnection();

        // Comprobamos si el usuario ha votado esta publicación anteriormente.
        const [idRating] = await connection.query(
            `SELECT id FROM ratings WHERE idArticle = ?`,
            [idArticle]
        );

        /*
         * Si el array del id en la tabla rating es mayor que uno,
         * significa que este usuario ya votó esta misma publicacación anteriormente.
         * Entonces lanzamos un error.
         */

        if (idRating.length > 0) {
            throw generateError(
                'Lo sentimos. Ya ha valorado esta publicación anteriormente.',
                409
            );
        }

        // Insertamos la valoracion
        const [newRating] = await connection.query(
            `INSERT INTO ratings (idArticle, idUser, rating) VALUES(?,?,?)`,
            [idArticle, idUser, rating]
        );

        // Retornamos el id del elemento creado.
        return newRating.insertId;
    } finally {
        if (connection) connection.release();
    }
};

module.exports = insertRatingByIdQuery;
