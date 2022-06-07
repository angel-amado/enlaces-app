const insertRatingByIdQuery = require('../../db/ratingsQueries/insertRatingByIdQuery');
const selectArticleByIdQuery = require('../../db/articlesQueries/selectArticleByIdQuery');
const { generateError } = require('../../helpers');

const newRating = async (req, res, next) => {
    try {
        const { idArticle } = req.params;
        const { rating } = req.body;
        const idUser = req.idUser;

        // Si falta el rating, lanzamos un error.
        if (!rating) {
            throw generateError('Falta el rating', 400);
        }

        const article = await selectArticleByIdQuery(idArticle);

        // Comprobamos si el usuario tiene permisos para valorar la publicacion.
        if (idUser === article.idUser) {
            throw generateError(
                'Lo sentimos. Solo puede valorar las publicaciones de otros usuarios.',
                403
            );
        }

        const idRating = await insertRatingByIdQuery(idArticle, idUser, rating);

        res.send({
            status: 'ok',
            message: `Su valoración ha sido registrada correctamente con el id ${idRating}`,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = newRating;
