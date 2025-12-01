const validators = {
  user: (user) => {
    if (!user.username) return "El nombre de usuario es obligatorio";
    if (!user.email) return "El email es obligatorio";
    if (!user.password || user.password.length < 6) return "La contraseña debe tener al menos 6 caracteres";
    return null;
  },
  human: (human) => {
    if (!human.name) return "El nombre es obligatorio";
    if (!human.age) return "La edad es obligatorio";
    if (!human.description) return "La descripcion es obligatorio";
    if (!human.image) return "La imagen es obligatoria";
    if (human.age && human.age < 0) return "La edad no puede ser negativa";
    return null;
  },
  infected: (infected) => {
    if (!infected.name) return "El nombre es obligatorio";
    if (!infected.age) return "La edad es obligatorio";
    if (!infected.description) return "La descripcion es obligatorio";
    if (!infected.image) return "La imagen es obligatoria";
    return null;
  }
};

export default validators;