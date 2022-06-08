const getConnection = require('../getConnection');
const { generateError } = require('../../helpers');

const insertArticleQuery = async (url, title, description, idUser) => {
    let connection;

    try {
        connection = await getConnection();

        //Nos aseguramos que la url no se repite
        const [selectArticle] = await connection.query(
            `SELECT url FROM articles WHERE url= ?`,
            [url]
        );

        console.log(selectArticle);

        if (selectArticle.length > 0)
            throw generateError('URL ya existente.', 400);

        //Creamos una nueva publicación
        const [newArticle] = await connection.query(
            `INSERT INTO articles (url, title, description, idUser) VALUES(?, ?, ?, ?)`,
            [url, title, description, idUser]
        );

        // Retornamos el id del elemento creado.
        return newArticle.insertId;
    } finally {
        if (connection) connection.release();
    }
};

module.exports = insertArticleQuery;
