export const modelosPorProveedor = {
    openrouter: [

        "deepseek/deepseek-r1-0528:free", // Se demora pero genera una respuesta larga y coherente.
        "arcee-ai/trinity-large-preview:free", // FUNCIONANDO
        "stepfun/step-3.5-flash:free", // FUNCIONANDO, resume bien
        "mistralai/mistral-small-3.2-24b-instruct"


    ],
    groq: [
        "llama-3.1-8b-instant", // FUNCIONANDO
        "gemma2-9b-it",
        "mistral-saba-24b",
        "qwen-2.5-32b",
        "llama3-8b-8192",
        "qwen-2.5-coder-32b"
    ],
    gemini: [


        // --- Versiones anteriores (funcionando) ---
        "gemini-1.5-flash-latest",
        "gemini-1.5-pro-latest",

        // Mejores modelos de Gemini disponibles pero consumen mas
        "gemini-2.5-flash", // 🚀 Flash 2.5: Mejoras en velocidad y contexto.
        "gemini-2.5-flash-lite", // ⚡ Flash 2.5 Lite: Ultra rápido para tareas simples.
        "gemini-3-flash-preview" // ⚡ Avance del próximo modelo Flash.

    ],
    together: [
        "Qwen/Qwen3-235B-A22B-Instruct-2507-tput",
        "moonshotai/Kimi-K2-Instruct",
        "deepseek-ai/DeepSeek-V3"
    ]

};
