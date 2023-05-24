import { productsModel } from '../../models/products.model.js';
import { cartsModel } from '../../models/carts.model.js';

export default class CartManager {
  async addCart() {
    try {
      const newCart = new cartsModel();
      await newCart.save();
      return newCart;
    } catch (error) {
      console.log(error);
    }
  }

  async getCartById(id) {
    try {
      const cart = await cartsModel.findOne({ _id: id });
      return cart;
    } catch (error) {
      console.log(error);
    }
  }

  async saveCart(cart) {
    try {
      await cart.save();
    } catch (error) {
      console.log(error);
    }
  }

  async updateOneCart(cart) {
    try {
      await cart.updateOne({ products: cart.products });
    } catch (error) {
      console.log(error);
    }
  }
}
