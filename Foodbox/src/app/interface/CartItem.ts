import { Items } from './Item';

export class CartItem{
    constructor(public food: Items){}
    id:number = this.food.id;
    name:string = this.food.foodName;
    imageUrl:string = this.food.foodImage;
    quantity:number = 1;
    price:number = this.food.foodPrice;
   
}