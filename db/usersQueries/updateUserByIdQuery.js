const getConnection = require('../getConnection');
const bcrypt = require('bcrypt');

const updateUserByIdQuery = async (idUser, body) => {
    let connection;

    //Transformo el objeto en un array
    const bodyKeys = Object.keys(body);
    const bodyValues = Object.values(body);

    let myQuery = ' ';
    for (let i = 0; i < bodyKeys.length; i++) {
        if (bodyKeys[i] === 'password') {
            bodyValues[i] = await bcrypt.hash(bodyValues[i], 10);
        }
        myQuery += `${bodyKeys[i]} = "${bodyValues[i]}"`;
        if (i < bodyKeys.length - 1) {
            myQuery += ', ';
        }
    }

    try {
        connection = await getConnection();
        await connection.query(`UPDATE users SET${myQuery} WHERE id= ?`, [
            idUser,
        ]);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = updateUserByIdQuery;
