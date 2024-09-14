# Navippon - Proyecto Final

## Descripción del Proyecto

**Navippon** es una aplicación de planificación de viajes a Japón. Su objetivo principal es mostrar atractivos turísticos para que los usuarios puedan personalizar su viaje y elegir los lugares que más les interesen. Además, Navippon busca crear una comunidad de amantes de Japón a través de noticias y comentarios de los viajeros. Mientras mis compañeros implementaron los atractivos turísticos, yo estoy presentando el Blog de la página.

#### Funcionalidades Implementadas

### Registro de Usuarios

Los usuarios pueden registrarse en la aplicación, convirtiéndose en autores que pueden publicar sus noticias y experiencias de viaje.

### Perfil de Usuario

Los usuarios pueden modificar su perfil, incluyendo la foto y datos personales para mantener su información actualizada.

### Gestión de Publicaciones

Los usuarios pueden ver, crear y modificar sus publicaciones, compartiendo sus experiencias y recomendaciones sobre Japón.

### Ver Actividades

Los usuarios pueden explorar diversas actividades y atractivos turísticos disponibles en Japón, con descripciones detalladas y opciones de filtro para encontrar lo que más les interese.

### Agregar Viajes

Los usuarios pueden planificar y agregar sus viajes personalizados, seleccionando los lugares que desean visitar y creando itinerarios.

### Agregar Amigos

La aplicación permite a los usuarios agregar amigos, facilitando la creación de una comunidad de viajeros con intereses similares.

### Filtrar por Prefecturas o Categorías

Los usuarios pueden filtrar las actividades y atractivos turísticos por prefecturas y categorías específicas, mejorando la experiencia de búsqueda y personalización del viaje.

##### Funcionalidades en Proceso

### Eliminar y Editar Viajes

Se está trabajando en la funcionalidad que permitirá a los usuarios eliminar y editar los viajes que han planificado.

### Agregar Preferencias/Intereses de Usuarios

Función que permitirá a los usuarios agregar sus preferencias e intereses, por ejemplo: "anime", "aire libre", personalizando aún más su experiencia en la aplicación.

### Agregar Actividades a Cada Día de los Viajes

Los usuarios podrán agregar actividades específicas a cada día de sus itinerarios de viaje.

### Buscador de Actividades

Se implementará un buscador que permitirá a los usuarios encontrar actividades de manera rápida y eficiente.

### Filtros en la Página de Actividades

Agregar filtros a la página de actividades para hacer más fácil la búsqueda de actividades específicas según los intereses de los usuarios.

### Reseñas de Actividades

Los usuarios podrán dejar reseñas y calificaciones en las actividades.

## Tecnologías Utilizadas

- **MongoDB**: Base de datos NoSQL utilizada para almacenar la información de los usuarios, publicaciones, actividades, y otros datos relacionados.
- **Express**: Framework de servidor web para Node.js, utilizado para construir la API de la aplicación.
- **React**: Biblioteca de JavaScript para construir las interfaces de usuario de la aplicación.
- **Node.js**: Entorno de ejecución de JavaScript del lado del servidor, utilizado para construir el backend de la aplicación.

## Pasos para Ejecutar el Proyecto

### Conectar MongoDB

mongodb+srv://diazramr:1234@navippon.oa01uiu.mongodb.net/Navippon

instalar dependencias - npm install dotenv cors mongoose multer helmet morgan bcrypt jsonwebtoken

En el directorio del servidor, ejecutar: npm run dev.
En el directorio del cliente, ejecutar: npm run dev.
Con estos comandos, se inicia el entorno de desarrollo tanto del servidor como del cliente, permitiendo que la aplicación funcione correctamente.
