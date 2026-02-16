// api/index.js

export default function handler(req, res) {
  res.status(200).json({
    mensaje: "🚀 Motor IA activo. Usa POST en /api/motor-ia para enviar prompts."
  });
}
