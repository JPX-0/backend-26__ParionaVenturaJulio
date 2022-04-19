// import messagesApi from "../../api/mensajes.js";
import { normalizedMessages } from "../../../models/normalizacion/mensajes.js";
import MessagesDao from "../../../models/daos/Messages.dao.js";
import UsersDao from "../../../models/daos/Users.dao.js";

const messagesDao = new MessagesDao();
const usersDao = new UsersDao();

export default async function addMenssagesHandlers(socket, sockets) {
  sockets.emit("messages", normalizedMessages(await messagesDao.getAll()));

  socket.on("newMessage", async message => {
    console.log("newMessage ", message)
    const buscname = await usersDao.getByEmail(message.email);
    console.log("buscname ", buscname)
    const newMessage = {
      author: buscname._id,
      text: message.text,
      createdAt: new Date().toLocaleString(),
      updatedAt: new Date().toLocaleString()
    };
    await messagesDao.createItem(newMessage);
    sockets.emit("messages", normalizedMessages(await messagesDao.getAll()));
  });
};