
## 🧠 motor-ia-backend

Backend desacoplado, modular y serverless, listo para responder prompts IA desde cualquier frontend externo. Este motor fue extraído del proyecto original [`chatbot-flotante`](https://github.com/MauricioBelforte/chatbot-flotante-historial) que actualmente se llama [`chatbot-flotante-historial`](https://github.com/MauricioBelforte/chatbot-flotante-historial), como parte de una estrategia técnica de separación de responsabilidades y escalabilidad.

> 🟢 *Renombrado desde `chatbot-backend-vercel` a `motor-ia-backend` para reflejar su propósito extendido como motor IA genérico, capaz de procesar cualquier consulta estructurada sin depender de un frontend específico.*

---

## 🎯 Propósito

Este repositorio contiene la capa lógica y de procesamiento IA del sistema, separada del frontend visual. Está pensado para integrarse desde cualquier cliente mediante `fetch()`:

- 🔄 Motor IA independiente del entorno visual
- 🧪 Compatible con múltiples proveedores como OpenRouter, Groq, Ollama
- 🧰 Listo para ser consultado por cualquier frontend, CMS o sistema externo
- 🌐 Desplegado en Vercel con rutas controladas

---

## ⚙️ Arquitectura

```text
motor-ia-backend/
├── api/
│   └── chatbotApi.js            # Endpoint principal: procesa prompts y responde
├── lib/
│   ├── consultasModelos.js      # Lógica por modelo específico
│   ├── estadoOpenRouter.js      # Control dinámico de disponibilidad
│   ├── proveedores.js           # Configuración de proveedores
│   └── modelosPorProveedor.js   # Mapeo entre servicios y modelos
├── vercel.json                  # Configuración de rutas para deploy serverless
├── .env                         # Claves privadas (no incluidas en este repo)
├── LICENSE                      # Licencia MIT
└── README.md                    # Esta documentación 📘
```

---

## 📡 Cómo consultarlo desde otro frontend

Ejemplo usando `fetch()`:

```js
const res = await fetch("https://motor-ia-backend.vercel.app/api/chatbotApi", {
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

> ⚠️ Este motor **no genera contexto automáticamente**: espera que el cliente prepare los prompts (por eso se llama “motor”).

---

## 🧪 IA modular y tolerante a fallos

La carpeta `lib/` contiene toda la lógica desacoplada para interacción con modelos de lenguaje:

- 📊 Selección de proveedor por disponibilidad
- 🔁 Fallback automático en caso de error
- 🧩 Organización clara por servicio y modelo
- ⚙️ Modularidad total para extender o cambiar proveedores sin alterar el núcleo

---

## 📜 Licencia

Este proyecto está bajo la licencia MIT.  
Consultá el archivo [`LICENSE`](./LICENSE) para más detalles.

---

## 🧭 Ecosistema completo

Este motor forma parte del ecosistema IA modular creado por Mauricio Belforte. Está diseñado para integrarse con frontends funcionales, demos personalizadas y otras herramientas IA:

- 🎨 Frontend funcional: [`chatbot-frontend-funcional`](https://github.com/MauricioBelforte/chatbot-frontend-funcional)
- 💬 Demo personalizada: [`demo-mi-chatbot-personal`](https://github.com/MauricioBelforte/demo-mi-chatbot-personal)
- 📚 Cápsula técnica original: [`chatbot-flotante-historial`](https://github.com/MauricioBelforte/chatbot-flotante-historial)

---

```bash
# Versión actual: v1.1-motor
# Autor: Mauricio Belforte
```

---

