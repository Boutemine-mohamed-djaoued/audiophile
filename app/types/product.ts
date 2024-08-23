type Category = "HEADPHONES" | "SPEAKERS" | "EARPHONES";

interface BoxItem {
  item: string;
  quantity: number;
}

export interface Product {
  _id : string ;
  category: Category;
  name: string;
  description: string;
  price: number;
  features: string[];
  inBox: BoxItem[];
  mainImage: string;
  otherImages: string[];
  inStock: number;
  createdAt : string ;
}
