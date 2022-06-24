const getConnection = require('./getConnection');
const chalk = require('chalk');

async function main() {
    let connection;

    try {
        connection = await getConnection();

        console.log(chalk.yellow('Inicializando DB'));

        await connection.query('DROP TABLE IF EXISTS ratings');
        await connection.query('DROP TABLE IF EXISTS articles');
        await connection.query('DROP TABLE IF EXISTS users');

        console.log(chalk.green('Creando tablas...'));

        await connection.query(`
            CREATE TABLE users (
                id INTEGER UNSIGNED PRIMARY KEY AUTO_INCREMENT,
                alias VARCHAR(20) UNIQUE NOT NULL,
                name VARCHAR(40) NOT NULL,
                firstName VARCHAR(50) NOT NULL,
                lastName VARCHAR(50) NOT NULL,
                email VARCHAR(50) UNIQUE NOT NULL,
                password VARCHAR(75) NOT NULL,
                biography VARCHAR(210),  
                picture VARCHAR(100),
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                modifiedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )
        `);

        await connection.query(`
            CREATE TABLE articles (
                id INTEGER UNSIGNED PRIMARY KEY AUTO_INCREMENT,
                idUser INTEGER UNSIGNED NOT NULL,
                FOREIGN KEY (idUser) REFERENCES users(id) ON DELETE CASCADE,
                url VARCHAR(100) NOT NULL,
                title VARCHAR(100) NOT NULL,
                description VARCHAR(220) NOT NULL,
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                modifiedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )
        `);

        await connection.query(`
            CREATE TABLE ratings (
                id INTEGER UNSIGNED PRIMARY KEY AUTO_INCREMENT,
                idUser INTEGER UNSIGNED NOT NULL,
                FOREIGN KEY (idUser) REFERENCES users(id) ON DELETE CASCADE,
                idArticle INTEGER UNSIGNED NOT NULL,
                FOREIGN KEY (idArticle) REFERENCES articles(id) ON DELETE CASCADE,
                rating TINYINT UNSIGNED NOT NULL,
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                modifiedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )
        `);

        console.log(chalk.green('Tablas creadas'));
    } catch (err) {
        console.error(err);
    } finally {
        if (connection) connection.release();
        process.exit();
    }
}

main();
