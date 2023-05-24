import { Router } from 'express';
import ProductManager from '../DAL/dao/ManagerMongo/ProductManagerMongo.js';
import CartManager from '../DAL/dao/ManagerMongo/CartManagerMongo.js';
import {
  auth,
  isLogged,
  jwtAuth,
  jwtAuthCookie,
} from '../middlewares/auth.middleware.js';

const router = Router();

router.get('/chat', (req, res) => {
  res.render('chat', {
    title: 'Chat',
    StyleSheet: 'chat.css',
  });
});

router.get('/products', jwtAuthCookie, async (req, res) => {
  const { first_name, last_name, email, age, role } = req.user;

  const productManager = new ProductManager();
  const products = await productManager.getProducts();

  res.render('products', {
    products,
    first_name,
    last_name,
    email,
    age,
    role,
  });
});

router.get('/products/page/:page', jwtAuthCookie, async (req, res) => {
  const page = req.params.page || 1;

  const productManager = new ProductManager();
  const products = await productManager.getProducts(2, page);

  res.render('products', { products });
});

router.get('/products/:id', jwtAuthCookie, async (req, res) => {
  const productManager = new ProductManager();
  const product = await productManager.getProductById(req.params.id);

  const { _id, title, description, price, code, stock, category, thumbnail } =
    product;

  res.render('product', {
    id: _id,
    title,
    description,
    price,
    code,
    stock,
    category,
    thumbnail,
  });
});

router.get('/carts/:cid', async (req, res) => {
  const cartManager = new CartManager();
  const cart = await cartManager.getCartById(req.params.cid);

  const { products } = cart;

  res.render('cart', { products });
});

router.get('/register', isLogged, (req, res) => {
  res.render('register');
});

router.get('/login', isLogged, (req, res) => {
  res.render('login');
});

router.get('/profile', jwtAuthCookie, async (req, res) => {
  const { first_name, last_name, email, age, role } = req.user;
  res.render('profile', { first_name, last_name, email, age, role });
});

router.get('/errorRegister', (req, res) => {
  res.render('errorRegister');
});

router.get('/errorLogin', (req, res) => {
  res.render('errorLogin');
});

export default router;
