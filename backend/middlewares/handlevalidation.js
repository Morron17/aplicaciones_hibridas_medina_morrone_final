const handleValidation = (req, res, next) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({ message: "El cuerpo de la petición está vacío" });
  }
  next();
};

export default handleValidation;