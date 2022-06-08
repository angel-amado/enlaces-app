# Mi Proyecto API

Descripción de mi proyecto.

## Instalar

Instrucciones de instalación y ejecución.

## Entidades

Articles, Users y Ratings.

## Endpoints

### Usuarios

-   POST (/users) -> Crear un nuevo usuario.
-   POST (/login) -> Acceder con el usuario.
-   PUT (/editprofile) -> Editar el perfil del usuario.

### Publicaciones

-   POST (/article) -> Crea una nueva publicación.
-   GET (/articles) -> Selecciona TODAS las publicaciones.
-   GET (/article/:idArticle) -> Selecciona UNA de las publicaciones.
-   DELETE (/delete/:idArticle) -> Elimina una publicación SOLO si eres el autor.

### Valoraciones

-   POST (/rating/:idArticle) -> Votar publicaciones SOLO de otros usuarios y SOLO se permite una votación por publicación/usuario.
