import path from 'path';
import express from 'express';
import apiRoutes from './api/api.routes.js';
import auth from '../../middlewares/auth.js';

const router = express.Router();

//Routes
router.use('/api', apiRoutes);

router.get('/', (req, res) => {
  const user = req.user;
  if(user) return res.redirect('/home');
  res.sendFile(path.join(process.cwd(), "/public/login.html"));
});

router.get('/home', auth, (req, res) => {
  const user = req.user.email;
  res.render('home', { nombre: user });
});

router.get('/logout', auth, (req, res) => {
  const user = req.user.email;
  req.logout();
  req.session.destroy(err => {
    if(err) res.clearCookie('my-session');
    res.render("logout", { nombre: user });
  });
  console.log("User logued out!");
  res.clearCookie('my-session');
});

router.get('/register-error', (req, res) => {
  res.render('error-session', { title: "register-error" , message: "USER ERROR SIGNUP" });
});
router.get('/login-error', (req, res) => {
  res.render('error-session', { title: "login-error" , message: "USER ERROR LOGIN" });
});

export default router;