# Proyecto API

APP para compartir enlaces

Nuestra aplicación permite a los usuarios registrarse y compartir aquellos enlaces que consideren interesantes. El usuario podrá acompañar ese enlace de un título y una pequeña descripción acerca del contenido del mismo.
Los demás usuarios registrados podrán valorar en un rango desde 1( "enlace muy poco interesante") hasta 5( "enlace muy interesante"), el enlace publicado.

## Instalación y ejecución

1. Descargar el código a nuestro equipo local.
2. Es necesario disponer de una instacia de base de datos MySQL para ejecutar este proyecto. En esa instancia debemos crear una base de datos (CREATE DATABASE nombre\_ base_de_datos;) para las tablas que nuestra aplicación creará automáticamente.
3. Completar el fichero .env de acuerdo a la configuración que tengamos en nuestro equipo local. En el campo SECRET escribiremos la contraseña que será usada más adelante, en el proceso de autenticación.
4. Después de ejecutar 'npm install', debemos lanzar el script 'npm run initDB', que incluirá en la base de datos creada en el paso número dos, todas las tablas completamente configuradas, que son necesarias para que la aplicación funcione.
5. Ejecutar en el servidor que consideremos más adecuado. La aplicación está preparada para nodemon, que se iniciará con el script 'npm run dev'.

## Arquitectura

La arquitectura de la aplicación sigue un esquema Model-View-Controller.

## Entidades de la base de datos

En nuestra base de datos hemos creado tres entidades: users, articles and ratings.

![DB_1](https://user-images.githubusercontent.com/93152011/172813567-a571cce9-96dd-422d-8309-85dd8ea34d60.png)

## Endpoints de la aplicación

### usuarios

-   POST (/users) -> Crear un nuevo usuario.
-   POST (/login) -> Acceder con el usuario.
-   PUT (/users) -> Editar el perfil del usuario.

    ### publicaciones

-   POST (/article) -> Crea una nueva publicación.
-   GET (/article) -> Selecciona TODAS las publicaciones.
-   GET (/article/:idArticle) -> Selecciona UNA de las publicaciones.
-   DELETE (/article/:idArticle) -> Elimina una publicación SOLO si eres el autor.

    ### Valoraciones

-   POST (/article/:idArticle/rating) -> Votar publicaciones SOLO de otros usuarios y SOLO se permite una votación por publicación/usuario.
