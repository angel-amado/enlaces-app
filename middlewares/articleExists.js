const { generateError } = require('../helpers');
const selectArticleByIdQuery = require('../db/articlesQueries/selectArticleByIdQuery');

const articleExists = async (req, res, next) => {
    try {
        const { idArticle } = req.params;

        const dataExists = await selectArticleByIdQuery(idArticle);

        if (!dataExists) throw generateError('Publicación no encontrada', 404);

        // Saltamos al siguiente controlador.
        next();
    } catch (error) {
        next(error);
    }
};

module.exports = articleExists;
