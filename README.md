# listaTareas
Esta es la prueba tecnica de listado de tareas Fullstack solicitada

# Pasos para iniciar la aplicacion

1) clonar el repositorio a su maquina local
2) ingresar a cada una de las carpetas una por una e instalar sus dependencias (npm install)
3) el backend se va a desplegar en el puerto 3001 y el frontend en el puerto 3000 (si es necesario cambiar los puertos)
4) inicializar el backend
5) ingresar a la carpeta de backend y ejecutar (npm run start) se desplegara el servidor
6) ingresar a la carpeta de frontend y ejecutar (npm run dev) se desplegara el servidor
7) ingresar a (http://localhost:3001/) tendra la aplicacion funcionando en local

# Explicación Técnica del Desarrollo de la Aplicación de Tareas
1. Estructura del Proyecto
La aplicación se diseñó con una arquitectura dividida en dos partes principales: el frontend y el backend.

Frontend: Se desarrolló utilizando Next.js, un framework de React que permite crear aplicaciones web eficientes y optimizadas. Next.js ofrece características como el renderizado del lado del servidor (SSR) y la generación de sitios estáticos (SSG), lo que mejora el rendimiento y la optimización para SEO.

Backend: Se implementó con Node.js y Express, que proporcionan un entorno ligero y escalable para manejar las operaciones del servidor.

2. Manejo del Estado y Autenticación
Se utilizó el localStorage para gestionar el token de acceso del usuario, permitiendo la autenticación persistente. Esta decisión se tomó para facilitar la experiencia del usuario, ya que el token permite mantener la sesión activa incluso si el usuario recarga la página.

Se implementaron hooks de React (useEffect y useState) para gestionar el estado de las tareas y la sesión del usuario. Esto permite que la interfaz de usuario reaccione de manera eficiente a los cambios en el estado.

3. Interacción con la API
La aplicación realiza llamadas a una API RESTful para gestionar las operaciones CRUD (Crear, Leer, Actualizar, Eliminar) de las tareas:

Fetch API: Se utilizó la API fetch de JavaScript para realizar solicitudes HTTP a la API backend. Esto permite manejar las operaciones asincrónicas de manera clara y eficiente.

Control de Errores: Se implementaron bloques try-catch para gestionar errores en las llamadas a la API, asegurando que la aplicación pueda manejar fallos de red o errores de respuesta de manera amigable para el usuario.

4. Diseño de la Interfaz de Usuario
Se optó por un diseño minimalista y funcional, utilizando CSS para el estilo y la disposición de los elementos.

Componentes: La aplicación se diseñó utilizando componentes de React, lo que permite una mayor reutilización del código y una organización más clara de la lógica de la interfaz.

Formularios Reactivos: Se implementaron formularios reactivos para la creación y edición de tareas, facilitando la interacción del usuario con validaciones en tiempo real.

5. Filtrado y Listado de Tareas
La aplicación incluye un sistema de filtrado que permite a los usuarios ver tareas según su estado (pendiente, en progreso, completada). Esta funcionalidad mejora la experiencia del usuario al proporcionar una forma rápida de gestionar tareas.
