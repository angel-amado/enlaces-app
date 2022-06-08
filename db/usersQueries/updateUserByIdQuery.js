const { object, alternatives } = require('joi');
const getConnection = require('../getConnection');

const updateUserByIdQuery = async (idUser, body) => {
    let connection;
    let key;
    let value;

    const bodyKeys = ['alias', 'description'];
    const bodyValues = ['rambo', 'soy rambo el luchador'];

    bodyValues.forEach((element) => (values += ', ' + element));
    bodyKeys.forEach((element) => (Keys += ', ' + element));
    console.log(Keys);
    console.log(values);
    //Transformo el objeto en un array
    const bodyKeys = Object.keys(body);
    const bodyValues = Object.values(body);

    console.log('Aqui estoy');
    console.log(idUser);
    //console.log(body);

    console.log(bodyKeys);
    console.log(bodyValues);

    try {
        connection = await getConnection();
        await connection.query(
            `UPDATE users SET ${keys} = ?, ${key2} WHERE id= ?`,
            [`${value},`]
        );
    } finally {
        if (connection) connection.release();
    }
};

module.exports = updateUserByIdQuery;
