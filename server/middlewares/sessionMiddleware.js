import Session from '../models/Session.js';

const sessionMiddleware = async (req, res, next) => {
  try {
    const sessionToken = req.cookies['next-auth.session-token']; // Se obtiene el token de sesión
    console.log(sessionToken);
    // Si el token no se encuentra termina con error
    if (!sessionToken) {
      return res.status(401).json({ error: 'No se ha iniciado sesión' });
    }

    const session = await Session.findOne({ sessionToken: sessionToken }); // Busca el token de sesión en la colección

    if (session) {
      // El token de sesión es válido
      req.user = { id: session.userId.toString() }; // Envia el id del usuario en la respuesta
      next(); // Continúa con la siguiente función de middleware o ruta
    } else {
      // El token de sesión no es válido
      res.status(401).json({ error: 'Token de sesión inválido' }); // Envía una respuesta de error
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error de autenticación' }); // Manejo de errores
  }
};

export { sessionMiddleware };
