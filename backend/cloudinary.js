require("dotenv").config();
const cloudinary = require("cloudinary").v2

// CONFIGURACIÓN DEL ALMACENAMIENTO EN LA NUBRE

// Usamos .trim() para eliminar espacios accidentales al final de cadad línea en .env
const cloudName = (process.env.CLOUDINARY_CLOUD_NAME || "").trim();
const apiKey = (process.env.CLOUDINARY_API_KEY || "").trim();
const apiSecret = (process.env.CLOUDINARY_API_SECRET || "").trim();


cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret
});


// Recibe una imagen en format Base64 desde el frontend, la sube a Cloudinary
// en la carpeta "mi_tienda_productos" y retorna un enlace seguro (https)

async function subirImagenCloudinary(imagenBase64) {
    if (!cloudName || !apiKey || !apiSecret) {
        throw new Error(
            "Faltan las credenciales de Cloudinary en el archivo .env"
        );
    }

    // Detectar si el API Secret se copió truncado "..." desde la tabla de Cloudinary
    if (apiSecret.includes("...")) {
        throw new Error(
            "Tu API_SECRET en .env está incompleta"
        );
    }

    const resultado = await cloudinary.uploader.upload(imagenBase64, {
        folder: "mi_tienda_productos",
        resource_type: "image",
    });

    // Retornamos la URL pública segura (https://...)
    return resultado.secure_url;
}

module.exports = { cloudinary, subirImagenCloudinary };