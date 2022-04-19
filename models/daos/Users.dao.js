import MongoDBContainer from '../containers/Mongodb.container.js';
import { formatErrorObject } from '../../utils/api.utils.js';
import UserSchema from '../schemas/User.schema.js';
import { STATUS } from '../../constants/api.constants.js';

const { INTERNAL_ERROR, NOT_FOUND } = STATUS;

const collection = 'User';

class UsersDao extends MongoDBContainer {
  static instance;
  constructor() {
    if (!UsersDao.instance) {
      super(collection, UserSchema);
      UsersDao.instance = this;
      return this;
    }
    else {
      return UsersDao.instance;
    }
  }

  async createUser(userItem) {
    try {
      const user = await this.createItem(userItem);
      await user.save();
      return user;
    }
    catch(error) {
      if (error.message.toLowerCase().includes('e11000') || error.message.toLowerCase().includes('duplicate')) {
        const newError = formatErrorObject(STATUS.BAD_REQUEST, 'User with given email already exist');
        throw new Error(JSON.stringify(newError));
      }
      throw new Error(error);
    }
  };

  async getById(id) {
    try {
      const document = await this.model.findById(id, { __v: 0 }).lean();
      if (!document) {
        const errorMessage = `Resource with id ${id} does not exist in our records`;
        const newError = formatErrorObject(NOT_FOUND.tag, errorMessage);
        throw new Error(JSON.stringify(newError));
      } else {
        return document;
      }
    }
    catch(error) {
      const newError = formatErrorObject(INTERNAL_ERROR.tag, error.message);
      throw new Error(JSON.stringify(newError));
    }
  }

  async getByEmail(email) {
    console.log("email", email);
    try {
      const document = await this.model.findOne({ email }, { __v: 0 });
      if (!document) {
        const errorMessage = `Wrong username or password`;
        const newError = formatErrorObject(NOT_FOUND.tag, errorMessage);
        throw new Error(JSON.stringify(newError));
      } else {
        return document;
      }
    }
    catch(error) {
      const newError = formatErrorObject(INTERNAL_ERROR.tag, error.message);
      throw new Error(JSON.stringify(newError));
    }
  }
};

export default UsersDao;