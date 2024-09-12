## Para correr la aplicación:
Coloca todos estos archivos en el mismo directorio.
Ejecuta docker-compose up desde ese directorio.
La API estará disponible en http://localhost:3000, y MongoDB estará disponible en mongodb://localhost:27017/mydb.


# Explicación de las rutas:
POST /usuarios: Crea un nuevo usuario en la base de datos. El cuerpo de la petición debe tener nombre, email y edad.
GET /usuarios: Obtiene la lista de todos los usuarios registrados.
GET /usuarios/:id: Obtiene un usuario específico por su ID.
PUT /usuarios/:id: Actualiza los datos de un usuario existente por su ID.
DELETE /usuarios/:id: Elimina un usuario por su ID.
Ejemplo de JSON para crear o actualizar un usuario:

#
{
  "nombre": "Juan Perez",
  "email": "juan.perez@example.com",
  "edad": 30
}
