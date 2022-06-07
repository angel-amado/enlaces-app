const getConnection = require('../getConnection');

const updateUserByIdQuery = async (
    idUser,
    alias,
    name,
    firstName,
    lastName,
    email,
    password,
    biography,
    imgName
) => {
    let connection;

    try {
        connection = await getConnection();
        await connection.query(
            `UPDATE users SET alias = ?, name = ?, firstName = ?,lastName = ?, email = ?,password = ?, biography = ? ,picture = ? WHERE id= ?`,
            [
                alias,
                name,
                firstName,
                lastName,
                email,
                password,
                biography,
                imgName,
                idUser,
            ]
        );
    } finally {
        if (connection) connection.release();
    }
};

module.exports = updateUserByIdQuery;
