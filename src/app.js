import express from "express";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";

import viewsRouter from "./routes/views.router.js";

import { __dirname } from "./utils/dirname.js";

import handlebars from "express-handlebars";

import { Server } from "socket.io";
import ProductManager from "./ProductManager.js";

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/public", express.static(__dirname + "/public/html"));

app.use(express.static(__dirname + "/public"));

app.use("/api/products", productsRouter);

app.use("/api/carts", cartsRouter);

app.engine("handlebars", handlebars.engine());

app.set("views", __dirname + "/views");

app.set("view engine", "handlebars");

app.use("/views", viewsRouter);

const PORT = 8080;

const httpServer = app.listen(PORT, () => {
  console.log(`Servidor express escuchando en el puerto ${PORT}`);
});

const io = new Server(httpServer);

const productManager = new ProductManager(__dirname + "/productos.json");

const products = await productManager.getProducts();

io.on("connection", (socket) => {
  console.log(`Un cliente se ha conectado ${socket.id}`);

  socket.emit("message0", "Bienvenido! estas conectado con el servidor");

  socket.broadcast.emit(
    "message1",
    `Un nuevo cliente se ha conectado con id: ${socket.id}`
  );

  socket.on("createProduct", async (product) => {
    const productsPush = products;
    productsPush.push(product);

    io.emit("product-list", productsPush);

    socket.broadcast.emit(
      "message3",
      `El cliente con id: ${socket.id} ha creado un producto nuevo`
    );

    await productManager.addProduct(product);
  });

  socket.on("deleteProduct", async (id) => {
    const productsPush = products.filter((product) => product.id !== id);

    io.emit("product-list", productsPush);

    socket.broadcast.emit(
      "message4",
      `El cliente con id: ${socket.id} ha eliminado un producto con id: ${id}`
    );

    await productManager.deleteProduct(id);
  });

  socket.on("disconnect", () => {
    console.log("Un cliente se ha desconectado");

    io.emit("message2", `Un cliente se ha desconectado con id: ${socket.id}`);
  });
});
