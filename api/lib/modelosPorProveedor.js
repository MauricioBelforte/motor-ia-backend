export const modelosPorProveedor = {
    openrouter: [
        "deepseek/deepseek-chat-v3-0324:free",
        "moonshotai/kimi-k2:free",
        "mistralai/mistral-small-3.2-24b-instruct",  

        "google/gemini-2.0-pro-exp-02-05:free",

        "google/gemini-2.0-flash-lite-preview-02-05:free", // Nuevo modelo gratuito en OpenRouter.
        "mistralai/mistral-7b-instruct:free",              // Un clásico muy estable.
        "meta-llama/llama-3-8b-instruct:free",             // Rápido y fiable.
        "microsoft/phi-3-mini-128k-instruct:free",         // Muy ligero y rápido.
        "mistralai/mistral-small-3.2-24b-instruct"         // ✅ Este es el que te funcionó en los logs.


    ],
    groq: [
        "llama3-8b-8192",
        "llama-3.1-8b-instant",
        "gemma2-9b-it",
        "mistral-saba-24b",
        "qwen-2.5-32b",
        "qwen-2.5-coder-32b"
    ],
    gemini: [
        // TESTEO DE ESTOS MODELOS
        "gemini-3-pro-preview", // 🧪 Avance del próximo modelo Pro.
        //"gemini-3-flash-preview", // ⚡ Avance del próximo modelo Flash.
        //"gemini-2.5-flash", // 🚀 Flash 2.5: Mejoras en velocidad y contexto.
        //"gemini-2.5-flash-lite", // ⚡ Flash 2.5 Lite: Ultra rápido para tareas simples.
        "gemini-2.5-pro", // 🧪 Pro 2.5: Mayor capacidad de razonamiento.
        "gemini-2.0-flash",    // 🚀 NUEVO: El más rápido y capaz del tier gratuito.
        "gemini-2.0-flash-lite", // ⚡ Flash Lite: Respuestas rápidas para tareas sencillas.

        // MODELOS RECOMENDADOS
        "gemini-1.5-flash",    // Versión estándar estable.
        "gemini-1.5-pro",      // Modelo más potente, puede ser más lento.
        "gemini-1.5-flash-8b", // Versión ultra ligera para respuestas instantáneas.
        // --- Versiones anteriores (funcionando) ---
        // "gemini-1.5-flash-latest",
        // "gemini-1.5-pro-latest",
    ],
    together: [
        "Qwen/Qwen3-235B-A22B-Instruct-2507-tput",
        "moonshotai/Kimi-K2-Instruct",
        "deepseek-ai/DeepSeek-V3"
    ]

};
