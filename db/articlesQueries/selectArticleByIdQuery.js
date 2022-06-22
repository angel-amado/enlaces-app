const getConnection = require('../getConnection');

const selectArticleByIdQuery = async (idArticle) => {
    let connection;

    try {
        connection = await getConnection();
        const [selectArticle] = await connection.query(
            `SELECT idUser FROM articles WHERE id= ?`,
            [idArticle]
        );
        return selectArticle[0];
    } finally {
        if (connection) connection.release();
    }
};

module.exports = selectArticleByIdQuery;
