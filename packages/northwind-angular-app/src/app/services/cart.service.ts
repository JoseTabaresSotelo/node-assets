import CartItem from '../models/cartItem';
import cartItems from '../models/cartItems';
import { Injectable } from '@angular/core';
import Product from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor() {}

  list(): CartItem[] {
    return cartItems;
  }

  addToCart(product: Product) {
    let item = cartItems.find((c) => c.product.productId === product.productId);
    if (item) ++item.quantity;
    else cartItems.push(new CartItem(product));
  }

  removeFromCart(product: Product) {
    let item = cartItems.find((c) => c.product.productId === product.productId);
    if (item) cartItems.splice(cartItems.indexOf(item), 1);
  }
}
