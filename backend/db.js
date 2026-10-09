const mysql = require("mysql2");

//Configuración de la conexión a mySQL
const conexion = mysql.createConnection({
    host: "localhost",  // Servidor local
    user: "root",       // Usuario de MySQL (por defecto en Xampp)
    database: "tienda"  // Nombre de nuestra BD
});

//Comprobar si la conexión fue exitosa
conexion.connect((error) => {
    if (error) {
        console.error("❌ Error al conectar con MySQL:", error);
        return;
    }
    console.log("✔️ Conexión exitosa a MySQL");
})


// Exportar la conexion para reutilizarla en las rutas del servidor
module.exports = conexion;