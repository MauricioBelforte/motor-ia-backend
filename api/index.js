// api/index.js

export default function handler(req, res) {
  res.status(200).json({
    mensaje: "🚀 Este backend está activo. Usá POST en /api/chatbotApi para enviar prompts."
  });
}
