const insertArticleQuery = require('../../db/articlesQueries/insertArticleQuery');
const { generateError } = require('../../helpers');

const newArticle = async (req, res, next) => {
    try {
        // Obtenemos los campos del body y del header
        const { url, title, description } = req.body;
        const idUser = req.idUser;

        // Si faltan campos lanzamos un error.
        if (!url || !title || !description) {
            throw generateError('Faltan campos', 400);
        }

        const idArticle = await insertArticleQuery(
            url,
            title,
            description,
            idUser
        );

        res.send({
            status: 'ok',
            message: `Publicación creada con número de id ${idArticle}`,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = newArticle;
