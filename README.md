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
```

## 📡 Cómo consultarlo desde otro frontend

Ejemplo usando `fetch()`:

```js
const res = await fetch("https://chatbot-backend-vercel.vercel.app/api/chatbotApi", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    systemPrompt: "Respondé como mentor técnico.",
    userPrompt: "¿Qué es un stream en JavaScript?"
  })
});
const { respuesta } = await res.json();
console.log(respuesta);
```

### 📄 Formato esperado del request

```json
{
  "systemPrompt": "Define el tono y rol del asistente",
  "userPrompt": "Mensaje original del usuario"
}
```

> ⚠️ Este backend **no genera contexto**: espera que el cliente prepare los prompts.

## 🧪 IA modular y tolerante a fallos

La carpeta `lib/` contiene toda la lógica desacoplada para interacción con modelos de lenguaje:

- 📊 Selección de proveedor por disponibilidad
- 🔁 Fallback automático en caso de error
- 🧩 Organización clara por servicio y modelo

## 📜 Licencia

Este proyecto está bajo la licencia MIT. Consultá el archivo [`LICENSE`](./LICENSE) para más detalles.

## 🧭 Ecosistema completo

Este backend forma parte de un sistema modular junto al frontend visual embebible:

- 🎨 Interfaz visual desacoplada: [`chatbot-frontend-embed`](https://github.com/tu-usuario/chatbot-frontend-embed)
- 📚 Proyecto histórico original: [`chatbot-flotante`](https://github.com/tu-usuario/chatbot-flotante)

---

```bash
# Versión actual: v1.0-backend
# Autor: Mauricio Belforte
```
```

---

