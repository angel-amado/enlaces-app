const getConnection = require('../getConnection');

const listArticlesQuery = async () => {
    let connection;

    try {
        connection = await getConnection();

        let articles;

        /*
         *Si hay palabra clave "keyword" buscamos los artículos que contengan esa palabra
         * clave. De lo contrario retornamos todos los artículos publicados hasta la fecha.
         */

        [articles] = await connection.query(
            `
            SELECT  url,Title,Description , ROUND(AVG(rating),2) AS "Rating_articles"
            FROM articles
                LEFT JOIN ratings
                    ON articles.id = ratings.idArticle
            GROUP BY url, title, description
            ORDER BY Rating_articles DESC;
            `
        );
        return articles;
    } finally {
        if (connection) connection.release();
    }
};

module.exports = listArticlesQuery;
