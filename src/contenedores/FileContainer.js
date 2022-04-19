// import { promises as fs } from "fs";

// class FileContainer {
//   constructor(route) {
//     this.route = route;
//   }

//   async getById(id) {
//     const data = await this.getAll();
//     const dataFound = data.find((e) => e.id == id);
//     return dataFound;
//   }

//   async getAll() {
//     try {
//       const data = await fs.readFile(this.route, "utf-8");
//       return JSON.parse(data);
//     } catch (error) {
//       return [];
//     }
//   }

//   async save(payload) {
//     const data = await this.getAll();

//     const findId = data.map(item => item.id);
//     let newId;
//     if(findId.length == 0) newId = 1;
//     else newId = Math.max.apply(null, findId) + 1;

//     const newElem = { ...payload, id: newId };
//     data.push(newElem);

//     try {
//       await fs.writeFile(this.route, JSON.stringify(data, null, 2));
//       return newId;
//     } catch(error) {
//       throw new Error("Error al guardar: ", error);
//     }
//   }

//   async update(payload) {
//     const data = await this.getAll();
//     const index = data.findIndex(item => item.id == payload.id);
//     if(index == -1) throw new Error(`Error al actualizar: no se encontró el id ${payload.id}`);
// 		data[index] = payload;
// 		try {
// 			await fs.writeFile(this.route, JSON.stringify(data, null, 2));
// 		} catch(error) {
// 			throw new Error("Error al actualizar: ", error);
// 		}
//   }

//   async deleteById(id) {
//     const data = await this.getAll();
//     const index = data.findIndex(item => item.id == id);
//     if(index == -1) throw new Error(`Error al borrar: no se encontró el id ${id}`);
//     data.splice(index, 1);
//     try {
//       await fs.writeFile(this.route, JSON.stringify(data, null, 2));
//     } catch(error) {
//       throw new Error("Error al borrar: ", error);
//     }
//   }

//   async deleteAll() {
//     try {
//       await fs.writeFile(this.route, JSON.stringify([], null, 2));
//     } catch (error) {
//       throw new Error("Error al borrar todo: ", error);
//     }
//   }
// }

// export default FileContainer;