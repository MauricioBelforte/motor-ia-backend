# Notas de Pruebas Actuales

Este documento sirve como un registro rápido de las configuraciones y objetivos de las pruebas en curso.

## Prioridad de Proveedores: Gemini como Primera Opción (Versión 2.1)

Actualmente, el motor de IA se ha configurado para utilizar **Gemini** como el proveedor principal de modelos de lenguaje.

**Objetivo de la prueba:**
*   Evaluar la velocidad, calidad y estabilidad de las respuestas de los modelos de Gemini (específicamente `gemini-1.5-flash-latest`).
*   Confirmar que el sistema de fallback a otros proveedores (OpenRouter, Groq, etc.) funciona correctamente si la API de Gemini falla.

**Configuración Relevante:**
*   **Archivo:** `api/lib/consultasModelos.js`
*   **Línea de código:** `const ORDEN_PROVEEDORES = ["gemini", "openrouter", "groq", "together"];`

---

### Justificación de los Modelos de Gemini Seleccionados

**¿Por qué usamos `gemini-1.5-flash-latest` y no otros modelos como `gemma` o `gemini-2.5`?**

La razón es la API a la que estamos apuntando. Este motor está diseñado para ser simple y multi-proveedor, utilizando una **API Key** para la autenticación.

1.  **API Utilizada:** Estamos consumiendo la **API de Google AI for Developers** (`generativelanguage.googleapis.com`), que es la que funciona con una clave de API simple.
2.  **Modelos Compatibles:** Los modelos `gemini-1.5-flash-latest` y `gemini-1.5-pro-latest` son los que están disponibles y son estables en este servicio.
3.  **Modelos No Compatibles:** Modelos como `gemma` o la familia `gemini-2.5` generalmente se acceden a través de la plataforma **Google Cloud Vertex AI**. Esta plataforma requiere una autenticación más compleja (OAuth 2.0, Cuentas de Servicio) que no se alinea con la arquitectura actual del motor, que busca tratar a todos los proveedores de manera uniforme.

La selección actual es una decisión deliberada para mantener la simplicidad y consistencia arquitectónica del proyecto.