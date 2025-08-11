import { proveedores } from './proveedores.js';
import { modelosPorProveedor } from './modelosPorProveedor.js';

// Define el orden de preferencia de los proveedores.
// Puedes cambiar este orden para priorizar a Gemini, Groq, etc.
const ORDEN_PROVEEDORES = ["gemini", "openrouter", "groq", "together"];

/**
 * Función principal que itera sobre los proveedores en el orden definido
 * e intenta obtener una respuesta de un modelo.
 * @param {string} promptSistema - El prompt del sistema.
 * @param {string} promptUsuario - El prompt del usuario.
 * @param {boolean} openRouterDegradado - Flag para saltar OpenRouter si está degradado.
 * @returns {Promise<string|null>} La respuesta del modelo o null si todos fallan.
 */
export async function consultarModelosConFallback(promptSistema, promptUsuario, openRouterDegradado = false) {
    const proveedoresAIntentar = openRouterDegradado
        ? ORDEN_PROVEEDORES.filter(p => p !== "openrouter")
        : ORDEN_PROVEEDORES;

    for (const nombreProveedor of proveedoresAIntentar) {
        const modelos = modelosPorProveedor[nombreProveedor];
        if (!modelos || modelos.length === 0) continue;

        // Por simplicidad, intentamos con el primer modelo de cada proveedor.
        // Se podría extender para intentar con todos los modelos de un proveedor.
        const modelo = modelos[0];
        console.log(`➡️ Intentando con Proveedor: ${nombreProveedor}, Modelo: ${modelo}`);

        try {
            const respuesta = await realizarConsulta(nombreProveedor, modelo, promptSistema, promptUsuario);
            if (respuesta) {
                console.log(`✅ Éxito con Proveedor: ${nombreProveedor}`);
                return respuesta;
            }
            console.warn(`⚠️ Fallo o respuesta vacía de ${nombreProveedor}. Probando siguiente...`);
        } catch (error) {
            console.error(`❌ Error crítico con ${nombreProveedor}:`, error.message);
        }
    }

    console.error("🚫 Todos los proveedores fallaron.");
    return null; // O un mensaje de error por defecto
}

/**
 * Realiza la consulta a la API específica del proveedor.
 * Esta función adapta la solicitud al formato de cada API (OpenAI-like vs Gemini).
 * @param {string} nombreProveedor - "openrouter", "gemini", etc.
 * @param {string} modelo - El nombre del modelo a usar.
 * @param {string} promptSistema - El prompt del sistema.
 * @param {string} promptUsuario - El prompt del usuario.
 * @returns {Promise<string|null>} La respuesta del modelo.
 */
async function realizarConsulta(nombreProveedor, modelo, promptSistema, promptUsuario) {
    const proveedor = proveedores[nombreProveedor];
    if (!proveedor || !proveedor.key) {
        console.error(`Proveedor ${nombreProveedor} no configurado o sin API Key.`);
        return null;
    }

    let url = proveedor.endpoint;
    let options;

    if (nombreProveedor === 'gemini') {
        // Lógica específica para la API de Gemini
        url = `${proveedor.endpoint}/${modelo}:generateContent?key=${proveedor.key}`;
        options = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [
                    // Gemini combina el prompt de sistema y de usuario
                    { role: "user", parts: [{ text: `${promptSistema}\n\n${promptUsuario}` }] }
                ]
            })
        };
    } else {
        // Lógica para APIs compatibles con OpenAI (OpenRouter, Groq, Together)
        options = {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${proveedor.key}`,
                "Content-Type": "application/json",
                "HTTP-Referer": "http://localhost:3000", // O tu dominio en producción
                "X-Title": "Mi Sitio Web"
            },
            body: JSON.stringify({
                model: modelo,
                messages: [
                    { role: "system", content: promptSistema },
                    { role: "user", content: promptUsuario }
                ]
            })
        };
    }

    const response = await fetch(url, options);
    if (!response.ok) {
        throw new Error(`Error HTTP ${response.status}: ${await response.text()}`);
    }

    const data = await response.json();

    // Extraer la respuesta según el formato de la API
    if (nombreProveedor === 'gemini') {
        return data.candidates?.[0]?.content?.parts?.[0]?.text || null;
    }
    return data.choices?.[0]?.message?.content || null;
}
