import { OrderType } from "@/app/types/order";
import Button from "@/app/util/components/Button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { IoPerson } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import { MdOutlinePayment } from "react-icons/md";
import Image from "next/image";
const Order = ({ order }: { order: OrderType }) => {
  return (
    <>
      <div>{order.name}</div>
      <div>{order.createdAt.slice(0,10)}</div>
      <div>{order.paymentMethod}</div>
      <div>
        ${" "}
        {order.cart.cartProducts
          .reduce((sum, { product, quantity }) => {
            return sum + product.price * quantity;
          }, 50)
          .toLocaleString()}
      </div>
      <Dialog>
        <DialogTrigger className="underline opacity-60 hover:text-accent">more</DialogTrigger>
        <DialogContent className="w-[25rem]">
          <DialogHeader>
            <DialogTitle>Order Details</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <div>
            <div className="mb-2 font-medium text-accent">Client Info</div>
            <div>
              <IoPerson className="me-2 inline-block"></IoPerson>
              {order.name}
            </div>
            <div>
              <MdEmail className="me-2 inline-block"></MdEmail>
              {order.email}
            </div>
            <div>
              <FaPhoneAlt className="me-2 inline-block"></FaPhoneAlt>
              {order.phoneNumber}
            </div>
            <div className="flex">
              <IoLocationSharp className="me-2 inline-block" size={25}></IoLocationSharp>
              <div>
                {order.address} , {order.zipCode} , {order.city} , {order.country}
              </div>
            </div>
            <div className="my-2 font-medium text-accent">Ordered Products</div>
            <div>
              {order.cart.cartProducts.map(({ product, quantity }, index) => {
                return (
                  <div key={index} className="my-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="box-border aspect-square rounded-md bg-grey">
                        <Image className="aspect-square p-3" src={product.mainImage} alt="" height={70} width={70}></Image>
                      </div>
                      <div>
                        <div className="text-300 font-semibold">{product.name}</div>
                        <div className="font-semibold opacity-50">{product.category}</div>
                      </div>
                    </div>
                    <div className="font-semibold opacity-60">x{quantity}</div>
                  </div>
                );
              })}
            </div>
            <div>
              <div className="my-2 font-medium text-accent">Payment Details</div>
              <div>
                <MdOutlinePayment className="me-2 inline-block"></MdOutlinePayment>
                {order.paymentMethod}
              </div>
              <div>
                <span className="font-medium">Total:</span> ${" "}
                {order.cart.cartProducts
                  .reduce((sum, { product, quantity }) => {
                    return sum + product.price * quantity;
                  }, 50)
                  .toLocaleString()}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

interface OrdersProps {
  orders: OrderType[];
}
const Orders = ({ orders }: OrdersProps) => {
  return (
    <div>
      <h2 className="mt-4">Orders</h2>
      <div className="grid grid-cols-[1fr_1fr_1fr_1fr_auto] gap-y-2">
        <div className="opacity-60">name</div>
        <div className="opacity-60">ordered at</div>
        <div className="opacity-60">payment method</div>
        <div className="opacity-60">total spending</div>
        <div className="opacity-60"></div>
        {orders.map((order,index) => (
          <Order key={index} order={order} />
        ))}
      </div>
    </div>
  );
};
export default Orders;
