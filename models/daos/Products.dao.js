import MongoDBContainer from '../containers/Mongodb.container.js';
import ProductSchema from '../schemas/Product.schema.js';

const collection = 'Product';

class ProductsDao extends MongoDBContainer {
  static instance;
  constructor() {
    super(collection, ProductSchema);
    if (!ProductsDao.instance) {
      ProductsDao.instance = this;
      return this;
    }
    else {
      return ProductsDao.instance; 
    }
  }
};

export default ProductsDao;