import { CartItem } from './CartItem';
export class OrderItem{
    constructor(public cartItems:CartItem){}
    imageUrl = this.cartItems.imageUrl;
    unitPrice = this.cartItems.price;
    quantity = this.cartItems.quantity;
    productId = this.cartItems.id;
}