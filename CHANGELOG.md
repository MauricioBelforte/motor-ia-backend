# Historial de Cambios (Changelog)

Este documento registra los cambios importantes realizados en el proyecto `motor-ia-backend`.

## Versión 2.1 - Priorización de Gemini

### ⚙️ Cambios en Configuración

*   **Prioridad de Proveedores**: Se ha modificado el orden de proveedores en `consultasModelos.js` para establecer a **Gemini** como el proveedor principal por defecto. El motor ahora intentará realizar las consultas primero con Gemini antes de pasar a los proveedores de fallback (OpenRouter, Groq, etc.).

---

## Versión 2.0 - Refactorización del Motor de Consultas y Soporte para Gemini

Esta actualización introduce una reescritura completa de la lógica de consulta a los modelos de IA, pasando de un sistema de fallback fijo a una arquitectura dinámica y mucho más robusta. Además, se integra oficialmente la API de Gemini.

### ✨ Mejoras Principales

1.  **Motor de Fallback Dinámico (`consultasModelos.js`)**:
    *   Se eliminaron las funciones encadenadas y repetitivas (`consultarModeloConOpenRouter`, `probandoSegundoModelo`, etc.).
    *   Se introdujo una única función principal, `consultarModelosConFallback`, que itera sobre una lista configurable de proveedores (`ORDEN_PROVEEDORES`).
    *   Ahora es posible cambiar el orden de prioridad de los proveedores o añadir nuevos simplemente modificando un array, sin tocar la lógica principal.

2.  **Abstracción de la Lógica de Consulta (`realizarConsulta`)**:
    *   Se creó una función interna `realizarConsulta` que centraliza la lógica de `fetch`.
    *   Esta función adapta dinámicamente el formato de la solicitud (URL, headers, body) según el proveedor.
    *   Maneja de forma transparente las diferencias entre las APIs compatibles con OpenAI y la API de Gemini.

3.  **Integración Completa de Gemini**:
    *   Gemini se ha añadido como un proveedor de primera clase.
    *   Se ha configurado su endpoint y el modelo de autenticación correcto (usando la API key en la URL).
    *   La función `realizarConsulta` construye el cuerpo de la solicitud (`contents`) y extrae la respuesta (`candidates`) siguiendo el formato específico de la API de Gemini.

4.  **Simplificación del Endpoint Principal (`chatbotApi.js`)**:
    *   El handler de la API ahora es mucho más limpio. Realiza una única llamada a `consultarModelosConFallback`.
    *   La lógica de decidir qué proveedor usar ya no reside en el handler, sino en el motor de consultas, mejorando la separación de responsabilidades.

5.  **Manejo de Errores Mejorado**:
    *   El nuevo motor de consultas utiliza bloques `try...catch` para cada intento de proveedor, lo que lo hace más resiliente a fallos de red o errores de API.
    *   Si un proveedor falla, el sistema lo registra y continúa con el siguiente en la lista de forma automática.

### 🗑️ Código Eliminado

*   Se eliminó el archivo `consultarModeloConGemini.js`, ya que su lógica ahora está integrada y abstraída dentro de `consultasModelos.js`.
*   Se eliminaron las funciones `probandoSegundoModelo` y `probandoTercerModelo` de `consultasModelos.js` por ser redundantes.

### ⚙️ Cambios en Configuración

*   **`proveedores.js`**: Actualizado con el endpoint correcto para la API de Gemini.
*   **`modelosPorProveedor.js`**: Se ha añadido una lista de modelos recomendados para Gemini.
*   **`.env.template`**: Se ha añadido la variable `GEMINI_API_KEY` para reflejar el nuevo requisito.

---

Estos cambios hacen que el `motor-ia-backend` sea significativamente más flexible, mantenible y fácil de escalar con nuevos proveedores de IA en el futuro.