const getConnection = require('../getConnection');

const listOneArticleQuery = async (idArticle) => {
    let connection;

    try {
        connection = await getConnection();

        let article;
        console.log(idArticle);

        [article] = await connection.query(
            `
            SELECT url,Title,Description, ROUND(AVG(rating),2) AS "Rating_articles"
            FROM articles
            LEFT JOIN ratings
            ON articles.id = ratings.idArticle
            WHERE articles.id = ?
            `,
            [idArticle]
        );
        return article;
    } finally {
        if (connection) connection.release();
    }
};

module.exports = listOneArticleQuery;
