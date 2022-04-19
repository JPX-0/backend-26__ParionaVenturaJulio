import MongoDBContainer from '../containers/Mongodb.container.js';
import MessageSchema from '../schemas/Message.schema.js';

const collection = 'Message';

class MessagesDao extends MongoDBContainer {
  static instance;
  constructor() {
    super(collection, MessageSchema, "User");
    if (!MessagesDao.instance) {
      MessagesDao.instance = this;
      return this;
    }
    else {
      return MessagesDao.instance; 
    }
  }

  async getAll(filter = {}) {
    try{
      const documents = await this.model.find(filter, { __v: 0 }).populate("author");
      return documents;
    }
    catch(error) {
      console.log("error", error);
      const newError = formatErrorObject(INTERNAL_ERROR.tag, error.message);
      throw new Error(JSON.stringify(newError));
    }
  }
};

export default MessagesDao;