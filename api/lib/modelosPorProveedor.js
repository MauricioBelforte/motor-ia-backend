export const modelosPorProveedor = {
    openrouter: [
        "deepseek/deepseek-chat-v3-0324:free",
        "moonshotai/kimi-k2:free",
        "mistralai/mistral-small-3.2-24b-instruct"
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
        "gemini-2.0-flash",    // 🚀 NUEVO: El más rápido y capaz del tier gratuito.
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
