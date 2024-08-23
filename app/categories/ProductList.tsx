import Image from "next/image";
import { Container } from "react-bootstrap";
import { Product } from "../types/product";
import Button from "../util/components/Button";
import isNewProduct from "../util/helper/isNewProduct";
interface productProps {
  product: Product;
  index: number;
}

const ProductItem = ({ product, index }: productProps) => {
  return (
    <div className={`my-16 lg:my-32 lg:flex items-center gap-24 ${index % 2 == 1 ? "flex-row-reverse" : null}`}>
      <div className="box-border max-lg:max-w-[30rem] max-lg:mx-auto aspect-square flex-1 rounded-lg bg-grey py-10 lg:py-20 max-lg:mb-5">
        <Image className="h-full w-full" src={product.mainImage} width={100} height={100} alt="nothng"></Image>
      </div>
      <div className="flex-1">
        {isNewProduct(product.createdAt) && <p className="max-lg:text-center tracking-[10px] text-accent">NEW PRODUCT</p>}
        <h2 className="text-700 max-lg:text-center">
          {product.name}
          <br />
          {product.category}
        </h2>
        <p className="my-4 max-lg:text-center max-w-[40ch] max-lg:mx-auto text-350 opacity-60">{product.description}</p>
        <Button className="max-lg:mx-auto" href={`/products/${product._id}`}>see product</Button>
      </div>
    </div>
  );
};

interface productListProps {
  products: Product[];
}
const ProductList = ({ products }: productListProps) => {
  return (
    <Container>
      <section>
        {products.map((product: Product, index) => {
          return <ProductItem key={index} index={index} product={product}></ProductItem>;
        })}
      </section>
    </Container>
  );
};
export default ProductList;
