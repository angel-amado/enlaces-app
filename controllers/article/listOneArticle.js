const listArticlesQuery = require('../../db/articlesQueries/listOneArticleQuery');

const listOneArticle = async (req, res, next) => {
    try {
        const { idArticle } = req.params;
        const article = await listArticlesQuery(idArticle);

        res.send({
            status: 'ok',
            data: {
                article,
            },
        });
    } catch (err) {
        next(err);
    }
};

module.exports = listOneArticle;
