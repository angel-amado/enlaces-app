const listArticlesQuery = require('../../db/articlesQueries/listArticlesQuery');

const listArticles = async (req, res, next) => {
    try {
        const articles = await listArticlesQuery();

        res.send({
            status: 'ok',
            data: {
                articles,
            },
        });
    } catch (err) {
        next(err);
    }
};

module.exports = listArticles;
