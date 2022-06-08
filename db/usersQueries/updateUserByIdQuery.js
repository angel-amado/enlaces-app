const { object, alternatives } = require('joi');
const getConnection = require('../getConnection');

const updateUserByIdQuery = async (idUser, body) => {
    let connection;

    //Transformo el objeto body en un array de propiedades y en un array de valores
    const bodyKeys = Object.keys(body); //['alias']
    const bodyValues = Object.values(body); //['Rambo']

    /* bodyValues.forEach((element) => (values += ', ' + element));
    bodyKeys.forEach((element) => (Keys += ', ' + element));
    console.log(Keys);
    console.log(values);*/

    console.log('Aqui estoy');
    console.log(bodyKeys);
    console.log(bodyValues);

    try {
        connection = await getConnection();
        await connection.query(`UPDATE users SET ${bodyKeys} = ? WHERE id= ?`, [
            idUser,
            `${bodyValues},`,
        ]);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = updateUserByIdQuery;
