import mongoose from 'mongoose';
import { formatErrorObject } from '../../utils/api.utils.js';
import { STATUS } from '../../constants/api.constants.js';

const { INTERNAL_ERROR, NOT_FOUND } = STATUS;

class MongoDBContainer {
  constructor(collection, Schema, type) {
    this.model = mongoose.model(collection, Schema);
    this.type = type;
  };

  async getAll(filter = {}) {
    try{
      const documents = await this.model.find(filter, { __v: 0 }).lean();
      return documents;
    }
    catch(error) {
      const newError = formatErrorObject(INTERNAL_ERROR.tag, error.message);
      throw new Error(JSON.stringify(newError));
    }
  }

  async getById(id) {
    try {
      let document;
      if(!this.type) document = await this.model.findById(id, { __v: 0 }).lean();
      else document = await this.model.findById(id, { __v: 0 }).populate(this.type).lean();
      if (!document) {
        const errorMessage = `Resource with id ${id} does not exist in our records`;
        const newError = formatErrorObject(NOT_FOUND.tag, errorMessage);
        throw new Error(JSON.stringify(newError));
      } else return document;
    }
    catch(error) {
      const newError = formatErrorObject(INTERNAL_ERROR.tag, error.message);
      throw new Error(JSON.stringify(newError));
    }
  }

  async createItem(resourceItem) {
    console.log("createItem ", resourceItem);
    try {
      const newItem = new this.model(resourceItem);
      await newItem.save();
      return newItem;
    }
    catch (err) {
      const newError = formatErrorObject(INTERNAL_ERROR.tag, err.message);
      throw new Error(JSON.stringify(newError));
    }
  }
}

export default MongoDBContainer;