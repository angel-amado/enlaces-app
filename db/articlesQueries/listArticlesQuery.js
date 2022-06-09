const getConnection = require('../getConnection');

const listArticlesQuery = async () => {
    let connection;

    try {
        connection = await getConnection();

        let articles;

        //Retornamos todos los artículos publicados hasta la fecha, añadiendo una columna que muestra
        //una clasificación de los artículos con su correspondiente rating.
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
