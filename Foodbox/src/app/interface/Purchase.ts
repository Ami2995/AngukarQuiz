import { OrderItem } from './OrderItem';
import { Order } from './Order';
import { Address } from './Address';
import { User } from './User';
export class Purchase{
    user:User;
    address:Address;
    order:Order;
    orderItems: OrderItem[];
}