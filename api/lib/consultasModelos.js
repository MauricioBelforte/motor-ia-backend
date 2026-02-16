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
    const proveedoresAIntentar = ORDEN_PROVEEDORES;

    for (const nombreProveedor of proveedoresAIntentar) {
        if (nombreProveedor === 'openrouter' && openRouterDegradado) {
            console.warn("⏭️ Saltando OpenRouter porque su límite de uso fue alcanzado.");
            continue;
        }

        const modelos = modelosPorProveedor[nombreProveedor];
        if (!modelos || modelos.length === 0) {
            console.warn(`⚠️ No hay modelos configurados para el proveedor: ${nombreProveedor}`);
            continue;
        }

        for (const modelo of modelos) {
            console.log(`➡️ Intentando con Proveedor: ${nombreProveedor}, Modelo: ${modelo}`);

            try {
                const respuesta = await realizarConsulta(nombreProveedor, modelo, promptSistema, promptUsuario);
                if (respuesta) {
                    console.log(`✅ Éxito con Proveedor: ${nombreProveedor}, Modelo: ${modelo}`);
                    console.log(`💬 Respuesta extraída (primeros 100 chars): "${respuesta.substring(0, 100)}..."`);
                    return respuesta; // Éxito, salimos de todo
                }
                // Si la respuesta es nula pero no hay error, el bucle continúa al siguiente modelo/proveedor.
            } catch (error) {
                console.error(`❌ Error con ${nombreProveedor} (${modelo}):`, error.message);
                // No rompemos el bucle, simplemente continuamos con el siguiente modelo.
            }
        }
        // Si llegamos aquí, todos los modelos de este proveedor fallaron.
        console.warn(`⚠️ Todos los modelos de ${nombreProveedor} fallaron. Probando siguiente proveedor...`);
    }

    console.error("🚫 Todos los proveedores y sus modelos fallaron.");
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
    if (!proveedor) {
        // Esto no debería ocurrir si ORDEN_PROVEEDORES es correcto, pero es una buena salvaguarda.
        throw new Error(`Proveedor "${nombreProveedor}" no se encuentra en la configuración de proveedores.js.`);
    }
    if (!proveedor.key) {
        // Error de configuración crítico. Lanzamos un error para que sea capturado y logueado.
        throw new Error(`Falta la API Key para el proveedor: ${nombreProveedor}. Revisa las variables de entorno.`);
    }

    let url = proveedor.endpoint;
    let options;

    if (nombreProveedor === 'gemini') {
        // Lógica específica para la API de Gemini
        url = `${proveedor.endpoint}/${modelo}:generateContent`;
        options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-goog-api-key": proveedor.key // Método recomendado para enviar la API Key
            },
            body: JSON.stringify({
                contents: [{ role: "user", parts: [{ text: `${promptSistema}\n\n${promptUsuario}` }] }]
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
    console.log(`📦 Datos recibidos de ${nombreProveedor}:`, JSON.stringify(data, null, 2));

    // Extraer la respuesta según el formato de la API
    if (nombreProveedor === 'gemini') {
        return data.candidates?.[0]?.content?.parts?.[0]?.text || null;
    }
    return data.choices?.[0]?.message?.content || null;
}
