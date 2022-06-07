const getConnection = require('../getConnection');

const deleteArticleByIdQuery = async (idArticle) => {
    let connection;

    try {
        connection = await getConnection();

        await connection.query(`DELETE FROM articles WHERE id = ?`, [
            idArticle,
        ]);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = deleteArticleByIdQuery;
