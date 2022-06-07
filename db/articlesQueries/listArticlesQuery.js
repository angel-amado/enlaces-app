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
            SELECT url, title, description FROM articles
            `
        );
        return articles;
    } finally {
        if (connection) connection.release();
    }
};

module.exports = listArticlesQuery;
