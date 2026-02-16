export const modelosPorProveedor = {
    openrouter: [
        

        "google/gemini-2.0-pro-exp-02-05:free",

        "google/gemini-2.0-flash-lite-preview-02-05:free", // Nuevo modelo gratuito en OpenRouter.
        "mistralai/mistral-7b-instruct:free",              // Un clásico muy estable.
        "meta-llama/llama-3-8b-instruct:free",             // Rápido y fiable.
        "microsoft/phi-3-mini-128k-instruct:free",         // Muy ligero y rápido.
        
        "deepseek/deepseek-r1-0528:free",
        "meta-llama/llama-3.3-70b-instruct:free",
        "mistralai/mistral-small-3.2-24b-instruct",
        "mistralai/mistral-small-3.1-24b-instruct:free"        // ✅ Este es el que te funcionó en los logs.


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


        // --- Versiones anteriores (funcionando) ---
        // "gemini-1.5-flash-latest",
        // "gemini-1.5-pro-latest",

        // Mejores modelos de Gemini disponibles pero consumen mas
        //"gemini-3-flash-preview", // ⚡ Avance del próximo modelo Flash.
        //"gemini-2.5-flash", // 🚀 Flash 2.5: Mejoras en velocidad y contexto.
        //"gemini-2.5-flash-lite", // ⚡ Flash 2.5 Lite: Ultra rápido para tareas simples.

    ],
    together: [
        "Qwen/Qwen3-235B-A22B-Instruct-2507-tput",
        "moonshotai/Kimi-K2-Instruct",
        "deepseek-ai/DeepSeek-V3"
    ]

};
