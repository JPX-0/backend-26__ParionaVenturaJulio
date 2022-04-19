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

router.get('/logout', auth, (req, res, next) => {
  console.log("User logued out!");
  req.logOut();
  res.redirect("/");
});

export default router;