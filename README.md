Aplicaciones Híbridas:

Datos del proyecto:

Alumnos: Santiago Medina y Tomas Morrone.
Materia: Aplicaciones Híbridas.
Docente: Jonathan Emanuel Cruz. 
Comisión: DWM4AP.

Este proyecto es una aplicación web fullstack MERN (MongoDB + Express + React + Node.js) 
que gestiona usuarios, humanos e infectados dentro de un entorno de temática apocalíptica.

Incluye autenticación JWT, rutas protegidas, y un frontend con React y React Router.

Tecnologías utilizadas:
Frontend:
React + Vite
React Router DOM
Context API
CSS

Backend:
Node.js + Express
MongoDB + Mongoose
JWT
bcryptjs
express-validator
dotenv

Estructura del proyecto
proyecto-final
│
├── backend/
|   |__config
|   |   |__db.js
│   ├── index.js
│   ├── .env
│   ├── models/
│   │   └── HumanModel.js
|   |   └── InfectedModel.js
|   |   └── UserModel.js
│   ├── controllers/
│   │   ├── authController.js
│   │   └── HumanController.js
│   │   ├── InfectedController.js
│   │   └── UserController.js
│   ├── middlewares/
│   │   └── auth.js
|   |   └── handlevalidation.js
│   └── routes/
│   |   ├── authRoutes.js
│   |   └── userRoutes.js
|   |   ├── HumanRoutes.js
│   |   └── InfectedRoutes.js
|   └── utils/
|       └── validators.js
|
│
└── frontend/
|   ├── index.html
|   ├── vite.config.js
|   ├── src/
|   │   ├── App.jsx
|   │   ├── main.jsx
|   │   ├── index.css
|   │   ├── router/
|   │   │   ├── AppRouter.jsx
|   │   │   └── PrivateRoute.jsx
|   │   ├── contexts/
|   │   │   └── AuthContext.jsx
|   │   ├── components/
|   │   │   ├── Navbar.jsx
|   │   │   ├── HumanForm.jsx
|   │   │   └── InfectedForm.jsx
|   │   └── pages/
|   │       ├── LoginPage.jsx
|   │       ├── RegisterPage.jsx
|   │       ├── Home.jsx
|   │       ├── HumanPage.jsx
|   │       └── InfectedPage.jsx

Instalación y ejecución

1. Clonar el repositorio
bash
git clone https://github.com/Santiago9111/aplicaciones_hibridas_medina_morrone_tp2.git
cd aplicaciones_hibridas_medina_morrone_tp2

2. Backend
Instalar dependencias:
bash
cd backend
npm install

Ejecutar servidor:
bash
npm start

El backend correrá en:  
http://localhost:5000

3. Frontend

Instalar dependencias:
bash
cd frontend
npm install

Ejecutar el cliente:
bash
npm run dev

El frontend correrá en:  
http://localhost:5173

Autenticación JWT

El sistema usa tokens JWT para proteger rutas del backend y del frontend.  
Cuando el usuario inicia sesión o se registra, el servidor genera un token:

El frontend guarda ese token en `localStorage` y lo usa en cada petición con:

Rutas del backend
Endpoints principales:
1. Usuarios

GET /api/users => Listar todos los usuarios

GET /api/users/:id => Obtener usuario por ID

POST /api/users => Crear usuario

PUT /api/users/:id => Actualizar usuario

DELETE /api/users/:id => Eliminar usuario

2. Humanos

GET /api/humans => Listar todos los humanos

GET /api/humans/:id => Obtener humano por ID

POST /api/humans => Crear humano

PUT /api/humans/:id => Actualizar humano

DELETE /api/humans/:id => Eliminar humano

3. Infectados

GET /api/infecteds => Listar todos los infectados

GET /api/infecteds/:id => Obtener infectado por ID

POST /api/infecteds => Crear infectado

PUT /api/infecteds/:id => Actualizar infectado

DELETE /api/infecteds/:id => Eliminar infectado

El middleware `auth.js` valida el token JWT para permitir el acceso a estas rutas.

Contexto de autenticación (frontend)

`AuthContext.jsx` guarda el usuario y token globalmente

jsx
import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  const login = (token, userData) => {
    localStorage.setItem("token", token);
    setToken(token);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    setUser(null);
  };

  useEffect(() => {
    if (!token) logout();
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

Rutas protegidas

`PrivateRoute.jsx` evita que se acceda al contenido sin estar logueado:

jsx
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

export default function PrivateRoute({ children }) {
  const { token } = useContext(AuthContext);
  return token ? children : <Navigate to="/" replace />;
}

Formularios de Login y Registro

Ambos comparten diseño y validación:

Se muestran mensajes de error del backend (como “usuario ya existe” o “email inválido”).
Se aplica un diseño moderno y oscuro con CSS.
Tras iniciar sesión o registrarse, se guarda el token y se redirige al `/home`.


Páginas principales

 Página 
`/login` Formulario de inicio de sesión 
 `/register` Registro de nuevos usuarios 
 `/home` Página principal tras iniciar sesión
 `/humans` Gestión de humanos (CRUD)
 `/infecteds`  Gestión de infectados (CRUD) 
