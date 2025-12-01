import express from "express";
import { body, validationResult } from "express-validator";
import { register, login } from "../controllers/authController.js";

const router = express.Router();

router.post(
  "/register",
  [
    body("username").notEmpty().withMessage("username es obligatorio"),
    body("email").isEmail().withMessage("email inválido"),
    body("password").isLength({ min: 6 }).withMessage("password mínimo 6 caracteres")
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    next();
  },
  register
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("email inválido"),
    body("password").notEmpty().withMessage("password es obligatorio")
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    next();
  },
  login
);

export default router;
