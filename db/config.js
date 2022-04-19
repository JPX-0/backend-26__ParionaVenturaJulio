import env from "../src/env.config.js";

export default {
  mongodb: {
    connectTo: (database) => `mongodb+srv://${env.DB_URI}.mongodb.net/${database}?retryWrites=true&w=majority`
  }
};