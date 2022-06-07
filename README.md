# Mi Proyecto API

Descripción de mi proyecto.

## Instalar

Instrucciones de instalación y ejecución.

## Entidades

Entidades de la base de datos y atributos.

## Endpoints

### Usuarios

-   POST (/users) -> Crear un nuevo usuario ✅
-   POST (/login) -> Acceder con el usuario ✅
-   PUT (/editprofile) -> Editar el perfil del usuario. ** Necesita token**

### Publicaciones

-   POST (/article) -> Crea una nueva publicación. ** Necesita token** ✅
-   GET (/articles) -> Selecciona TODAS las publicaciones ** Necesita token** ✅
-   DELETE (/delete/:idArticle) -> Elimina una publicación SOLO si eres el autor. ** Necesita token** ✅

### Valoraciones

-   POST (/rating/:idArticle) -> Votar publicaciones SOLO de otros usuarios y SOLO se permite una votación por publicación/usuario.
    ** Necesita token** ✅
