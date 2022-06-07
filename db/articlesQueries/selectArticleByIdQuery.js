const getConnection = require('../getConnection');
const { generateError } = require('../../helpers');

const selectArticleByIdQuery = async (idArticle) => {
    let connection;

    try {
        connection = await getConnection();
        const [selectArticle] = await connection.query(
            `SELECT idUser FROM articles WHERE id= ?`,
            [idArticle]
        );

        if (selectArticle.length < 1)
            throw generateError('Publicación no encontrada', 404);

        return selectArticle[0];
    } finally {
        if (connection) connection.release();
    }
};

module.exports = selectArticleByIdQuery;
