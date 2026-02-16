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
        "gemini-1.5-flash-latest", // Modelo rápido y compatible con la API de Google AI Studio (v1beta).
        "gemini-1.5-pro-latest",   // Modelo potente, también compatible.
        // Los siguientes modelos (gemma, 2.5) pueden no estar disponibles en la API v1beta
        // o requerir acceso a través de Vertex AI. Los dejamos comentados para evitar errores.
        // "gemini-2.5-flash-latest",
        // "gemini-2.5-pro-latest",
        // "gemma-2-9b-it"
    ],
    together: [
        "Qwen/Qwen3-235B-A22B-Instruct-2507-tput",
        "moonshotai/Kimi-K2-Instruct",
        "deepseek-ai/DeepSeek-V3"
    ]

};
