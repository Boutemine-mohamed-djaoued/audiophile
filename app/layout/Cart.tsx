import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { IoCartOutline } from "react-icons/io5";
import { useMutation, useQuery } from "react-query";
import { CartProductType, CartType } from "../types/cart";
import NumberInput from "../util/components/NumberInput";
import Button from "../util/components/Button";
import { useRouter } from "next/navigation";
const getCart = async () => {
  const response = await axios.get("/api/cart");
  return response.data;
};

interface cartProductProps {
  cartProduct: CartProductType;
  onQuantityChange: (id: string, quantity: number) => void;
  isLoading: boolean;
}

const CartProduct = ({ cartProduct: { product, quantity }, onQuantityChange, isLoading }: cartProductProps) => {
  const handleQuantityChange = (newQuantity: number) => {
    onQuantityChange(product._id, newQuantity);
  };
  return (
    <div className="my-3 flex items-center justify-between gap-2">
      <div className="flex items-center gap-2">
        <div className="box-border aspect-square rounded-md bg-grey">
          <Image className="aspect-square p-3" src={product.mainImage} alt="" height={70} width={70} />
        </div>
        <div>
          <div className="text-nowrap text-300 font-semibold">{product.name}</div>
          <div className="font-semibold opacity-50">$ {product.price}</div>
        </div>
      </div>
      <div className="w-28">
        <NumberInput isLoading={isLoading} min={0} value={quantity} onChange={handleQuantityChange} />
      </div>
    </div>
  );
};

const addToCart = async (data: { productId: string; quantity: number }) => {
  const response = await axios.post("/api/cart", data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

const clearCart = async () => {
  const response = await axios.delete("/api/cart");
  return response.data;
};

const Cart = () => {
  const [cartProducts, setCartProducts] = useState<CartProductType[]>([]);
  const { data, isLoading, refetch } = useQuery<CartType>("get-cart", getCart);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const mutation = useMutation(addToCart, {
    onSuccess: () => {
      setLoading(false);
    },
    onError: () => {
      console.log("Failed to add to cart");
      setLoading(false);
    },
  });
  useEffect(() => {
    if (data) {
      if (data.cartProducts != null) setCartProducts(data.cartProducts);
    }
  }, [data]);
  useEffect(() => {
    refetch();
  }, [open === true]);

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    const oldQuantity = cartProducts.find((cartProduct) => cartProduct.product._id === productId)?.quantity || 0;
    setCartProducts((prev) => prev.map((cartProduct) => (cartProduct.product._id === productId ? { ...cartProduct, quantity: newQuantity } : cartProduct)));
    setLoading(true);
    mutation.mutate({ productId, quantity: newQuantity - oldQuantity });
    refetch();
  };

  const goToCheckoutPage = () => {
    router.push("/checkout");
    setOpen(false);
  };
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger>
        <IoCartOutline className="block font-semibold text-white hover:!text-accent" size={30} />
      </PopoverTrigger>
      <PopoverContent className="absolute -right-3 max-lg:top-6 lg:top-12 min-w-[22rem]">
        {isLoading ? (
          <div>Loading...</div>
        ) : data ? (
          <>
            {cartProducts.length ? (
              <div>
                <div className="flex items-center justify-between gap-2">
                  <h5>Cart ({cartProducts.length})</h5>
                  <button
                    onClick={() => {
                      clearCart();
                      refetch();
                    }}
                    className="underline opacity-60 hover:text-accent">
                    Remove all
                  </button>
                </div>
                <div>
                  {cartProducts.map((cartProduct) => (
                    <CartProduct isLoading={loading} key={cartProduct.product._id} cartProduct={cartProduct} onQuantityChange={handleQuantityChange} />
                  ))}
                </div>
                <div className="my-4 flex justify-between">
                  <div className="opacity-60">TOTAL</div>
                  <div className="font-medium">$ {cartProducts.reduce((sum, { product, quantity }) => sum + product.price * quantity, 0).toLocaleString()}</div>
                </div>
                <Button onClick={goToCheckoutPage} className="!w-full uppercase">
                  checkout
                </Button>
              </div>
            ) : (
              <div>Your Cart Is Empty</div>
            )}
          </>
        ) : null}
      </PopoverContent>
    </Popover>
  );
};

export default Cart;
