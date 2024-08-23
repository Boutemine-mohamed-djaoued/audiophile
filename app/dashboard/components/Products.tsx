import { Product } from "@/app/types/product";
import Image from "next/image";
import Link from "next/link";
import { FaGear } from "react-icons/fa6";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import Button from "@/app/util/components/Button";
import DeleteProduct from "./DeleteProduct";
const MyProduct = ({ product }: { product: Product }) => {
  return (
    <div className="mb-2 flex items-center justify-between gap-2">
      <div className="flex items-center gap-2">
        <Image className="aspect-square rounded-md bg-grey p-2" src={product.mainImage} alt="" width={70} height={70}></Image>
        <div>
          <span className="font-medium">{product.name}</span>
          <br />
          <span className="opacity-60">{product.category}</span>
        </div>
      </div>
      <Popover>
        <PopoverTrigger>
          <FaGear className="cursor-pointer" />
        </PopoverTrigger>
        <PopoverContent side="left" className="w-fit px-3 py-2">
          <Link href={`/dashboard/editProduct/${product._id}`}>edit</Link>
          <hr className="my-2" />
          <Link href={`/products/${product._id}`}>preview</Link>
          <hr className="my-2" />
          <DeleteProduct productId={product._id}></DeleteProduct>
        </PopoverContent>
      </Popover>
    </div>
  );
};

interface ProductProps {
  products: Product[];
}
const Products = ({ products }: ProductProps) => {
  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <h2 className="">Products</h2>
        <Link href="/dashboard/addProduct" className="rounded-md bg-accent px-3 py-2 text-white hover:text-accent">+ new</Link>
      </div>
      <div>
        {products.map((product,index) => (
          <MyProduct key={index} product={product} />
        ))}
      </div>
    </div>
  );
};
export default Products;
