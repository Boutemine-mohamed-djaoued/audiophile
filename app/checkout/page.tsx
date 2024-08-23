"use client";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import { MdDone } from "react-icons/md";
import { useMutation, useQuery } from "react-query";
import { useUserDataContext } from "../context/userContext";
import { CartProductType, CartType } from "../types/cart";
import Button from "../util/components/Button";
import AddBalance from "./AddBalance";
interface CheckoutData {
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
  zipCode: string;
  city: string;
  country: string;
  paymentMethod: string;
}
const getCart = async () => {
  const response = await axios.get("/api/cart");
  return response.data;
};
const page = () => {
  const { data, isLoading } = useQuery<CartType>("get-cart", getCart);
  const [cartProducts, setCartProducts] = useState<CartProductType[]>([]);
  const { user, setUser } = useUserDataContext();
  const [loding, setLoding] = useState(false);
  const { toast } = useToast();
  useEffect(() => {
    if (data) {
      if (data.cartProducts != null) setCartProducts(data.cartProducts);
    }
  }, [data]);
  const mutation = useMutation(
    async (checkoutData: CheckoutData) => {
      const response = await axios.post("/api/cart/checkout", checkoutData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    },
    {
      onSuccess: (data) => {
        setUser({ ...user, balance: data.newBalance });
        setOpen(true);
        setLoding(false);
      },
      onError: (error: any) => {
        toast({
          description: error.response.data,
          variant: "destructive",
        });
        setLoding(false);
      },
    }
  );
  const mockupData = {
    name: "Alexei Ward",
    email: "alexei@mail.com",
    phoneNumber: "0552351850",
    adress: "1137 Williams Avenue",
    zipCode: "10001",
    city: "New York",
    country: "United States",
  };

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("e-money");

  const [open, setOpen] = useState(false);
  const useMockupData = (e: any) => {
    setName(mockupData.name);
    setEmail(mockupData.email);
    setPhoneNumber(mockupData.phoneNumber);
    setAddress(mockupData.adress);
    setZipCode(mockupData.zipCode);
    setCity(mockupData.city);
    setCountry(mockupData.country);
    e.preventDefault();
  };
  const Checkout = (e: any) => {
    e.preventDefault();
    setLoding(true);
    mutation.mutate({ name, email, phoneNumber, address, zipCode, city, country, paymentMethod });
  };
  return (
    <Container>
      <form onSubmit={Checkout} className="my-10 lg:my-32 lg:flex items-start gap-10">
        <div className="flex-1 rounded-xl bg-white max-lg:p-5 lg:p-10 shadow-md">
          <h1 className="max-lg:mb-4 lg:mb-5">CHECKOUT</h1>
          <div>
            <div className="max-lg:mb-3 lg:mb-4 flex items-center justify-between">
              <h2 className="text-350 mb-0 uppercase tracking-wider text-accent">Billing Details</h2>
              <button className="underline opacity-60 hover:text-accent" onClick={useMockupData}>
                use Mockup Data
              </button>
            </div>
            <div className="mb-3 lg:flex gap-4">
              <div className="flex-1">
                <label className="mb-2 font-semibold" htmlFor="name">
                  Name
                </label>
                <br />
                <input className="form-input" value={name} onChange={(e) => setName(e.target.value)} type="text" id="name" placeholder={mockupData.name} minLength={3} required />
              </div>
              <div className="flex-1 max-lg:mt-3">
                <label className="mb-2 font-semibold" htmlFor="email">
                  Email Address
                </label>
                <br />
                <input className="form-input" value={email} onChange={(e) => setEmail(e.target.value)} type="email" id="email" placeholder={mockupData.email} required />
              </div>
            </div>
            <div className="flex lg:gap-4">
              <div className="flex-1">
                <label className="mb-2 font-semibold" htmlFor="phone-number">
                  Phone Number
                </label>
                <br />
                <input
                  className="form-input"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  type="tel"
                  pattern="[0-9]{10}"
                  id="phone-number"
                  placeholder={mockupData.phoneNumber}
                  required
                />
              </div>
              <div className="lg:flex-1"></div>
            </div>
          </div>
          <div>
            <h2 className="max-lg:mb-3 lg:mb-4 max-lg:mt-4 mt-5 text-350 uppercase tracking-wider text-accent">shipping info</h2>
            <label className="mb-2 font-semibold" htmlFor="address">
              Address
            </label>
            <br />
            <input className="form-input mb-3" value={address} onChange={(e) => setAddress(e.target.value)} type="text" id="address" placeholder={mockupData.adress} minLength={5} required />
            <div className="mb-3 lg:flex gap-4">
              <div className="flex-1">
                <label className="mb-2 font-semibold" htmlFor="zip-code">
                  ZIP Code
                </label>
                <br />
                <input className="form-input" value={zipCode} onChange={(e) => setZipCode(e.target.value)} type="text" id="zip-code" placeholder={mockupData.zipCode} required />
              </div>
              <div className="flex-1">
                <label className="mb-2 max-lg:mt-3 font-semibold" htmlFor="city">
                  City
                </label>
                <br />
                <input className="form-input" value={city} onChange={(e) => setCity(e.target.value)} type="text" id="city" placeholder={mockupData.city} minLength={3} required />
              </div>
            </div>
            <div className="flex lg:gap-4">
              <div className="flex-1">
                <label className="mb-2 font-semibold" htmlFor="country">
                  Country
                </label>
                <br />
                <input className="form-input" value={country} onChange={(e) => setCountry(e.target.value)} type="text" id="country" placeholder={mockupData.country} minLength={3} required />
              </div>
              <div className="lg:flex-1"></div>
            </div>
          </div>
          <div>
            <h2 className="max-lg:mb-3 lg:mb-4 mt-5 text-350 uppercase tracking-wider text-accent">payment details</h2>
            <div className="mb-2 font-semibold">Payment Method</div>
            <div className="lg:flex gap-4">
              <div className={`flex flex-1 max-lg:mb-2 items-center rounded-md p-3 ring-2  ${paymentMethod == "e-money" ? "ring-accent" : "ring-opacity-15 ring-black"}`}>
                <input className="me-2" checked={paymentMethod == "e-money"} onChange={() => setPaymentMethod("e-money")} type="radio" name="payment-method" id="e-money" />
                <label className="font-semibold hover:cursor-pointer" htmlFor="e-money">
                  e-Money
                </label>
              </div>
              <div className={`flex flex-1 items-center rounded-md p-3 ring-2 ${paymentMethod == "cash-on-delivery" ? "ring-accent" : "ring-opacity-15 ring-black"}`}>
                <input className="me-2" type="radio" onChange={() => setPaymentMethod("cash-on-delivery")} name="payment-method" id="cash-on-delivery" />
                <label className="font-semibold hover:cursor-pointer" htmlFor="cash-on-delivery">
                  Cash on Delivery
                </label>
              </div>
            </div>
          </div>
          <div className="mt-10 flex items-center gap-3">
            <Image className="max-lg:hidden" src="/cash.svg" alt="" width={50} height={50}></Image>
            <div className="opacity-70">
              The ‘Cash on Delivery’ option enables you to pay in cash when our delivery courier arrives at your residence. Just make sure your address is correct so that your order will not be
              cancelled.
            </div>
          </div>
        </div>
        <div className="min-w-[20rem] max-lg:mt-5 rounded-xl bg-white p-8 shadow-md">
          {isLoading ? (
            <div>Loading...</div>
          ) : data ? (
            <>
              {cartProducts.length ? (
                <div>
                  <div className="text-400 font-medium uppercase tracking-wider">summary</div>
                  <div>
                    {cartProducts.map(({ product, quantity }, index) => {
                      return (
                        <div key={index} className="my-3 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="box-border aspect-square rounded-md bg-grey">
                              <Image className="aspect-square p-3" src={product.mainImage} alt="" height={70} width={70}></Image>
                            </div>
                            <div>
                              <div className="text-300 font-semibold">{product.name}</div>
                              <div className="font-semibold opacity-50">$ {product.price}</div>
                            </div>
                          </div>
                          <div className="font-semibold opacity-60">x{quantity}</div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="mt-4 flex justify-between">
                    <div className="opacity-60">TOTAL</div>
                    <div className="font-medium">
                      ${" "}
                      {cartProducts
                        .reduce((sum, { product, quantity }) => {
                          return sum + product.price * quantity;
                        }, 0)
                        .toLocaleString()}
                    </div>
                  </div>
                  <div className="my-2 flex justify-between">
                    <div className="opacity-60">SHIPPING</div>
                    <div className="font-medium">$ 50</div>
                  </div>
                  <div className="mt-3 flex justify-between">
                    <div className="opacity-60">GRAND TOTAL</div>
                    <div className="font-semibold text-accent">
                      ${" "}
                      {cartProducts
                        .reduce((sum, { product, quantity }) => {
                          return sum + product.price * quantity;
                        }, 50)
                        .toLocaleString()}
                    </div>
                  </div>
                  <div className="my-2 flex justify-between">
                    <div className="flex items-center gap-2">
                      <div className="opacity-60">BALANCE</div>
                      <AddBalance></AddBalance>
                    </div>
                    <div className="font-medium">$ {user && user.balance.toLocaleString()}</div>
                  </div>
                  <Button isLoading={loding} className="mt-4 !w-full" type="submit">
                    CONTINUE & PAY
                  </Button>
                </div>
              ) : (
                <div>Your Cart Is Empty</div>
              )}
            </>
          ) : null}
        </div>
      </form>
      <Dialog open={open}>
        <DialogContent className="idk max-lg:p-5 lg:p-10 max-lg:w-[calc(100%-2.5rem)] rounded-lg">
          <DialogHeader className="hidden">
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>This action cannot be undone. This will permanently delete your account and remove your data from our servers.</DialogDescription>
          </DialogHeader>
          <span className="grid aspect-square w-16 place-items-center rounded-full bg-accent">
            <MdDone className="text-white" size={40} />
          </span>
          <h2 className="font-semibold">
            THANK YOU
            <br />
            FOR YOUR ORDER
          </h2>
          <p className="opacity-60">You will receive an email confirmation shortly.</p>
          <div className="flex overflow-hidden rounded-xl">
            <div className="w-7/12 bg-grey p-4">
              {cartProducts.length && (
                <div className="flex items-center justify-between">
                  <Image src="/mainHeadPhones.svg" alt="" width={40} height={40} />
                  <div>
                    <div className="font-semibold">{cartProducts[0].product.name}</div>
                    <div className="font-medium opacity-60">$ {cartProducts[0].product.price}</div>
                  </div>
                  <div className="font-medium opacity-60">x{cartProducts[0].quantity}</div>
                </div>
              )}
              <hr />
              <div className="text-center opacity-60">{cartProducts.length > 1 ? `and ${cartProducts.length - 1} other item(s)` : "and no other items"}</div>
            </div>
            <div className="flex w-5/12 flex-col justify-center bg-off-black p-3">
              <div className="mb-2 text-grey">GRAND TOTAL</div>
              <div className="text-350 font-semibold text-white">
                ${" "}
                {cartProducts
                  .reduce((sum, { product, quantity }) => {
                    return sum + product.price * quantity;
                  }, 50)
                  .toLocaleString()}
              </div>
            </div>
          </div>
          <Button href="/" className="mt-4 !w-full">
            BACK TO HOME
          </Button>
        </DialogContent>
      </Dialog>
    </Container>
  );
};
export default page;
