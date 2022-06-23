const getConnection = require('../getConnection');

const selectUserByIdQuery = async (idUser) => {
    let connection;

    try {
        connection = await getConnection();

        const [users] = await connection.query(
            `SELECT picture FROM users WHERE id = ?`,
            [idUser]
        );

        return users[0];
    } finally {
        if (connection) connection.release();
    }
};

module.exports = selectUserByIdQuery;
