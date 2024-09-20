import Header from "@/components/layout/Header";
import Hero from "@/components/layout/Hero";
import HomeMenu from "@/components/layout/HomeMenu";
import SectionHeaders from "@/components/layout/SectionHeaders";

export default function Home() {
  return (
    <>
      <Hero />
      <HomeMenu />
      <section className="text-center my-16 mt-12 mb-8" id="about">
        <SectionHeaders
          subHeader={'Our story'}
          mainHeader={<a>About <span className="text-primary">Us</span></a>}
        />
        <div className=" max-w-md mx-auto mt-6 flex flex-col gap-4 inria">
          <p>We believe in produce. Tasty produce. Produce like:</p>
          <p>Oh! Onions. Yams. Avocados. Lettuce. Arugula (to some, “rocket”). Persian cucumbers, in addition to aforementioned “normal” cucumbers. Artichokes. Zucchinis. Pumpkins. Squash (what some cultures call pumpkins). Sweet potatoes and potato-potatoes. Jackfruit. Monk fruit. Fruit of the Loom. Fruits of our labor (this website). Sorrel. Pineapple. Mango. Gooseberries. Blackberries. Tomatoes. Heirloom tomatoes. Beets. Chives. Corn. Endive. Escarole, which, we swear, we’re vendors of organic produce, but if you asked us to describe what escaroles are...</p>
          
        </div>
      </section>
      <section className="text-center my-8 mt-12" id="contact">
        <SectionHeaders
          subHeader={'Don\'t hesitate'}
          mainHeader={<a>Contact <span className="text-primary">Us</span></a>}
        />
        <div className=" mt-6">
          <p className="text-4xl underline inria ">
            +46 738 123 123
          </p>
          <p className="text-2xl mt-2 inria">
            qa_delivery@email.com
          </p>
        </div>
      </section>
    </>
  )
}
