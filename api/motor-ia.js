// api/motor-ia.js

import { consultarModelosConFallback } from "./lib/consultasModelos.js";

// 🛡️ LISTA BLANCA: Agrega aquí los dominios que tienen permiso para usar tu API
const origenesPermitidos = [
    "http://localhost:5500",           // Para tus pruebas locales (Live Server)
    "http://localhost:3000",           // Por si usas React/Vite local
    "https://mauriciobelforte.github.io", // ✅ Correcto: Cubre todo tu dominio (incluyendo /mi-portfolio)
    "https://mi-chatbot-personal.vercel.app", // 🆕 Demo completa del chatbot
    "https://chatbot-frontend-funcional.vercel.app", // Ejemplo de tu otro frontend
    "null"                             // 🛠️ Permite pruebas desde about:blank o archivos locales
];

// 🔁 Función serverless que responde peticiones POST con un mensaje del modelo
export default async function handler(req, res) {
    // 🕵️‍♂️ Verificamos el origen de la petición
    const origen = req.headers.origin;

    // 🛡️ Bloque de seguridad CORS: Solo permitimos orígenes de la lista blanca.
    // La condición `!origen` permite peticiones sin origen (como Postman) para facilitar las pruebas.
    // Para una seguridad máxima en producción, podrías eliminar `|| !origen`.
    if (origen && !origenesPermitidos.includes(origen)) {
        return res.status(403).json({ error: "Acceso denegado: Origen no permitido." });
    }

    // Si el origen es válido (o no existe), configuramos los headers para permitir la comunicación.
    res.setHeader("Access-Control-Allow-Origin", origen || "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") {
        return res.status(204).end(); // Usar 204 No Content es más estándar para preflight
    }

    // ⛔ Solo aceptamos POST (evita GET, PUT, etc.)
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Método no permitido" });
    }


    const { promptSistema, promptUsuario } = req.body;

    if (
        !promptSistema ||
        !promptUsuario ||
        typeof promptUsuario !== "string" ||
        promptUsuario.trim().length === 0
    ) {
        return res.status(400).json({ error: "Prompts inválidos o faltantes" });
    }

    try {
        // 🔐 El chequeo de estado de OpenRouter se desactiva por defecto para minimizar la latencia en producción.
        /*   Para realizar pruebas de degradación del servicio, se puede descomentar la importación de arriba,
          la siguiente línea y pasar `estadoOpenRouter.degradado` como tercer argumento a la función de abajo. */
        // const estadoOpenRouter = await chequearLimiteOpenRouter();

        console.log("Recibidos prompts. Iniciando consulta a modelos...");

        const respuesta = await consultarModelosConFallback(promptSistema, promptUsuario);

        if (respuesta) {
            res.status(200).json({ respuesta });
        } else {
            res.status(503).json({ error: "Todos los proveedores de IA fallaron. Intente de nuevo más tarde." });
        }
    } catch (error) {
        console.error("Error inesperado en el handler de la API:", error);
        res.status(500).json({ error: "Ocurrió un error interno en el servidor." });
    }
}