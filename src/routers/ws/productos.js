
import ProductsDao from "../../../models/daos/Products.dao.js";

const productsDao = new ProductsDao();

export default async function addProductsHandlers(socket, sockets) {
	const products = await productsDao.getAll();
  socket.emit("products", products);

  socket.on("update", async product => {
    const newProduct = {
      ...product,
      createdAt: new Date().toLocaleString(),
      updatedAt: new Date().toLocaleString()
    };
    await productsDao.createItem(newProduct);
		const products = await productsDao.getAll();
    sockets.emit("products", products);
  });
};