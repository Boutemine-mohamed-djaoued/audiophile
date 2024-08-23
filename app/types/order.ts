import { CartType } from "./cart";
export interface OrderType {
  client: string;
  name: string;
  email: string;
  phoneNumber: number;
  address: string;
  zipCode: string;
  city: string;
  country: string;
  paymentMethod: string;
  cart: CartType;
  createdAt : string ;
}
