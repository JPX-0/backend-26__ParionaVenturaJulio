import express from 'express';
import passport from "../../../../middlewares/passport.js";

const authRoutes = express.Router();

authRoutes.post('/register', (passport.authenticate("register", { 
  failureRedirect: "/register-error",
  successRedirect: "/home"
})));
authRoutes.post('/login', passport.authenticate("login", { 
  failureRedirect: "/login-error",
  successRedirect: "/home"
}));

export default authRoutes;