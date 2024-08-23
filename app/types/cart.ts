import { Product } from "./product";

export interface CartProductType {
  product: Product;
  quantity: number;
}

export interface CartType {
  cartProducts : CartProductType[];
}
