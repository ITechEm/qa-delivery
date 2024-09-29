'use client';
import {CartContext, cartProductPrice} from "@/components/AppContext";
import AddressInputs from "@/components/layout/AddressInputs";
import SectionHeaders from "@/components/layout/SectionHeaders";
import CartProduct from "@/components/menu/CartProduct";
import {useParams} from "next/navigation";
import {useContext, useEffect, useState} from "react";
import Right from "@/components/icons/Right";
import Image from "next/image";

export default function OrderPage() {
  const {clearCart} = useContext(CartContext);
  const [order, setOrder] = useState();
  const [loadingOrder, setLoadingOrder] = useState(true);
  const {id} = useParams();
  useEffect(() => {
    if (typeof window.console !== "undefined") {
      if (window.location.href.includes('clear-cart=1')) {
        clearCart();
      }
    }
    if (id) {
      setLoadingOrder(true);
      fetch('/api/orders?_id='+id).then(res => {
        res.json().then(orderData => {
          setOrder(orderData);
          setLoadingOrder(false);
        });
      })
    }
  }, []);

  let subtotal = 0;
  if (order?.cartProducts) {
    for (const product of order?.cartProducts) {
      subtotal += cartProductPrice(product);
    }
  }

  return (
    <section className="hero md:mt-4">
      <div className="py-8 md:py-12">
        <h2 className="text-5xl neucha">
        Your order is on the way 
          <span className="text-primary">
          <span> </span>...
          </span>
        </h2>
        <p className="my-6 text-gray-500 text-sm inria">
          We will call you when your order will arrive on your address.
        </p>
        <div className="flex gap-4 text-sm">
          <button className="flex inknut justify-center bg-primary uppercase flex items-center gap-2 text-white px-4 py-2 rounded-50">
            <a 
              href="/"> 
              Home
              </a>
            <Right />
          </button>
        </div>
      </div>
      <div className="relative md:block">
        <Image src={'/your_Order.gif'} layout={'fill'} objectFit={'contain'} alt={'your_order'} />
      </div>
      {loadingOrder && (
        <div className="text-center inria">Loading order...</div>
      )}
      {order && (
        <div className="flex grid md:grid-cols-2 md:gap-16 md:block inika">
          <div>
            {order.cartProducts.map(product => (
              <CartProduct key={product._id} product={product} />
            ))}
            <div className="text-right py-2 text-gray-500 inria">
              Subtotal:
              <span className="text-black font-bold inline-block w-8 inika">€{subtotal}</span>
              <br />
              Delivery:
              <span className="text-black font-bold inline-block w-8 inika">€5</span>
              <br />
              Total:
              <span className="text-black font-bold inline-block w-8 inika">
                €{subtotal + 5}
              </span>
            </div>
          </div>
          <div className="">
            <div className=" grid md:block bg-gray-100 p-4 rounded-lg">
              <AddressInputs
                disabled={true}
                addressProps={order}
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}