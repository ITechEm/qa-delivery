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
        
        <div className="grid mt-8 sm:grid-cols-3 gap-4">
              <div className="bg-gray-200 p-4 rounded-lg group hover:bg-white hover:shadow-md hover:shadow-black/25 transition-all">
                <SectionHeaders
                  menuHeader={<a className="text-center text-2xl">Visit us</a>} 
                />
                  <div className="item-center mt-2">
                    <a className="text-2xl  neucha text-primary" href="https://g.co/kgs/ZQANvHK" target="blank">
                      Iasi, Romania
                    </a>
                  </div>
              </div>
              <div className="bg-gray-200 p-4 rounded-lg group hover:bg-white hover:shadow-md hover:shadow-black/25 transition-all">
                <SectionHeaders
                  menuHeader={<a className="text-center text-2xl">Call us</a>} 
                />
                  <div className="item-center mt-2">
                    <a className="text-2xl  neucha text-primary" href='tel:+40757123123'>
                    +40 757 123 123
                    </a>
                  </div>
              </div>
              <div className="bg-gray-200 p-4 rounded-lg group hover:bg-white hover:shadow-md hover:shadow-black/25 transition-all">
                <SectionHeaders
                  menuHeader={<a className="text-center text-2xl">Text us</a>} 
                />
                  <div className="item-center mt-2">
                    <a className="text-2xl  neucha text-primary" href="mailto:qa_delivery@email.com">
                    qa_delivery@email.com
                    </a>
                  </div>
              </div>
      </div>

        
      </section>
    </>
  )
}
