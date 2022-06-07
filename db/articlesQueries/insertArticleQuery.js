const getConnection = require('../getConnection');

const insertArticleQuery = async (url, title, description, idUser) => {
    let connection;

    try {
        connection = await getConnection();
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
