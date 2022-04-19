import passport from "passport";
import bcrypt from "bcrypt";
import { Strategy as LocalStrategy } from "passport-local";
// const LocalStrategy = localStrategy.Strategy;

import UsersDao from "../models/daos/Users.dao.js";
const userDao = new UsersDao();

import { formatUserForDB } from "../utils/users.utils.js";

const salt = () => bcrypt.genSaltSync(10);
const createHash = (password) => bcrypt.hashSync(password, salt());
const isValidPassowrd = (user, password) => bcrypt.compareSync(password, user.password);

// Passport Local Strategy
passport.use("login", new LocalStrategy(async (userEmail, password, done) => {
  try {
    const user = await userDao.getByEmail(userEmail);
    if(!isValidPassowrd(user, password)) {
      console.log("Invalid user or password");
      return done(null, false);
    }
    return done(null, user);
  }
  catch(error) {
    console.log("Error signing up >>> ", error);
    return done(error);
  }
}));
passport.use("register", new LocalStrategy(
  { passReqToCallback: true }, 
  async (req, userEmail, password, done) => {
    try {
      const usrObject= {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: userEmail,
        password: createHash(password)
      }
      const newUser = formatUserForDB(usrObject);
      const user = await userDao.createUser(newUser);
      console.log("User registration successful!");
      return done(null, user);
    }
    catch(error) {
      console.log("Error signing up >>> ", error);
      return done(error);
    }
  }
));

// Serializacion:
passport.serializeUser((user, done) => {
  console.log("Inside serializer");
  console.log(user._id);
  done(null, user._id);
})

// Deserializacion:
passport.deserializeUser(async (id, done) => {
  console.log("Inside deserializer");
  const user = await userDao.getById(id);
  done(null, user);
})

export default passport;