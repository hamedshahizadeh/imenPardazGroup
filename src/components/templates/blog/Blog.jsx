import Card from "@/components/modules/card/Card";
import MinCard from "@/components/modules/card/MinCard";
import cards from "@/data/datas";
import Link from "next/link";
import { FaRegNewspaper, FaStar } from "react-icons/fa";
export default function Blog() {
  return (
    <div className="bg-gray-950 min-h-screen pb-5 pt-20 lg:pt-24 ">
      <div className=" container">
        <h3 className="text-sm md:text-base font-sans font-black mb-3 text-[#49C5B6] text-center py-2 rounded-md  bg-black/40 backdrop-blur-[5px]">
          لیست آخرین مقالات
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 my-4 gap-3 md:gap-4 lg:gap-6">
          <div className="col-span-1 md:col-span-2 lg:col-span-3">
            <div className="grid lg:grid-cols-2 gap-3 md:gap-4 lg:gap-6">
              {cards.map((item) => (
                <Card key={item.id} {...item} />
              ))}
            </div>
          </div>
          <div className="col-span-1 space-y-6">
            <div>
              <div className="p-4 border-b flex items-center gap-2 border-gray-700">
                <FaRegNewspaper className="text-[#49C5B6] text-lg" />
                <h2 className="text-white font-semibold text-sm md:text-base">
                  آخرین اخبار
                </h2>
              </div>
              <ul>
                {cards.slice(-5).map((cardlast) => (
                  <li key={cardlast.id}>
                    <MinCard key={cardlast.id} {...cardlast} />
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="p-4 border-b flex items-center gap-2 border-gray-700">
                <FaStar className="text-[#49C5B6] text-lg" />
                <h2 className="text-white font-semibold text-sm md:text-base">
                  مقالات محبوب
                </h2>
              </div>
              <ul className="space-y-2 pt-3">
                {cards
                  .sort(
                    (a, b) =>
                      (b.comments?.length || 0) - (a.comments?.length || 0)
                  )
                  .slice(0, 5)
                  .map((card) => (
                    <li
                      key={card.id}
                      className="text-gray-300 hover:text-[#49C5B6] px-4 font-medium text-xs md:text-sm"
                    >
                      <Link href={`/cards/${card.id}`} className="cursor-pointer flex items-center gap-2">
                        <FaStar className="text-yellow-400" />
                        {card.title}
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
