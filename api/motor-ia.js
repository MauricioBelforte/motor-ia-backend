// api/motor-ia.js

import { consultarModelosConFallback } from "./lib/consultasModelos.js";

// 🔁 Función serverless que responde peticiones POST con un mensaje del modelo
export default async function handler(req, res) {
    // CORS: aceptar solicitudes desde otros orígenes
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") {
        res.status(200).end();
        return;
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