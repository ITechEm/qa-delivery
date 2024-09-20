import Right from "@/components/icons/Right";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="hero md:mt-4">
      <div className="py-8 md:py-12 ">
        <h2 className="text-5xl neucha">
          Everything<br />
          is better<br />
          with a&nbsp;
          <span className="text-primary neucha">
            Pizza
          </span>
        </h2>
        <p className="my-6 text-graylight">
          Pizza is the missing piece that makes every day <br></br>
          complete, a simple yet delicious joy in life
        </p>
        <div className="flex gap-4 text-sm">
          <button className="flex  bg-primary uppercase items-center text-white rounded inknut">
            <a 
              href="/menu"> 
              Order Now
              </a>
            <Right />
          </button>
       
        </div>
      </div>
      <div className="relative hidden md:block">
        <Image src={'/pizza.png'} layout={'fill'} objectFit={'contain'} alt={'pizza'} />
      </div>
    </section>
  );
}