
import { Category } from './Category';
export interface Items{
    id:number,
    foodName:string,
    foodPrice:number,
    foodDescription:string,
    foodImage:any,
    available:boolean,
    isFavorite:boolean,
    foodRating:number,
    timeToCook:string,
    category:Category,
}