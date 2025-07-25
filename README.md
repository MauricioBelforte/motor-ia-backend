# 🧠 chatbot-backend-vercel

Backend desacoplado, modular y serverless, listo para responder prompts IA desde cualquier frontend externo. Este motor fue extraído del proyecto original [`chatbot-flotante`](https://github.com/tu-usuario/chatbot-flotante), como parte de una estrategia técnica de separación de responsabilidades y escalabilidad.

## 🎯 Propósito

Este repositorio contiene la capa lógica y de procesamiento IA del sistema, separada del frontend visual. Está pensado para integrarse desde cualquier cliente mediante `fetch()`.

- 🔄 Motor IA independiente del entorno visual
- 🧪 Compatible con múltiples proveedores como OpenRouter, Groq, Ollama
- 🧰 Listo para ser consultado por cualquier frontend, CMS o sistema externo
- 🌐 Desplegado en Vercel con rutas controladas

## ⚙️ Arquitectura

```text
chatbot-backend-vercel/
├── api/
│   └── chatbotApi.js       # Endpoint principal: procesa prompts y responde
├── lib/
│   ├── consultasModelos.js       # Lógica por modelo específico
│   ├── estadoOpenRouter.js       # Control dinámico de disponibilidad
│   ├── proveedores.js            # Configuración de proveedores
│   └── modelosPorProveedor.js    # Mapeo entre servicios y modelos
├── vercel.json             # Configuración de rutas para deploy serverless
├── .env                    # Claves privadas (no incluidas en este repo)
├── LICENSE                 # Licencia MIT
└── README.md               # Esta documentación 📘
