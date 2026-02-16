# 🛡️ Guía de Seguridad CORS (Cross-Origin Resource Sharing)

Este documento explica cómo funciona la seguridad en el archivo `api/motor-ia.js` para proteger tus créditos de IA y evitar que sitios no autorizados usen tu backend.

## 🧠 ¿Cómo funciona la protección?

El sistema utiliza una **Lista Blanca (Whitelist)**. En lugar de permitir el acceso a todo el mundo (`*`), el backend verifica de dónde viene cada petición (`Origin`) y solo responde si ese origen está explícitamente autorizado.

### Lógica simplificada:
1.  Llega una petición.
2.  El servidor mira el encabezado `Origin`.
3.  **¿Está en la lista blanca?**
    *   ✅ **SÍ:** Se permite el acceso y se responde normalmente.
    *   ❌ **NO:** Se rechaza inmediatamente con un error `403 Forbidden` (Acceso Denegado).

---

## ⚙️ Configuración

La configuración se encuentra al principio del archivo `api/motor-ia.js`:

```javascript
const origenesPermitidos = [
    "http://localhost:5500",           // Pruebas locales
    "https://mauriciobelforte.github.io", // Tu dominio principal
    "null"                             // Pruebas desde archivos locales o about:blank
];
```

### ➕ Cómo agregar un nuevo sitio permitido

Si despliegas un nuevo proyecto (por ejemplo, en Netlify o Vercel) y quieres que use este motor de IA:

1.  Copia la URL base del dominio (sin `/` al final).
2.  Agrégala al array `origenesPermitidos` como un string más.

**Ejemplo:**
```javascript
"https://mi-nuevo-proyecto.netlify.app"
```

> **Nota:** Al autorizar el dominio principal (`https://dominio.com`), automáticamente autorizas todas sus subrutas (`/blog`, `/app`, etc.).

---

## 🛠️ Casos Especiales

### 1. Pruebas Locales (`localhost`)
Para probar desde tu computadora mientras desarrollas, asegúrate de tener `http://localhost:PUERTO` en la lista.

### 2. Pruebas Manuales (`about:blank` o Archivos HTML)
Cuando abres un archivo HTML directamente en tu navegador (doble clic) o pruebas desde una pestaña vacía, el navegador envía el origen como `"null"`.
*   Por eso incluimos `"null"` en la lista blanca.
*   ⚠️ **En producción estricta**, podrías querer quitar esto, pero es muy útil para desarrollo.

### 3. Postman / Insomnia / Backend-to-Backend
Las herramientas de desarrollo y las peticiones de servidor a servidor **no suelen enviar el encabezado `Origin`**.
*   **Comportamiento actual:** El código permite peticiones sin origen (`!origen`) para facilitar tus pruebas.
*   **Para máxima seguridad:** Si quieres bloquear esto, elimina la condición `|| !origen` en el `if` de seguridad.

---

## 🚨 Solución de Problemas

*   **Error `403 Forbidden`:** El dominio desde el que intentas acceder **no está** en la lista blanca. Agrégalo.
*   **Error de CORS en consola (Rojo):** El navegador bloqueó la respuesta porque el servidor no envió los headers correctos (consecuencia del bloqueo 403).
*   **Funciona en `github.io` pero no en local:** Revisa si estás usando el puerto correcto en `localhost` (ej: 5500 vs 3000).
```

