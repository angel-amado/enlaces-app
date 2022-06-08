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
            SELECT url,title,description, avg(rating) AS "Ratings Usuarios" FROM articles INNER JOIN ratings ON articles.id = ratings.idArticle
            
            `
        );
        return articles;
    } finally {
        if (connection) connection.release();
    }
};

module.exports = listArticlesQuery;
