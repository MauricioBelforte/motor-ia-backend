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
        "gemini-1.5-flash-latest", // Buena opción si buscas un modelo rápido con generosos límites.
        "gemini-1.5-pro-latest", // Muy potente, pero con límites de uso gratuito más estrictos.
        "gemini-2.5-flash-latest", // La mejor opción de la familia Gemini para uso gratuito masivo.
        "gemini-2.5-pro-latest", // El más potente, pero con los límites de uso gratuito más bajos.
        "gemma-2-9b-it" // Más tokens gratis, sin tantas restricciones de frecuencia.
    ],
    together: [
        "Qwen/Qwen3-235B-A22B-Instruct-2507-tput",
        "moonshotai/Kimi-K2-Instruct",
        "deepseek-ai/DeepSeek-V3"
    ]

};
