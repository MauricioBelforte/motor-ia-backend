// api/chatbotApi.js

import { chequearLimiteOpenRouter } from "./lib/estadoOpenRouter.js";
import { consultarModeloConOpenRouter } from "./lib/consultasModelos.js";
/* 
import { generarContexto } from "../lib/extraerContexto.js";

import { promptSistema, generarPromptUsuario } from "../lib/armarPrompts.js";
 */


// 🔁 Función serverless que responde peticiones POST con un mensaje del modelo
export default async function handler(req, res) {
    // CORS: aceptar solicitudes desde otros orígenes
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") {
        res.status(200).end(); // o podés devolver headers CORS explícitos
        return;
    }


    // ⛔ Solo aceptamos POST (evita GET, PUT, etc.)
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Método no permitido" });
    }

    /*   // 📝 Extraemos el mensaje enviado desde el frontend
      const mensajeDelUsuario = req.body.message; */


    const { promptSistema, promptUsuario } = req.body;

    if (
        !promptSistema ||
        !promptUsuario ||
        typeof promptUsuario !== "string" ||
        promptUsuario.trim().length === 0
    ) {
        return res.status(400).json({ error: "Prompts inválidos o faltantes" });
    }


    /*         const contexto = await generarContexto(mensajeDelUsuario);
            const promptUsuario = generarPromptUsuario(contexto, mensajeDelUsuario);
    
    
     */
    // 🔐 Validamos si OpenRouter está degradado por exceso de uso
    const estado = await chequearLimiteOpenRouter();

    if (estado.degradado) {
        // 🚧 Si está degradado, enviamos mensaje alternativo sin llamar al modelo
        return res.status(200).json({
            respuesta: "⚠️ Modelo OpenRouter degradado. Usando alternativa..."
        });
    }
    console.log("promptSistema:", promptSistema);
    console.log("promptUsuario:", promptUsuario);
    // 📡 Si está todo OK, consultamos al modelo normalmente
    const respuesta = await consultarModeloConOpenRouter(promptSistema, promptUsuario);

    // 📤 Devolvemos la respuesta generada al frontend
    res.status(200).json({ respuesta });
}