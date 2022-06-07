const deleteArticleByIdQuery = require('../../db/articlesQueries/deleteArticleByIdQuery');
const selectArticleByIdQuery = require('../../db/articlesQueries/selectArticleByIdQuery');
const { generateError } = require('../../helpers');

const deleteArticle = async (req, res, next) => {
    try {
        const { idArticle } = req.params;

        const article = await selectArticleByIdQuery(idArticle);

        // Comprobamos si el usuario tiene permisos para borrar la publicacion.
        if (req.idUser !== article.idUser) {
            throw generateError(
                'No tiene autorización para borrar esta publicación.',
                401
            );
        }

        await deleteArticleByIdQuery(idArticle);

        res.send({
            status: 'ok',
            message: `La publicación ha sido borrada.`,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = deleteArticle;
