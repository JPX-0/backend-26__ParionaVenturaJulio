import "dotenv/config";

const {
  PORT,
  SESSION_SECRET,
  DB_URI
} = process.env;

export default {
  PORT,
  SESSION_SECRET,
  DB_URI
};